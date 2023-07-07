import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryIntervalId, setRetryIntervalId] = useState(null);

  const fetchMovieData = () => {
    setIsLoading(true);
    setError(null);
    setRetryCount(0);

    fetch("https://swapi.dev/api/films/")
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setIsLoading(false);
        setError(null);
      })
      .catch(error => {
        console.log("Error fetching movies:", error);
        setIsLoading(false);
        setError('Something went wrong. Retrying...');
        setRetryIntervalId(setInterval(fetchMovieData, 5000));
      });
  };

  const cancelRetry = () => {
    clearInterval(retryIntervalId);
    setError(null);
  };

  useEffect(() => {
    return () => {
      clearInterval(retryIntervalId);
    };
  }, [retryIntervalId]);

  return (
    <div>
      <button onClick={fetchMovieData} className="btn btn-primary">
        Fetch Movies
      </button>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={cancelRetry} className="btn btn-danger">
            Cancel
          </button>
        </div>
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
