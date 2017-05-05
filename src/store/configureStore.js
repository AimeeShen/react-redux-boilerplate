/**
 * @module configureStore
 * Create Store with middleware
 * Redux middleware sets here
 **/

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const loggerMiddleware = createLogger();
    const history = createHistory();
    let store;

    // Middleware
    if (process.env.NODE_ENV === 'development') {
        // development
        store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(
                    thunkMiddleware,
                    loggerMiddleware,
                    routerMiddleware(history)
                ),
                // Integrate with redux-devTool chrome extension
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        );
    } else {
        // production
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history)
            )

        );
    }
    return store;
}

