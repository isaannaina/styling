import React from 'react';

const CartItem = ({ item }) => {
  const { title, price, imageUrl, quantity } = item;

  return (
    <div className="cart-item row border-bottom py-3">
      <div className="col-md-4">
        <img src={imageUrl} alt={title} className="cart-item-image img-fluid" />
      </div>
      <div className="col-md-8 d-flex flex-column justify-content-center">
        <h3 className="cart-item-title mb-2">{title}</h3>
        <div className="row">
          <div className="col-md-6">
            <p className="cart-item-price mb-0">Price: ${price}</p>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button className="btn btn-outline-danger">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
