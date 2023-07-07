import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductItem from './ProductItem';

const ProductsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryIntervalId, setRetryIntervalId] = useState(null);

  const fetchMovieData = useCallback(() => {
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
  }, []);

  const cancelRetry = useCallback(() => {
    clearInterval(retryIntervalId);
    setError(null);
  }, [retryIntervalId]);

  useEffect(() => {
    fetchMovieData();

    return () => {
      clearInterval(retryIntervalId);
    };
  }, [fetchMovieData, retryIntervalId]);

  const movieList = useMemo(() => (
    <div className="product-list">
      {movies.map((movie, index) => (
        <ProductItem key={index} movie={movie} />
      ))}
    </div>
  ), [movies]);

  return (
    <div>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={cancelRetry} className="btn btn-danger">
            Cancel
          </button>
        </div>
      ) : movieList}
    </div>
  );
};

export default ProductsScreen;
