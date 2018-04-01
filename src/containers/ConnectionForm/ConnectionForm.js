import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';

import ConnectionForm from '../../components/ConnectionForm';
import { actions } from '../../actions/connections';

const mapStateToProps = (state) => {
  const formValues = getFormValues('connection')(state);
  return {
    communicationMethod: formValues ? formValues.communicationMethod: undefined,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit(values) {
      dispatch(actions.addConnection(values));
      ownProps.toggleModal();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionForm);


