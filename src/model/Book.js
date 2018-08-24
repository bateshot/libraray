import { isEmpty } from 'lodash'
import { Validate } from 'isbn-validate'

export default class Book {
    constructor (book) {
        this.isbn = book.isbn || undefined
        this.title = book.title || undefined
        this.author = book.author || undefined
        this.description = book.description || undefined
        this.date = book.date || undefined // timestamp
    }

    isValid () {
        const nonEmptyStrings = ['author', 'title', 'description']

        // non empty string fields
        for (key in nonEmptyStrings) {
            if (typeof this[key] !== 'string' || isEmpty(this[key])) return false    
        }

        // valid isbn
        if (!Validate(this.isbn)) return false

        // non empty timestamp
        if (!this.date) return false

        return true
    }
}