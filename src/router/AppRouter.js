/**
 * @module Router
 * Router for App
 **/

import React from 'react';
import { Route } from 'react-router';
import PureComponent from '../components/PureComponent';

import App from '../containers/App';

class RootRouter extends PureComponent {
    render() {
        return (
            <div>
                <Route path="/" component={App} />
            </div>
        );
    }
}

export default RootRouter;
