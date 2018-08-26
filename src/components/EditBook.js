import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'

import Book from '../model/Book'
import { getBook, updateBook, createBook } from '../api/books'

export default class EditBook extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            book: null
        }
    }

    componentDidMount () {
        this.setupForm(this.props.isbn)
    }

    setupForm(isbn) {
        if (!isbn) { // create book
            this.setState({book: new Book()})
        } else {
            getBook(isbn).then(book => {
                this.setState({ book })
            })
            .catch(error => {
                toast.error(error.message)
            })
        }
    }

    render() {
        if (!this.state.book) return <span className="box">Loading...</span> // TODO include loader spinner

        const { isbn, title, author, description, date } = this.state.book
        return (
            <div className="box">
                <div className="field">
                    <label className="label">ISBN</label>
                    <div className="control">
                        <input disabled={!!this.props.isbn} onChange={(e) => { this.onChange('isbn', e.target.value) }}
                        value={isbn} className="input" type="text" placeholder="ISBN" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input onChange={(e) => { this.onChange('title', e.target.value) }}
                            value={title} className="input" type="text" placeholder="title" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Author</label>
                    <div className="control">
                        <input onChange={(e) => { this.onChange('author', e.target.value) }}
                            value={author} className="input" type="text" placeholder="author" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea onChange={(e)=>{this.onChange('description', e.target.value)}}
                            value={description} className="textarea" placeholder="Textarea"></textarea>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Date Added</label>
                    <div className="control">
                        <DatePicker
                            className="input"
                            selected={moment(date)}
                            onChange={(date)=>{this.onChange('date', date.valueOf())}} />
                    </div>
                </div>
                <button onClick={this.onSave.bind(this)} className="button is-primary">
                    {this.props.isbn ? "UPDATE" : "SAVE"}
                </button>
            </div>
        )
    }

    onChange(field, value){
        const book = cloneDeep(this.state.book)

        book[field] = value

        this.setState({book})
    }

    onSave(){
        const apiHandler = this.props.isbn ? updateBook : createBook
        const { book } = this.state
        const isValid = book.isValid()

        if (!isValid) {
            toast.error('Empty field or invalid isbn format supplied')
            return
        }

        apiHandler(book)
            .then(() => {
                toast.success('Ok')
                this.props.onSave(book)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
}

EditBook.propTypes = {
    isbn: PropTypes.string,
    onSave: PropTypes.func
}