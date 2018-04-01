import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';

import ConnectionForm from '../../components/ConnectionForm';

const mapStateToProps = (state) => {
  const formValues = getFormValues('connection')(state);
  return {
    communicationMethod: formValues ? formValues.communicationMethod: undefined,
  };
};

export default connect(mapStateToProps)(ConnectionForm);


