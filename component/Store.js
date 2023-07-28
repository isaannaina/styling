
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import expensesReducer from './ExpenseSlice';
import themeReducer from './ThemeSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer, 
  },
});

export default store;
