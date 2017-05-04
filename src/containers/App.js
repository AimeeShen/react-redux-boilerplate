import React from 'react';
import PureComponent from '../components/PureComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Main from '../components/Main';
import * as AppActions from '../actions/app';

class App extends PureComponent {
    render() {
        return (
            <div>
                <Main {...this.props} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        routing: state.routing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(AppActions, dispatch),
        push: bindActionCreators(push, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
