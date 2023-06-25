import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Cart.module.css';

const Cart = ({ cartItems, onClose }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return ReactDOM.createPortal(
    <div className={styles['cart-overlay']}>
      <div className={styles.cart}>
        <h3>Items in Cart:</h3>
        <ul className={styles['cart-items']}>
          {cartItems.map((item, index) => (
            <li key={index} className={styles['cart-item']}>
              <div className={styles['item-details']}>
                <span>{item.name}</span>
                <span>{item.size}</span>
              </div>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className={styles['cart-summary']}>
          <span className={styles['total-amount']}>
            Total Amount: ${totalPrice.toFixed(2)}
          </span>
        </div>
        <button onClick={onClose} className={styles['close-button']}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById('cart-portal')
  );
};

export default Cart;
