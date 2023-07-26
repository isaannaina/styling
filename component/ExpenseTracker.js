import React, { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm'
const ExpenseTracker = ({ user }) => {
  const [expenses, setExpenses] = useState([]);

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

  const addExpenseHandler = async (newExpense) => {
    try {
      const idToken = user.idToken; // Replace this with the user's idToken obtained from Firebase Authentication
      await addExpenseToFirebase(newExpense, idToken);
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    } catch (error) {
      alert('Failed to add the expense. Please try again.');
    }
  };
console.log(user)
  useEffect(() => {
    // Fetch expenses from Firebase on page refresh
    const fetchExpensesFromFirebase = async (idToken) => {
      try {
        const response = await fetch(
          `https://your-firebase-project.firebaseio.com/expenses.json?auth=${idToken}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch expenses from the database.');
        }

        const responseData = await response.json();
        // Convert the responseData into an array of expenses if needed
        const expenses = responseData ? Object.values(responseData) : [];
        setExpenses(expenses);
      } catch (error) {
        console.log('Failed to fetch expenses.', error);
      }
    };

    fetchExpensesFromFirebase(user.idToken);
  }, [user]); // Add user as a dependency for the useEffect

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-success">Expense Tracker</h1>
      <div className="row">
        <div className="col-md-5">
          <ExpenseForm onAddExpense={addExpenseHandler} user={user} />
        </div>
        <div className="col-md-6">
        <ExpenseList expenses={expenses} />
          
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
