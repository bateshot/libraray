import React from 'react'
import Book from '../components/Book'
import { getBooks } from '../api/books'

export default class Library extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            books: []
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
                { this.renderBooks() }
            </div>
        )
    }

    renderBooks () {
        const {books} = this.state

        return (
            <table className="table is-striped">
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
}