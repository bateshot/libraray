import React from 'react'
import { Router, Route, Switch } from 'react-router'
import createHistory from "history/createBrowserHistory"

import App from './pages/App'
import Library from './pages/Library'
import Details from './pages/Details'
import './styles/index.scss'

const Routes = () => {
    return (
        <Router history={createHistory()}>
            <div className="section">
                <App>
                    <Switch>
                        <Route exact path="/" component={Library} />
                        <Route path="/details" component={Details} />
                        <Route render={()=>(<div>not found</div>)} />
                    </Switch>
                </App>
            </div>
        </Router>
    );
}

export default Routes;