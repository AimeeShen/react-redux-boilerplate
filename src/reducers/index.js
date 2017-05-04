import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/* Update your Redux state tree here
{
}
*/

const rootReducer = combineReducers({
    routing: routerReducer
});

export default rootReducer;
