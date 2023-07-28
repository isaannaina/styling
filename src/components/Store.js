import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  isLoggedIn: false,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter += 5;
    },
    decrement(state) {
      state.counter -= 5;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const { increment, decrement, login, logout } = counterSlice.actions;

export default store;
