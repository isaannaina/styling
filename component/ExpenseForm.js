
import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (!amount || !description || !category) {
      alert('Please fill in all the fields.');
      return;
    }

    const newExpense = {
      id: Math.random().toString(),
      amount: parseFloat(amount),
      description: description,
      category: category,
    };

    onAddExpense(newExpense);
    setAmount('');
    setDescription('');
    setCategory('');
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


