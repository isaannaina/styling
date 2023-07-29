// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';

function App() {
  const cartIsVisible = useSelector((state) => state.cart.cartIsVisible);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
