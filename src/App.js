import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Modal } from 'react-overlays';
import BEMHelper from 'react-bem-helper';
import urlExists from 'url-exists';
import Immutable from 'immutable';

import createStore from './store';
import ConnectionsList from './containers/ConnectionsList';
import ConnectionForm from './containers/ConnectionForm';
import { COMMUNICATION_METHODS } from './constants';

import './App.scss';

const classes = new BEMHelper({
  name: 'modal',
  outputIsString: true,
});

const store = createStore();

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      showModal: false,
    };
  }

  toggleModal(event, connectionId) {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal,
        connectionId,
      };
    });
  }

  handleSubmitFail(errors) {
    if (errors.size) {
      // Hit a bug in redux-form where the async and sync errors are not merged correctly
      const asyncErrors = Immutable.Map(errors._root.entries);
      errors = {
        ...asyncErrors.toJS(),
        name: errors.name,
      };
    }
    alert(Object.values(errors).join('\n'));
  }

  asyncValidate(values) {
    if (
      false
      && values.get('communicationMethod') === COMMUNICATION_METHODS.HTTPS
      && values.get('url')
    ) {
      const url = values.get('url');
      return new Promise((resolve, reject) => {
        urlExists(url, (error, exists) => {
          if (error || !exists) {
            reject({
              url: `Could not reach ${url}.`,
            });
          }
          else {
            resolve();
          }
        });
      });
    }
    else {
      return Promise.resolve();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <button onClick={this.toggleModal}>Add New Connection</button>
          {
            this.state.showModal&& (
              <Modal
                aria-labelledby='modal-label'
                show={this.state.showModal}
                backdropClassName={classes({ element: 'backdrop' })}
                containerClassName={classes({ element: 'container' })}
              >
                <ConnectionForm
                  toggleModal={this.toggleModal}
                  connectionId={this.state.connectionId}
                  onSubmitFail={this.handleSubmitFail}
                  asyncValidate={this.asyncValidate}
                  asyncBlurFields={[ 'url' ]}
                />
              </Modal>
            )
          }
          <ConnectionsList toggleModal={this.toggleModal} />
        </div>
      </Provider>
    );
  }
}

export default App;
