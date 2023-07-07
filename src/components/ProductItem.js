import React from 'react';

const ProductItem = ({ movie }) => {
  const { title, episode_id } = movie;

  return (
    <div>
      <h3>{title}</h3>
      <p>Episode ID: {episode_id}</p>
    </div>
  );
};

export default ProductItem;
