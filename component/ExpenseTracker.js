// ExpenseTracker.js
import React from 'react';
import { useSelector } from 'react-redux';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';

const ExpenseTracker = () => {
  const expenses = useSelector((state) => state.expenses);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-success">Expense Tracker</h1>
      <div className="row">
        <div className="col-md-5">
          <ExpenseForm />
        </div>
        <div className="col-md-6">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
