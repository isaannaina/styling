import React from 'react';

const CartButton = ({ cartItemCount, onClick }) => {
  return (
    <button className="cart-button btn btn-primary border border-white " onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19.22 8H6.57l-1.8-4H1v2h1.97L6 14.26V21h2v-6h6v6h2v-6.73l3.03-7.26L19.22 8zM16 19h-4v-6H8v6H4v-9.35l8-5.33 8 5.33V19z" />
      </svg>
      <span className="cart-text">Cart</span>
      {cartItemCount > 0 && <span className="cart-count badge badge-light border border-blue bg-blue">{cartItemCount}</span>}
    </button>
  );
}

export default CartButton;
