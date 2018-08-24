import React from 'react'
import moment from 'moment'

const Book = ( {book, deleteBook, editBook} ) => {
    const shouldDelete = () => {
        const agree = confirm(`Do you wish to delete "${book.title}"`)
        if (agree) {
            deleteBook.bind(null, book.isbn)
        }
    }

    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.desctiption}</td>
            <td>{moment(book.date).format('DD/MMM/YYYY')}</td>
            <td>
                <button>details</button>
                <button onClick={editBook.bind(null, book.isbn)}>edit</button>
                <button onClick={shouldDelete}>delete</button>
            </td>
        </tr>
    )
}

export default Book