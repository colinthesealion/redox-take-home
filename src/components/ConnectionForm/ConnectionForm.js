import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';

import { COMMUNICATION_METHODS } from '../../constants';
import RadioGroup from '../RadioGroup';

/**
 * Render any additional fields for the given communication method
 * @param {String} communicationMethod one of HTTPS or TCP
 * @returns {ReactMarkup[]} an array of fields to render
 */
const renderCommunicationMethodFields = (communicationMethod) => {
  switch (communicationMethod) {
    case COMMUNICATION_METHODS.HTTPS: {
      return [
        <label htmlFor="url" key="url">
          URL:
          <Field name="url" component="input" type="text" required />
        </label>,
        <label htmlFor="requestMethod" key="requestMethod">
          Request Method:
          <Field
            name="requestMethod"
            component={RadioGroup}
            options={[ 'POST', 'GET' ]}
            required
          />
        </label>
      ];
    }
    case COMMUNICATION_METHODS.TCP: {
      return [
        <label htmlFor="ip" key="ip">
          IP:
          <Field name="ip" component="input" type="text" required />
        </label>
      ];
    }
    default: {
      return [];
    }
  }
};

const ConnectionForm = ({ handleSubmit, communicationMethod }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="id" component="input" type="hidden" />
      <label htmlFor="name" key="name">
        Name:
        <Field name="name" component="input" type="text" required />
      </label>
      <label htmlFor="communicationMethod" key="communicationMethod">
        Communication Method:
        <Field
          name="communicationMethod"
          component={RadioGroup}
          options={Object.keys(COMMUNICATION_METHODS)}
          required
        />
      </label>
      {renderCommunicationMethodFields(communicationMethod)}
      <button type="submit">Save</button>
    </form>
  );
};
ConnectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  communicationMethod: PropTypes.oneOf(Object.keys(COMMUNICATION_METHODS)),
};

export default reduxForm({ form: 'connection' })(ConnectionForm);
