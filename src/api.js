import fetchMock from 'fetch-mock';

let nextId = 3;
fetchMock.mock(/save/, (url, options) => {
  return {
    id: options.body.id || nextId++,
  };
});

/**
 * Persist the payload to the backend
 * @param {Object} payload the object to be saved
 * @returns {Promise} a promise to persist the payload to the backend
 *                    the promise will resolve to the ID of the persisted payload
 */
const save = (payload) => {
  return fetch('save', {
    body: JSON.stringify(payload),
    method: 'POST',
  });
};

export default {
  save,
};
