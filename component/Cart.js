
import React, { useContext } from 'react';
import CartItem from './A';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart">
      <h2 className="text-center mb-4">Cart</h2>
      <button className='position-fixed mt-5 border border-orange bg-green top-0 end-0'> close</button>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Cart;