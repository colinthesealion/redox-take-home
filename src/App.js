import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from './store';
import ConnectionsList from './containers/ConnectionsList';

import './App.css';

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectionsList />
      </Provider>
    );
  }
}

export default App;
