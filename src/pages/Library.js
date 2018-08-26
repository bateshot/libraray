import React from 'react'
import { toast } from 'react-toastify'

import Book from '../components/Book'
import Modal from '../components/Modal'
import * as api from '../api/books'
import EditBook from '../components/EditBook'

const SORT = {
    AUTHOR: 'author',
    TITLE: 'title',
    DATE: 'date',
}

export default class Library extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            books: [],
            filterByString: '',
            filterBy: {
                author: true,
                title: true,
            },
            sortBy: SORT.TITLE,
            isAscending: true,
            editing: null,
            addBook: false
        }
    }

    componentDidMount () {
        api.getBooks().then(books => {
            this.setState({ books })
        })
    }

    render () {
        const { editing, addBook } = this.state
        return (
            <div className="main">
                <h1>Filters go here</h1>
                { this.renderFilter() }
                { this.renderBooks() }
                <Modal
                    onClose={this.closeEditModal.bind(this)}
                    isActive={editing || addBook}>
                    { editing ? <EditBook isbn={editing}></EditBook> : null}
                </Modal>
            </div>
        )
    }

    renderFilter () {
        const { author, title } = this.state.filterBy
        const searchByText = `Search by ${author ? 'author ' : ''}${title ? 'title' : ''}`
        return (
            <div className="columns">
                <div className="column">
                    <input className="input"
                        type="text"
                        placeholder={searchByText}
                        onChange={this.onFilterChange.bind(this)}
                        ></input>
                </div>
                <div className="column">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={author}
                            onChange={this.toggleFilter.bind(this, 'author')} />
                            Author
                    </label>
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={title}
                            onChange={this.toggleFilter.bind(this, 'title')} />
                            Title
                    </label>
                </div>
            </div>
        )
    }

    renderBooks () {
        const books = this.state.books
            .filter(this.shouldFilter.bind(this))
            .sort(this.sorter.bind(this))

        return (
            <table className="table is-striped is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        {this.renderSortBy('title')}
                        {this.renderSortBy('author')}
                        <th>DESCRIPTION</th>
                        {this.renderSortBy('date')}
                        <th>CONTROLS</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (<Book
                        key={book.isbn}
                        book={book}
                        deleteBook={this.deleteBook.bind(this)}
                        editBook = {this.editBook.bind(this)} />))}
                </tbody>
            </table>
        )
    }

    deleteBook (isbn) {
        api.deleteBook(isbn)
            .then(()=>{
                const books = this.state.books.filter(b => b.isbn !== isbn)

                this.setState({ books })
                toast.success('OK')
            })
            .catch(error => {
                toast.error(error)
            })
    }

    closeEditModal(){
        this.setState({editing: null, addBook: false})
    }

    editBook(isbn){
        this.setState({editing: isbn})
    }

    createBook(){
        this.setState({addBook: true})
    }

    renderSortBy (key) {
        const { isAscending, sortBy } = this.state
        const arrow = isAscending ? <span>&#9660;</span> : <span>&#9650;</span>

        return (
            <th style={{minWidth: '150px'}} onClick={this.onSortChange.bind(this, key)}>
                {key.toUpperCase()} { key === sortBy ? arrow : null }
            </th>
        )
    }

    onSortChange (key) {
        const { isAscending, sortBy } = this.state

        if (sortBy !== key) {
            this.setState({
                sortBy: key,
                isAscending: false,
            })
        } else {
            this.setState({
                isAscending: !isAscending
            })
        }
    }

    onFilterChange (e) {
        const filterByString = e.target.value

        this.setState({filterByString})
    }

    toggleFilter (key) {
        const { author, title } = this.state.filterBy
        const toggables = {author, title}

        toggables[key] = !toggables[key]

        this.setState({filterBy: Object.assign({}, this.state.filterBy, toggables)})

    }

    shouldFilter (book) {
        const { filterBy, filterByString } = this.state
        const fieldsToMatch = Object.keys(filterBy)

        if (!filterByString) return true

        for (const key of fieldsToMatch) {
            if (filterBy[key] && book[key].toUpperCase().includes(filterByString.toUpperCase())) return true
        }

        return false
    }

    sorter (a, b) {
        const { sortBy, isAscending } = this.state
        const inverter = isAscending ? 1 : -1

        if (a[sortBy] > b[sortBy]) return (1 * inverter)

        if (a[sortBy] < b[sortBy]) return (-1 * inverter)

        return 0
    }

}