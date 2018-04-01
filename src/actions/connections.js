import api from '../api';

const ADD_CONNECTION = 'ADD_CONNECTION';
const UPDATE_CONNECTION = 'UPDATE_CONNECITON';

export const actionTypes = {
  ADD_CONNECTION,
  UPDATE_CONNECTION,
};

/**
 * Action generator for adding connections
 * @param {String} name the name of the connection
 * @param {String} communicationMethod one of HTTPS or TCP
 * @returns {Promise} a promise to add the connection to the redux store
 */
const addConnection = ({ name, communicationMethod, url, requestMethod, ip }) => {
  return api.save({ name, communicationMethod, url, requestMethod, ip })
    .then((response) => {
      return response.json();
    })
    .then(({ id }) => {
      return {
        type: ADD_CONNECTION,
        payload: {
          id,
          name,
          communicationMethod,
          url,
          requestMethod,
          ip,
        },
      };
    });
};

/**
 * Action generator for updating existing connections
 * @param {Number} id the id of the connection
 * @param {String} name the name of the connection
 * @param {String} communicationMethod one of HTTPS or TCP
 * @returns {Promise} a promise to update the connection in the redux store
 */
const updateConnection = ({ id, name, communicationMethod, url, requestMethod, ip }) => {
  return api.save({ id, name, communicationMethod, url, requestMethod, ip })
    .then((response) => {
      return response.json();
    })
    .then(({ id }) => {
      return {
        type: UPDATE_CONNECTION,
        payload: {
          id,
          name,
          communicationMethod,
          url,
          requestMethod,
          ip,
        },
      }
    });
}

export const actions = {
  addConnection,
  updateConnection,
};
