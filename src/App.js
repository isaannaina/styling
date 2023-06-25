

import React, { useState, createContext } from 'react';
import Header from './component/Header';
import Item from './component/Item';
import Cart from './component/Cart';

export const CartContext = createContext();

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };



  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <CartContext.Provider value={cartItems}>
        <Header cartItems={cartItems} toggleCart={toggleCart} />
        <Item
          name="T-Shirt 1"
          description="winter t shirt"
          price={19.99}
          addToCart={addToCart}
        />
        <Item
          name="T-Shirt 2"
          description="galli boy t shirt."
          price={24.99}
          addToCart={addToCart}
        />
        <Item
          name="T-Shirt 3"
          description="sky hig t shirt ."
          price={29.99}
          addToCart={addToCart}
        />
        {isCartOpen && <Cart cartItems={cartItems} onClose={toggleCart} />}
      </CartContext.Provider>
    </div>
  );
};

export default App;
