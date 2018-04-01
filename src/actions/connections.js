const ADD_CONNECTION = 'ADD_CONNECTION';

export const actionTypes = {
  ADD_CONNECTION,
};

let nextId = 3;

const addConnection = ({ name, communicationMethod }) => {
  return {
    type: ADD_CONNECTION,
    payload: {
      id: nextId++,
      name,
      communicationMethod,
    },
  };
};

export const actions = {
  addConnection,
};
