import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CartProvider } from './component/CartContext';
import Header from './component/Header';
import ProductsScreen from './component/ProductScreen';
import Cart from './component/Cart';
import CartPortal from './component/CartPortal';
import AboutUs from './component/AbooutUs';
import ProductPage from './component/ProductPage';
import ContactForm from './component/ContactForm';
import LoginPage from './component/LogInPage';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const productsArr = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    },
    {
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    },
  ];

  
  return (
    <BrowserRouter>
      <CartProvider isLoggedIn={isLoggedIn}>
        <Header cartItemCount={0} handleCartToggle={handleCartToggle} />
        {isCartOpen && (
          <CartPortal>
            <Cart />
          </CartPortal>
        )}
        <Routes>
          <Route
            path="/"
             element={isLoggedIn ? <ProductsScreen productsArr={productsArr} /> : <Navigate to="/login" />}
          />
          <Route path="/product/:id" element={<ProductPage productsArr={productsArr} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
