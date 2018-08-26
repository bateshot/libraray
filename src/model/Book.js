import { isEmpty } from 'lodash'

export default class Book {
    constructor (book) {
        book = book || {}
        this.isbn = book.isbn || undefined
        this.title = book.title || undefined
        this.author = book.author || undefined
        this.description = book.description || undefined
        this.date = book.date || new Date().valueOf() // timestamp
    }

    isValid () {
        const nonEmptyStrings = ['author', 'title', 'description']

        // non empty string fields
        for (const key of nonEmptyStrings) {
            if (typeof this[key] !== 'string' || isEmpty(this[key])) return false
        }

        // valid isbn TODO use library
        if (!this.isbn.match(/(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})/)) return false

        // non empty timestamp
        if (!this.date) return false

        return true
    }
}