/**
 * @module PureComponent
 * Extend react-pure-render/component
 * Add _bind function for function binding
 **/

import PureComponent from 'react-pure-render/component';

class Component extends PureComponent {

    _bind(...handlers) {
        handlers.forEach(handler => {
            this[handler] = this[handler].bind(this);
        });
    }
}

export default Component;
