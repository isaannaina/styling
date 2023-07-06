import { BrowserRouter, Routes,Route } from 'react-router-dom';
import React, { useState } from 'react';
import { CartProvider } from './component/CartContext';
import Header from './component/Header';
import ProductsScreen from './component/ProductsScreen';
import Cart from './component/Cart';
import CartPortal from './component/CartPortal';
import AboutUs from './component/about';
const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);        

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

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
      <Route path="/product" element={<AboutUs/>} /> 
      <Route path="/" element={<ProductsScreen/>} /> 
      </Routes>
      </CartProvider>

      </BrowserRouter>
  );
};

export default App;
