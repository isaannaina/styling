import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { addExpense} from './ExpenseSlice';
import { toggleTheme } from './ThemeSlice'; 

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');


  const expenses = useSelector((state) => state.expenses);
  const theme = useSelector((state) => state.theme); 

console.log(theme)
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!amount || !description || !category) {
      alert('Please fill in all the fields.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(), 
      amount: parseFloat(amount),
      description: description,
      category: category,
    };
    dispatch(addExpense(newExpense));

   

    setAmount('');
    setDescription('');
    setCategory('');
  };

  useEffect(() => {
    const expensesFromLocalStorage = JSON.parse(localStorage.getItem('expenses')) || [];

  }, []);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const handleActivatePremium = () => {
    dispatch(toggleTheme()); 
  };

  const handleDownloadCSV = () => {
    const csvData = expenses.map(
      (expense) => `${expense.id},${expense.amount},${expense.description},${expense.category}\n`
    );

    const blob = new Blob(['ID,Amount,Description,Category\n', ...csvData], {
      type: 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'expenses.csv';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
        <img
            src="https://cdn.pixabay.com/animation/2023/02/10/10/53/10-53-53-213_512.gif"
            alt="New Image"
            className="img-fluid"
            style={{ width: '80px', height: '110px', position: 'absolute', top: 0, left: 0 }}
          />
    <form onSubmit={submitHandler} className="mt-4">
      {/* ... (existing JSX) */}
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
      {totalExpenses > 10000 && (
        <>
          <button className="btn btn-primary mt-2" onClick={handleActivatePremium}>
            Activate Premium
          </button>
          <button className="btn btn-primary mt-2" onClick={handleDownloadCSV}>
            Download File
          </button>
        </>
      )}
    </form>
    </div>
  );
};

export default ExpenseForm;
