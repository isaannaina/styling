// expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const expensesFromLocalStorage = JSON.parse(localStorage.getItem('expenses')) || [];

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: expensesFromLocalStorage,
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('expenses', JSON.stringify(state));
    },
    removeExpense: (state, action) => {
      const updatedExpenses = state.filter((expense) => expense.id !== action.payload);
      state.splice(0, state.length, ...updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(state));
    },
    editExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      const index = state.findIndex((expense) => expense.id === id);

      if (index !== -1) {
        state[index] = { ...state[index], ...updatedExpense };
        localStorage.setItem('expenses', JSON.stringify(state));
      }
    },
  },
});

export const { addExpense, removeExpense, editExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
