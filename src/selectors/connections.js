/**
 * Selector to pull the list of connections out of the redux state
 * @param {ImmutableMap} state the redux state
 * @returns {ImmutableList} a list of connections
 */
export const getConnections = (state) => {
  return state.get('connections');
};

/**
 * Selector to pull a connection from the list of connections out of the redux state
 * @param {ImmutableMap} state the redux state
 * @param {Number} id the id of the desired connection
 * @returns {ImmutableMap} the desired connection if it exists, undefined otherwise
 */
export const getConnection = (state, id) => {
  if (id !== undefined) {
    return getConnections(state).find((connection) => {
      return connection.get('id') === id;
    });
  }
  else {
    return undefined;
  }
};
