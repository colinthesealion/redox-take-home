import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { reduxForm, Field } from 'redux-form/immutable';
import BEMHelper from 'react-bem-helper';
import isIp from 'is-ip';

import { COMMUNICATION_METHODS } from '../../constants';
import RadioGroup from '../RadioGroup';

import './connection-form.scss';

const classes = new BEMHelper({
  name: 'connection-form',
});

// TCP ports are represented as an unsigned short
// Therefore the largest value is 2^16 - 1
const MAX_TCP_PORT_VALUE = Math.pow(2, 16) - 1;

class ConnectionForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.validateName = this.validateName.bind(this);
  }

  /**
   * Render any additional fields for the given communication method
   * @param {String} communicationMethod one of HTTPS or TCP
   * @returns {ReactMarkup[]} an array of fields to render
   */
  renderCommunicationMethodFields(communicationMethod) {
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
            <Field
              name="ip"
              component="input"
              type="text"
              required
              validate={this.validateIp}
            />
          </div>,
          <div key="port" {...classes({ element: 'input-row' })}>
            <label htmlFor="port" key="port">
              Port:
            </label>
            <Field
              name="port"
              component="input"
              type="text"
              validate={this.validatePort}
            />
          </div>
        ];
      }
      default: {
        return [];
      }
    }
  }

  validateName(name) {
    if (name && this.props.existingNames[name]) {
      return `The name "${name}" is already in use.`;
    }
  }

  validateIp(ip) {
    if (ip && !isIp(ip)) {
      return `${ip} is not a valid IP address.`;
    }
  }

  validatePort(port) {
    if (port) {
      const numericPort = Number(port);
      if (isNaN(numericPort) || numericPort < 0 || numericPort > MAX_TCP_PORT_VALUE) {
        return `${port} is not a valid port. Must be in range 0-${MAX_TCP_PORT_VALUE}.`;
      }
    }
  }

  render() {
    return (
      <div tabIndex={1} {...classes({ element: 'form-body' })}>
        <h1>{(this.props.connectionId === undefined) ? 'Add' : 'Edit'} Connection</h1>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="id" component="input" type="hidden" />
          <div key="name" {...classes({ element: 'input-row' })}>
            <label htmlFor="name">
              Name:
            </label>
            <Field
              name="name"
              component="input"
              type="text"
              required
              validate={this.validateName}
            />
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
          {this.renderCommunicationMethodFields(this.props.communicationMethod)}
          <div {...classes({ element: 'button-group' })}>
            <button onClick={this.props.toggleModal}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
ConnectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  communicationMethod: PropTypes.oneOf(Object.keys(COMMUNICATION_METHODS)),
  toggleModal: PropTypes.func.isRequired,
  connectionId: PropTypes.number,
  existingNames: PropTypes.object.isRequired,
  syncErrors: ImmutablePropTypes.map,
  asyncErrors: ImmutablePropTypes.map,
  submitFailed: PropTypes.bool,
};

export default reduxForm({ form: 'connection' })(ConnectionForm);
