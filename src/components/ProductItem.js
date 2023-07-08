import React from 'react';

const ProductItem = ({ movie, deleteMovie }) => {
  const handleDeleteClick = () => {
    deleteMovie(movie.id);
  };

  return (
    <div>
      <h3>{movie.title}</h3>
      <button onClick={handleDeleteClick}>Delete Movie</button>
    </div>
  );
};

export default ProductItem;
