import React, { useState, useEffect, createContext } from 'react';
import Header from './component/Header';
import Item from './component/Item';
import Cart from './component/Cart';

export const CartContext = createContext();

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Fetch cart items from the API on initial render
    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://crudcrud.com/api/8a70c56f12d94429b15c606fa05cbe19/cartItems');
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          console.log('Failed to fetch cart items');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Update the API when cart items change
    const updateCartItems = async () => {
      try {
        const response = await fetch('https://crudcrud.com/api/8a70c56f12d94429b15c606fa05cbe19/cartItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItems),
        });
        if (!response.ok) {
          console.log('Failed to update cart items');
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateCartItems();
  }, [cartItems]);

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
        {!isCartOpen && (
          <>
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
              description="sky high t shirt."
              price={29.99}
              addToCart={addToCart}
            />
          </>
        )}
        {isCartOpen && <Cart cartItems={cartItems} onClose={toggleCart} />}
      </CartContext.Provider>
    </div>
  );
};

export default App;
