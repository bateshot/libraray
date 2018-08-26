import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Book = ( {book, deleteBook, editBook} ) => {
    const shouldDelete = () => {
        const agree = confirm(`Do you wish to delete "${book.title}"`)
        if (agree) {
            deleteBook(book.isbn)
        }
    }
    const { isbn, title, author, description, date } = book

    return (
        <tr>
            <td>{title}</td>
            <td>{author}</td>
            <td>{description.substr(0, 80)} ...</td>
            <td>{moment(date).format('DD/MMM/YYYY')}</td>
            <td>
                <Link to={`/details?isbn=${isbn}`}><button>details</button></Link>
                <button onClick={() => { editBook(isbn) }}>edit</button>
                <button onClick={shouldDelete}>delete</button>
            </td>
        </tr>
    )
}

export default Book