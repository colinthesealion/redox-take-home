import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import BEMHelper from 'react-bem-helper';

import { COMMUNICATION_METHODS } from '../../constants';
import RadioGroup from '../RadioGroup';

import './connection-form.scss';

const classes = new BEMHelper({
  name: 'connection-form',
});

/**
 * Render any additional fields for the given communication method
 * @param {String} communicationMethod one of HTTPS or TCP
 * @returns {ReactMarkup[]} an array of fields to render
 */
const renderCommunicationMethodFields = (communicationMethod) => {
  switch (communicationMethod) {
    case COMMUNICATION_METHODS.HTTPS: {
      return [
        <div key="url" {...classes({ element: 'input-row' })}>
          <label htmlFor="url" key="url">
            URL:
          </label>
          <Field name="url" component="input" type="text" required />
        </div>,
        <div key="requestMethod" {...classes({ element: 'input-row' })}>
          <label htmlFor="requestMethod" key="requestMethod">
            Request Method:
          </label>
          <Field
            name="requestMethod"
            component={RadioGroup}
            options={[ 'POST', 'GET' ]}
            required
          />
        </div>
      ];
    }
    case COMMUNICATION_METHODS.TCP: {
      return [
        <div key="ip" {...classes({ element: 'input-row' })}>
          <label htmlFor="ip" key="ip">
            IP:
          </label>
          <Field name="ip" component="input" type="text" required />
        </div>,
        <div key="port" {...classes({ element: 'input-row' })}>
          <label htmlFor="port" key="port">
            Port:
          </label>
          <Field name="port" component="input" type="text" />
        </div>
      ];
    }
    default: {
      return [];
    }
  }
};

const ConnectionForm = ({ handleSubmit, communicationMethod }) => {
  return (
    <div tabIndex={1} {...classes({ element: 'form-body' })}>
      <form onSubmit={handleSubmit}>
        <Field name="id" component="input" type="hidden" />
        <div key="name" {...classes({ element: 'input-row' })}>
          <label htmlFor="name">
            Name:
          </label>
          <Field name="name" component="input" type="text" required />
        </div>
        <div key="communicationMethod" {...classes({ element: 'input-row' })}>
          <label htmlFor="communicationMethod">
            Communication Method:
          </label>
          <Field
            name="communicationMethod"
            component={RadioGroup}
            options={Object.keys(COMMUNICATION_METHODS)}
            required
          />
        </div>
        {renderCommunicationMethodFields(communicationMethod)}
        <div {...classes({ element: 'button-group' })}>
          <button>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};
ConnectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  communicationMethod: PropTypes.oneOf(Object.keys(COMMUNICATION_METHODS)),
};

export default reduxForm({ form: 'connection' })(ConnectionForm);
