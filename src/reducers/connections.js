/* The connections reducer updates the connections piece of the redux state */

import Immutable from 'immutable';

import { COMMUNICATION_METHODS } from '../constants';
import { actionTypes } from '../actions/connections';

/* The default initial state */
/** hello */
const initialState = Immutable.fromJS([
  {
    id: 1,
    name: 'athena',
    communicationMethod: COMMUNICATION_METHODS.HTTPS,
    url: 'https://athenanet.athenahealth.com/',
    requestMethod: 'POST',
  },
  {
    id: 2,
    name: 'epic',
    communicationMethod: COMMUNICATION_METHODS.TCP,
    ip: '1.1.1.1',
    port: 1234,
  },
]);

/**
 * The reducer for our list of connections.
 * @param {ImmutableList} state the current state
 * @param {Object} action a flux standard action
 * @returns {ImmutableList} the next state
 */
const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONNECTION: {
      return state.push(Immutable.fromJS(action.payload));
    }
    case actionTypes.UPDATE_CONNECTION: {
      const index = state.findIndex((connection) => {
        return connection.get('id') === action.payload.id;
      });
      if (index < 0) {
        // TODO: dispatch an error state
        throw new Error(`Attempt to update connection with unknown ID ${action.payload.id}`);
      }
      else {
        // This connection actually exists, so update it
        return state.set(index, Immutable.fromJS(action.payload));
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
