import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense, user }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
console.log(user)
  const addExpenseToFirebase = async (expense, idToken) => {
    console.log('and',user)
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

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!amount || !description || !category) {
      alert('Please fill in all the fields.');
      return;
    }

    const newExpense = {
      amount: parseFloat(amount),
      description: description,
      category: category,
    };

    try {
      const idToken = user.idToken; // Replace this with the user's idToken obtained from Firebase Authentication
      await addExpenseToFirebase(newExpense, idToken);
      onAddExpense(newExpense);
      setAmount('');
      setDescription('');
      setCategory('');
    } catch (error) {
      alert('Failed to add the expense. Please try again.');
    }
  };

  return (
    <form onSubmit={submitHandler} className="mt-4">
    <div className="form-group">
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        className="form-control"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        className="form-control"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="category">Category</label>
      <select
        id="category"
        className="form-control"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
      </select>
    </div>
    <button type="submit" className="btn btn-success font-weight-bold">
      Add Expense
    </button>
  </form>
);
};
export default ExpenseForm;
