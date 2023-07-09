
import React from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
];

const ProductsScreen = ({ handleAddToCart }) => {
  return (
    <div>
      <h2 className="text-center bg-black text-white py-4">Products</h2>
      <div className="product-list">
        {productsArr.map((product, index) => (
          <Link key={index} to={`/product/${index}`}>
            <ProductItem product={product} handleAddToCart={handleAddToCart} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsScreen;