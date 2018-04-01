import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Modal } from 'react-overlays';

import createStore from './store';
import ConnectionsList from './containers/ConnectionsList';
import ConnectionForm from './containers/ConnectionForm';

import './App.css';

const store = createStore();

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      showModal: false,
    };
  }

  toggleModal() {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal,
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
                onHide={this.toggleModal}
              >
                <ConnectionForm toggleModal={this.toggleModal} />
              </Modal>
            )
          }
          <ConnectionsList />
        </div>
      </Provider>
    );
  }
}

export default App;
