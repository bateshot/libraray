import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navigation = () => {
    return (
        <nav className="nav">
            <Link to="/" className="btn light"><FontAwesomeIcon icon="home" /></Link>
        </nav>
    )
}

export default Navigation
