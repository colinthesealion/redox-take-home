/* The connections reducer updates the connections piece of the redux state */

import Immutable from 'immutable';

import { COMMUNICATION_METHODS } from '../constants';

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
 * @param {Object} state the current state
 * @param {Object} action a flux standard action
 */
const reducer = (state=initialState, action) => {
  return state;
};

export default reducer;
