// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import expensesReducer from './ExpenseSlice';
import themeReducer from './ThemeSlice'; // Import the theme reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer, // Add the theme reducer
  },
});

export default store;
