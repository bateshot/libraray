import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Book = ( {book, deleteBook, editBook} ) => {
    const shouldDelete = () => {
        const agree = confirm(`Do you wish to delete "${book.title}"`)
        if (agree) {
            deleteBook(book.isbn)
        }
    }
    const { isbn, title, author, description, date } = book

    return (
        <tr key={isbn}>
            <td>{title}</td>
            <td>{author}</td>
            <td>{description.substr(0, 80)} ...</td>
            <td>{moment(date).format('DD/MMM/YYYY')}</td>
            <td>
                <Link to={`/details?isbn=${isbn}`}><button className="button is-primary is-small is-outlined"><FontAwesomeIcon icon="eye" /></button></Link>
                <button className="button is-primary is-small" onClick={() => { editBook(isbn) }}><FontAwesomeIcon icon="edit" /></button>
                <button className="button is-danger is-small" onClick={shouldDelete}><FontAwesomeIcon icon="trash" /></button>
            </td>
        </tr>
    )
}

export default Book