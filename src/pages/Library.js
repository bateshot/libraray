import React from 'react'
import Book from '../components/Book'
import { getBooks } from '../api/books'

export default class Library extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            books: [],
            filterByString: '',
            filterBy: {
                author: true,
                title: true,
            }
        }
    }

    componentDidMount () {
        getBooks().then(books => {
            this.setState({ books })
        })
    }

    render () {
        return (
            <div className="main">
                <h1>Filters go here</h1>
                { this.renderFilter() }
                { this.renderBooks() }
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

        return (
            <table className="table is-striped is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Date Added</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (<Book
                        key={book.isbn}
                        book={book}
                        deleteBook={()=>{}}
                        editBook = {()=>{}} />))}
                </tbody>
            </table>
        )
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

}