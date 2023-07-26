import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ onAddExpense, onEditExpense, editExpense, user }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  useEffect(() => {
    if (editExpense) {
      setAmount(editExpense.amount.toString());
      setDescription(editExpense.description);
      setCategory(editExpense.category);
    }
  }, [editExpense]);

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

    if (editExpense) {
      newExpense.id = editExpense.id;
      onEditExpense(newExpense); 
    } else {
      try {
        const idToken = user.idToken;
        await addExpenseToFirebase(newExpense, idToken);
        onAddExpense(newExpense);
        setAmount('');
        setDescription('');
        setCategory('');
      } catch (error) {
        alert('Failed to add the expense. Please try again.');
      }
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
        {editExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
