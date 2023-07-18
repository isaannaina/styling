import React, { useContext } from 'react';
import { CartContext } from '../App';

const Header = ({ toggleCart }) => {
  const cartItems = useContext(CartContext);

  return (
    <header className="header bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="header-title">T-Shirt Hub</h1>
        <button className="btn btn-light" onClick={toggleCart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill me-1" viewBox="0 0 16 16">
            <path d="M0 1.5C0 .67.67 0 1.5 0h1C3.33 0 4 .67 4 1.5v1c0 .83-.67 1.5-1.5 1.5h-1C.67 4 0 3.33 0 2.5v-1zM5 0h8v1H5V0zm.293 9.5a.5.5 0 0 1 .496.57l-.5 3a.5.5 0 0 1-.996 0l-.5-3A.5.5 0 0 1 5.293 9.5h.003zm3.204-.132a1.498 1.498 0 0 1 1.47 1.757l-.377 2.263H5.11l-.376-2.263A1.498 1.498 0 0 1 6.204 9.368h2.293zm-5.184-.132a.5.5 0 1 1 .442.897l-1.5 1.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .442-.897l1.048.524zm10.368 0 1.048-.524a.5.5 0 1 1 .442.897l-1.5 1.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .442-.897l1.048.524zM4 5.5A1.5 1.5 0 0 1 5.5 4h5a1.5 1.5 0 0 1 1.5 1.5V7H4V5.5z" />
          </svg>
          Cart ({cartItems.length})
        </button>
      </div>
    </header>
  );
};

export default Header;
