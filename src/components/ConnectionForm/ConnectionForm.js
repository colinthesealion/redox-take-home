import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';

import { COMMUNICATION_METHODS } from '../../constants';
import RadioGroup from '../RadioGroup';

const ConnectionForm = ({ handleSubmit, communicationMethod }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="id" component="input" type="hidden" />
      <label htmlFor="name">
        Name:
        <Field name="name" component="input" type="text" />
      </label>
      <label htmlFor="communicationMethod">
        Communication Method:
        <Field
          name="communicationMethod"
          component={RadioGroup}
          options={Object.keys(COMMUNICATION_METHODS)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};
ConnectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  communicationMethod: PropTypes.oneOf(Object.keys(COMMUNICATION_METHODS)),
};

export default reduxForm({ form: 'connection' })(ConnectionForm);
