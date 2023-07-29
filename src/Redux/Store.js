// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other reducers here if you have any
  },
});

export default store;
 