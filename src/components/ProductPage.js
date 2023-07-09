import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = ({ productsArr }) => {
  const { id } = useParams();
  const selectedProduct = productsArr[Number(id)];

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const { title, price, imageUrl } = selectedProduct;

  return (
    <div>
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <p>Price: ${price}</p>
    </div>
  );
};

export default ProductPage;
