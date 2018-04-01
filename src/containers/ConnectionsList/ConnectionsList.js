import { connect } from 'react-redux';

import ConnectionsList from '../../components/ConnectionsList';
import { getConnections } from '../../selectors/connections';

/**
 * Map from the redux state to the properties that should be applied to the component.
 * @param {ImmutableMap} state the current redux state
 * @returns {Object} a map of property name to value
 */
const mapStateToProps = (state) => {
  return {
    connections: getConnections(state),
  };
};

export default connect(mapStateToProps)(ConnectionsList);
