import React, { useState } from 'react';
import ProductItem from './ProductItem';

const ProductsScreen = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovieData = () => {
    fetch("https://swapi.dev/api/films/")
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log("Error fetching movies:", error);
      });
  };

  return (
    <div>
      <button onClick={fetchMovieData} className="btn btn-primary">
        Fetch Movies
      </button>
      <div className="product-list">
        {movies.map((movie, index) => (
          <ProductItem key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ProductsScreen;
