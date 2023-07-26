
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useState } from "react";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4   text-success">Expense Tracker</h1>
      <div className="row">
        <div className="col-md-5">
          <ExpenseForm onAddExpense={addExpenseHandler} />
        </div>
        <div className="col-md-6">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;






