import React from "react";

const ExpenseList = ({ expenses }) => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
