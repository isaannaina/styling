import React, { useState } from 'react';
import ProductItem from './ProductItem';

const MovieForm = ({ handleAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAddMovie(newMovie);
    setNewMovie({
      title: '',
      openingText: '',
      releaseDate: ''
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="openingText" className="form-label">Opening Text:</label>
          <input
            type="text"
            id="openingText"
            name="openingText"
            value={newMovie.openingText}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">Release Date:</label>
          <input
            type="text"
            id="releaseDate"
            name="releaseDate"
            value={newMovie.releaseDate}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Movie</button>
      </form>
    </div>
  );
};

const ProductsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  const handleAddMovie = newMovie => {
    console.log(newMovie);
  };

  return (
    <div>
      <MovieForm handleAddMovie={handleAddMovie} />
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
