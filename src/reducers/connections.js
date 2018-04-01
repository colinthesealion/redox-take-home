/* The connections reducer updates the connections piece of the redux state */

import Immutable from 'immutable';

import { COMMUNICATION_METHODS } from '../constants';

/* The default initial state */
const initialState = Immutable.fromJS([
  {
    id: 1,
    name: 'athena',
    communicationMethod: COMMUNICATION_METHODS.HTTPS,
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
