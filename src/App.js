import React, { useState } from 'react';
import Header from './component/Header';
import ProductsScreen from './component/ProductsScreen';
import Cart from './component/Cart';
import CartPortal from './component/CartPortal';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <Header cartItemCount={cartItems.length} handleCartToggle={handleCartToggle} />
      <ProductsScreen handleAddToCart={handleAddToCart} />
      {isCartOpen && (
        <CartPortal>
          <Cart cartItems={cartItems} />
        </CartPortal>
      )}
    </div>
  );
}

export default App;
