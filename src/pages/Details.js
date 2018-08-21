import React from 'react'
import { parse } from 'query-string'

export default class Details extends React.Component {
    render() {
        const q = parse(this.props.location.search)

        return (
            <div className="main">
                <h1>Details for book with isbn:{q.isbn}</h1>
            </div>
        )
    }
}