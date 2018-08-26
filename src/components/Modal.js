import React from 'react'

export default class extends React.Component {
    render () {
        return (
            <div className={`modal ${this.props.isActive ? 'is-active' : null}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                {this.props.children}
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={this.props.onClose}></button>
            </div>
        )
    }
}