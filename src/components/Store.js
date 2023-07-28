

import { createStore } from "redux";

// Define initial state
const initialState = {
  counter: 0,
};

// Reducer function to handle state changes
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter +5};
    case 'DECREMENT':
      return { ...state, counter: state.counter -5 };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(counterReducer);

export default store;


