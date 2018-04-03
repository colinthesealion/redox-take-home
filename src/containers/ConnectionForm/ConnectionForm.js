import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';

import ConnectionForm from '../../components/ConnectionForm';
import { actions } from '../../actions/connections';
import { getConnection, getConnections } from '../../selectors/connections';

const mapStateToProps = (state, ownProps) => {
  const formValues = getFormValues('connection')(state);
  const initialValues = getConnection(state, ownProps.connectionId);
  let communicationMethod;
  if (formValues) {
    communicationMethod = formValues.get('communicationMethod');
  }
  else if (initialValues) {
    communicationMethod = initialValues.get('communicationMethod');
  }
  const existingNames = getConnections(state).reduce(
    (reduction, connection) => {
      if (connection.get('id') !== ownProps.connectionId) {
        reduction[connection.get('name')] = true;
      }
      return reduction;
    },
    {}
  );
  return {
    initialValues,
    communicationMethod,
    existingNames,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit(values) {
      if (ownProps.connectionId === undefined) {
        dispatch(actions.addConnection(values.toJS()));
      }
      else {
        dispatch(actions.updateConnection(values.toJS()));
      }
      ownProps.toggleModal();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionForm);


