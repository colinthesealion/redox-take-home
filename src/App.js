import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Modal } from 'react-overlays';
import BEMHelper from 'react-bem-helper';

import createStore from './store';
import ConnectionsList from './containers/ConnectionsList';
import ConnectionForm from './containers/ConnectionForm';

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
                <ConnectionForm toggleModal={this.toggleModal} connectionId={this.state.connectionId} />
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
