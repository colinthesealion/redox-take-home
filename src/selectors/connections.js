/**
 * Selector to pull the list of connections out of the redux state
 * @param {ImmutableMap} state the redux state
 * @returns {ImmutableList} a list of connections
 */
export const getConnections = (state) => {
  return state.get('connections');
};
