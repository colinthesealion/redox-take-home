import { combineReducers } from 'redux-immutable';
import { createStore as createReduxStore, compose, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form/immutable';
import promiseMiddleware from 'redux-promise';

import connections from './reducers/connections';

// The root reducer
const rootReducer = combineReducers({ connections, form });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create the redux store for our application.
 * @param {Immutable.Map} [initialState] the initial state of the store
 * @returns {Object} the redux store
 */
const createStore = (initialState) => {
  return createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(promiseMiddleware))
  );
}

export default createStore;
