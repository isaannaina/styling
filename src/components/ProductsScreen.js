import React, { useState } from 'react';
import ProductItem from './ProductItem'
const ProductsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMovieData = () => {
    setIsLoading(true);

    fetch("https://swapi.dev/api/films/")
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("Error fetching movies:", error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <button onClick={fetchMovieData} className="btn btn-primary">
        Fetch Movies
      </button>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="product-list">
          {movies.map((movie, index) => (
            <ProductItem key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsScreen;
