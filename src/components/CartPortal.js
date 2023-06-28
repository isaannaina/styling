import React from 'react';
import ReactDOM from 'react-dom';

const CartPortal = ({ children }) => {
  const portalRoot = document.getElementById('portal');

  return ReactDOM.createPortal(
    <div className="cart-portal">
      <div className="cart-portal-content position-fixed mt-5 border border-black bg-white top-0 end-0">
        {children}
      </div>
    </div>,
    portalRoot
  );
}

export default CartPortal;
