import { connect } from 'react-redux';

import ConnectionsList from '../../components/ConnectionsList';

/**
 * Map from the redux state to the properties that should be applied to the component.
 * @param {ImmutableMap} state the current redux state
 * @returns {Object} a map of property name to value
 */
const mapStateToProps = (state) => {
  return {
    connections: state.get('connections'),
  };
};

export default connect(mapStateToProps)(ConnectionsList);
