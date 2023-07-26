import React, { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';

const ExpenseTracker = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  const addExpenseToFirebase = async (expense, idToken) => {
    try {
      const response = await fetch(
        `https://your-firebase-project.firebaseio.com/expenses.json?auth=${idToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expense),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add the expense to the database.');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseFromFirebase = async (expenseId, idToken) => {
    try {
      const response = await fetch(
        `https://your-firebase-project.firebaseio.com/expenses/${expenseId}.json?auth=${idToken}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete the expense from the database.');
      }

      console.log('Expense successfully deleted');
    } catch (error) {
      throw error;
    }
  };

  const editExpenseInFirebase = async (updatedExpense, idToken) => {
    try {
      const response = await fetch(
        `https://your-firebase-project.firebaseio.com/expenses/${updatedExpense.id}.json?auth=${idToken}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update the expense in the database.');
      }

      console.log('Expense successfully updated');
    } catch (error) {
      throw error;
    }
  };

  const addExpenseHandler = async (newExpense) => {
    try {
      const idToken = user.idToken;
      await addExpenseToFirebase(newExpense, idToken);
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    } catch (error) {
      alert('Failed to add the expense. Please try again.');
    }
  };

  const deleteExpenseHandler = async (expenseId) => {
    try {
      const idToken = user.idToken;
      await deleteExpenseFromFirebase(expenseId, idToken);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );
    } catch (error) {
      alert('Failed to delete the expense. Please try again.');
    }
  };

  const editExpenseHandler = async (updatedExpense) => {
    try {
      const idToken = user.idToken;
      await editExpenseInFirebase(updatedExpense, idToken);
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
      setEditExpense(null); 
    } catch (error) {
      alert('Failed to update the expense. Please try again.');
    }
  };

  useEffect(() => {
    const fetchExpensesFromFirebase = async (idToken) => {
      try {
        const response = await fetch(
          `https://your-firebase-project.firebaseio.com/expenses.json?auth=${idToken}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch expenses from the database.');
        }

        const responseData = await response.json();
        const expensesData = responseData ? Object.values(responseData) : [];
        setExpenses(expensesData);
      } catch (error) {
        console.log('Failed to fetch expenses.', error);
      }
    };

    fetchExpensesFromFirebase(user.idToken);
  }, [user]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-success">Expense Tracker</h1>
      <div className="row">
        <div className="col-md-5">
          <ExpenseForm
            onAddExpense={addExpenseHandler}
            onEditExpense={editExpenseHandler}
            editExpense={editExpense}
            user={user}
          />
        </div>
        <div className="col-md-6">
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={deleteExpenseHandler}
            onEditExpense={setEditExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
