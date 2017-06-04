/**
 * @module PureComponent
 * Use built in React.PureComponent
 * Add _bind function for function binding sugar
 **/
import React from 'react';

class Component extends React.PureComponent {

    _bind(...handlers) {
        handlers.forEach(handler => {
            this[handler] = this[handler].bind(this);
        });
    }
}

export default Component;
