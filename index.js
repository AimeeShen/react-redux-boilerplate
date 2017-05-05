import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

// Router
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import Router from './src/router/AppRouter';

import './src/styles/main.less';

const history = createHistory();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Router store={store} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
