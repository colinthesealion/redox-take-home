import { combineReducers } from 'redux-immutable';
import { createStore as createReduxStore } from 'redux';
import { reducer as form } from 'redux-form'

import connections from './reducers/connections';

// The root reducer
const rootReducer = combineReducers({ connections, form });


/**
 * Create the redux store for our application.
 * @param {Immutable.Map} [initialState] the initial state of the store
 * @returns {Object} the redux store
 */
const createStore = (initialState) => {
  return createReduxStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default createStore;
