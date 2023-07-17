import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const ProductItem = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);
  const { title, price, imageUrl } = product;

  const handleAddToCartClick = (e) => {
    e.preventDefault(); 
    addToCart(product);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Link to={`/product/${index}`}>
            <img src={imageUrl} alt={title} className="product-image" />
          </Link>
        </div>
        <div className="col-md-6">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">Price: ${price}</p>
          <button className="btn btn-primary" onClick={handleAddToCartClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
