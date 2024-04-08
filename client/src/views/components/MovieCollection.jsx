import React from 'react';
import MovieCard from './MovieCard';

const MovieCollection = ({ movies, genreName }) => {
  return (
    <div className="movie-collection">
      <h2>{genreName}</h2>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MovieCollection;
