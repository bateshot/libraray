import { isEmpty } from 'lodash'
import isbnIsValid from 'isbn-validator'

export default class Book {
    constructor (book) {
        book = book || {}
        this.isbn = book.isbn || undefined
        this.title = book.title || undefined
        this.author = book.author || undefined
        this.description = book.description || undefined
        this.date = book.date || undefined // timestamp
    }

    isValid () {
        const nonEmptyStrings = ['author', 'title', 'description']

        // non empty string fields
        for (const key of nonEmptyStrings) {
            if (typeof this[key] !== 'string' || isEmpty(this[key])) return false
        }

        // valid isbn
        if (!isbnIsValid(this.isbn)) return false

        // non empty timestamp
        if (!this.date) return false

        return true
    }
}