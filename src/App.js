import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';
import { addToCart } from './Redux/CartSlice';

function App() {
  const cartIsVisible = useSelector((state) => state.cart.cartIsVisible);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://expense-tracker-4e143-default-rtdb.firebaseio.com/expenses.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch expenses from the database.');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          const expensesArray = Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }));

      
          expensesArray.forEach((expense) => {
            dispatch(addToCart(expense));
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error.message);
      });
  }, [dispatch]);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
