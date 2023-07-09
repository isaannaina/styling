import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import { CartProvider } from './component/CartContext';
import Header from './component/Header';
import ProductsScreen from './component/ProductsScreen';
import Cart from './component/Cart';
import CartPortal from './component/CartPortal';
import ProductPage from './component/ProductPage';
import ContactForm from './component/ContactUsPage';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
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
    }
  ];

  return (
    <BrowserRouter>
      <CartProvider>
        <Header handleCartToggle={handleCartToggle} />

        {isCartOpen && (
          <CartPortal>
            <Cart />
          </CartPortal>
        )}

        <Routes>
          <Route path="/product/:id" element={<ProductPage productsArr={productsArr} />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/" element={<ProductsScreen />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
