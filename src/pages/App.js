import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
library.add(faHome)

import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import Heading from '../components/Heading'

export default class App extends React.Component {
    render() {
        return (
            <div id="layout-container">
                <ToastContainer />
                <Heading />
                <Navigation />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}