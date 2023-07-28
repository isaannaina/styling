import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeExpense, editExpense } from './ExpenseSlice';

const ExpenseList = ({ expenses }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);

  const deleteExpenseHandler = (id) => {
    dispatch(removeExpense(id));
    console.log('Expense successfully deleted');
  };

  const editExpenseHandler = (expense) => {
    setEditMode(true);
    setEditedExpense(expense);
  };

  const submitEditedExpense = () => {
    dispatch(editExpense({ id: editedExpense.id, updatedExpense: editedExpense }));
    setEditMode(false);
    setEditedExpense(null);
  };

  const cancelEditHandler = () => {
    setEditMode(false);
    setEditedExpense(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Expenses List</h2>
      <ul className="list-group">
        {expenses.map((expense) => (
          <li key={expense.id} className="list-group-item">
            {editMode && editedExpense && editedExpense.id === expense.id ? (
              <div>
                <strong>Amount: </strong>
                <input
                  type="number"
                  value={editedExpense.amount}
                  onChange={(e) =>
                    setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })
                  }
                />
                <br />
                <strong>Description: </strong>
                <input
                  type="text"
                  value={editedExpense.description}
                  onChange={(e) =>
                    setEditedExpense({ ...editedExpense, description: e.target.value })
                  }
                />
                <br />
                <strong>Category: </strong>
                <input
                  type="text"
                  value={editedExpense.category}
                  onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                />
                <br />
                <button className="btn btn-primary" onClick={submitEditedExpense}>
                  Save
                </button>
                <button className="btn btn-secondary ml-2" onClick={cancelEditHandler}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <strong>Amount: ${expense.amount}</strong>
                <br />
                <strong>Description: </strong> {expense.description}
                <br />
                <strong>Category: </strong> {expense.category}
                <br />
                <button className="btn btn-danger mr-2" onClick={() => deleteExpenseHandler(expense.id)}>
                  Delete
                </button>
                <button className="btn btn-primary" onClick={() => editExpenseHandler(expense)}>
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
