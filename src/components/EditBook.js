import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { toast } from 'react-toastify'

import Book from '../model/Book'
import { getBook } from '../api/books'

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
                toast.error(error)
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
                        <input value={isbn} className="input" type="text" placeholder="title" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input value={title} className="input" type="text" placeholder="title" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Author</label>
                    <div className="control">
                        <input value={author} className="input" type="text" placeholder="author" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea value={description} className="textarea" placeholder="Textarea"></textarea>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Date Added</label>
                    <div className="control">
                        <DatePicker
                            selected={moment(date)}
                            onChange={()=>{}} />
                    </div>
                </div>
            </div>
        )
    }
}