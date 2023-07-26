import React from "react";

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const handleDeleteExpense = (expenseId) => {
    onDeleteExpense(expenseId);
  };

  const handleEditExpense = (expense) => {
    onEditExpense(expense);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Expenses List</h2>
      <ul className="list-group">
        {expenses.map((expense) => (
          <li key={expense.id} className="list-group-item">
            <strong>Amount: ${expense.amount}</strong>
            <br />
            Description: {expense.description}
            <br />
            Category: {expense.category}
            <br />
            <button
              className="btn btn-danger mr-2"
              onClick={() => handleDeleteExpense(expense.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleEditExpense(expense)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
