import { actions } from '../actions/connections';
import { getConnections, getConnection } from '../selectors/connections';
import createStore from '../store';
import { COMMUNICATION_METHODS } from '../constants';

describe('connections reducer', () => {
  let store;
  beforeAll(() => {
    store = createStore();
  });

  it('persists a new connection', () => {

    // Store a reference to the current list of connections
    const currentConnections = getConnections(store.getState());

    // When doing asynchronous tests we need a count of how many to expect
    expect.assertions(2 + currentConnections.size);

    // Dispatch an action to create a new one
    const addConnectionAction = actions.addConnection({
      name: 'test',
      communicationMethod: COMMUNICATION_METHODS.HTTPS,
    });
    store.dispatch(addConnectionAction);

    // Wait for the action to get dispatched before doing the tests
    return addConnectionAction.then(() => {
      // Verify that the new connection is present
      const nextConnections = getConnections(store.getState());
      expect(nextConnections.findIndex((connection) => {
        return (
          connection.get('name') === 'test'
          && connection.get('communicationMethod') === COMMUNICATION_METHODS.HTTPS
        );
      })).toBeGreaterThan(-1);

      // Verify that the rest of the old connections have not been removed
      currentConnections.forEach((connection) => {
        expect(nextConnections.includes(connection)).toBeTruthy();
      });

      // Verify that nothing else has been added
      expect(nextConnections.size).toEqual(currentConnections.size + 1);
    });
  });

  it('persists an updated connection', () => {
    // Determine a connection to update
    const currentConnections = getConnections(store.getState());
    const connectionId = currentConnections.first().get('id');

    // When doing asynchronous tests we need a count of how many to expect
    expect.assertions(3 + currentConnections.size - 1);

    // Dispatch an action to update it
    const newCommunicationMethod = currentConnections.getIn([0, 'communicationMethod']) === COMMUNICATION_METHODS.HTTPS
      ? COMMUNICATION_METHODS.TCP
      : COMMUNICATION_METHODS.HTTPS;
    const updateConnectionAction = actions.updateConnection({
      id: connectionId,
      name: 'test',
      communicationMethod: newCommunicationMethod,
    });
    store.dispatch(updateConnectionAction);

    // Wait for the action to get dispatched before doing tests
    return updateConnectionAction.then(() => {
      // The correct connection was updated
      const updatedConnection = getConnection(store.getState(), connectionId);
      expect(updatedConnection.get('name')).toEqual('test');
      expect(updatedConnection.get('communicationMethod')).toEqual(newCommunicationMethod);

      // No other connection was updated
      const nextConnections = getConnections(store.getState());
      currentConnections.forEach((connection)=> {
        if (connection.get('id') !== connectionId) {
          expect(nextConnections.includes(connection)).toBeTruthy();
        }
      });

      // Nothing else has been added
      expect(nextConnections.size).toEqual(currentConnections.size);
    });
  });
});
