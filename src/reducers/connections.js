/* The connections reducer updates the connections piece of the redux state */

import Immutable from 'immutable';

import { COMMUNICATION_METHODS } from '../constants';
import { actionTypes } from '../actions/connections';

/* The default initial state */
const initialState = Immutable.fromJS([
  {
    id: 1,
    name: 'athena',
    communicationMethod: COMMUNICATION_METHODS.HTTPS,
    URL: 'https://athenanet.com/',
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
      return state.push(action.payload);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
