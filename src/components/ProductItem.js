import React from 'react';

const ProductItem = ({ product, handleAddToCart }) => {
  const { title, price, imageUrl } = product;

  const handleAddToCartClick = () => {
    handleAddToCart(product);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={imageUrl} alt={title} className="product-image" />
        </div>
        <div className="col-md-6">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">Price: ${price}</p>
          <button className="btn btn-primary" onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
