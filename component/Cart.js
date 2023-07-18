import React from 'react';
import ReactDOM from 'react-dom';

const Cart = ({ cartItems, onClose }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return ReactDOM.createPortal(
    <div className="container cart-portal" onClick={onClose}>
      <div className="cart card">
        <button className="btn btn-link btn-close">
          <i className="bi bi-x"></i>
        </button>
        <h3 className="cart-title">Items in Cart:</h3>
        <ul className="cart-items list-group">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item list-group-item">
              <div className="item-details">
                <span>{item.name}</span>
                <span>{item.size}</span>
              </div>
              <span className="item-price">${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="cart-summary">
          <span className="total-amount">
            Total Amount: ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="cart-buttons d-flex justify-content-between">
          <button className="btn btn-primary btn-buy">Buy</button>
          <button onClick={onClose} className="btn btn-secondary btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('cart-portal')
  );
};

export default Cart;
