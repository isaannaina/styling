import React, { useState } from 'react';

const Item = ({ name, description, price, addToCart }) => {
  const [quantities, setQuantities] = useState({
    Small: 100,
    Medium: 50,
    Large: 25
  });

  const handleQuantityChange = (size) => {
    if (quantities[size] > 0) {
      addToCart({ name, size, price });
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [size]: prevQuantities[size] - 1
      }));
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="item card d-flex align-items-center justify-content-between">
          <div className="card-body">
            <h3 className="item-title card-title">{name}</h3>
            <p className="item-description card-text">{description}</p>
            <p className="item-price card-text">Price: ${price}</p>
            <div className="d-flex">
              <div className="item-size me-3">
                <button
                  type="button"
                  onClick={() => handleQuantityChange('Small')}
                  disabled={quantities.Small <= 0}
                  className="btn btn-primary size-button"
                >
                  {quantities.Small} available
                </button>
                <span className="size-label">Small</span>
              </div>
              <div className="item-size me-3">
                <button
                  type="button"
                  onClick={() => handleQuantityChange('Medium')}
                  disabled={quantities.Medium <= 0}
                  className="btn btn-primary size-button"
                >
                  {quantities.Medium} available
                </button>
                <span className="size-label">Medium</span>
              </div>
              <div className="item-size">
                <button
                  type="button"
                  onClick={() => handleQuantityChange('Large')}
                  disabled={quantities.Large <= 0}
                  className="btn btn-primary size-button"
                >
                  {quantities.Large} available
                </button>
                <span className="size-label">Large</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
