import Book from "../model/Book";

function _saveToLocalStorage (books) {
    localStorage.setItem('books', JSON.stringify(books))
}

function _getFromLocalStorage () {
    const books = localStorage.getItem('books') || '[]'

    return JSON.parse(books).map(book => new Book(book))
}

export function getBooks(){
    return Promise.resolve(_getFromLocalStorage())
}

export function createBook(book) {
    const books = _getFromLocalStorage()

    if (!book.isValid()) {
        return Promise.reject('Invalid book format')
    }

    if (books.findIndex(b => b.isbn === book.isbn) !== -1) {
        return Promise.reject('Book with the same isbn already exists')
    }

    books.push(book)

    _saveToLocalStorage(books)

    return Promise.resolve()
}

export function updateBook (book) {
    const books = _getFromLocalStorage()
    const index = books.findIndex(b => b.isbn === book.isbn)

    if (index < 0) {
        return Promise.reject('Book not found')
    }

    if (!book.isValid()) {
        return Promise.reject('Invalid book format')
    }

    books[index] = book

    _saveToLocalStorage(books)

    return Promise.resolve()
}

export function deleteBook (isbn) {
    const books = _getFromLocalStorage()

    _saveToLocalStorage(books.filter(b => b.isbn !== isbn))

    return Promise.resolve()
}
