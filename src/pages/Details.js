import React from 'react'
import { parse } from 'query-string'
import { toast } from 'react-toastify'
import moment from 'moment'

import { getBook } from '../api/books'

export default class Details extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            book: null
        }
    }

    componentDidMount() {
        const q = parse(this.props.location.search)

        getBook(q.isbn).then(book => {
            this.setState({book})
        })
        .catch(error => {
            toast.error(error.message)
        })
    }

    render() {
        const { book } = this.state

        // TODO loader spinner
        if (!book) return <span className="box">Loading...</span>

        const { title, author, description, date } = this.state.book

        return (
            <div className="main">
                <h1 className="title is-1">{ title }</h1>
                <h2 className="subtitle is-3">{ author }</h2>
                <h2 className="subtitle is-4">{ moment(date).format('DD MMM YYYY') }</h2>
                <p>{ description }</p>
            </div>
        )
    }
}