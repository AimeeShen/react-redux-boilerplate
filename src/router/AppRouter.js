/**
 * @module Router
 * Router for App
 **/

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import PureComponent from '../components/PureComponent';

import App from '../containers/App';

class RootRouter extends PureComponent {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={App}>
                    <IndexRoute component={App} />
                </Route>
            </Router>
        );
    }
}

export default RootRouter;
