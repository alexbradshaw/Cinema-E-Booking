import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../utils/API';
import './CSS/ManageMovies.css'; // Import CSS for ManageMovies view

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="manage-movies-container">

      <Link to="/admin/movies/addMovie">
        <button className="add-movie-button">Add Movie</button>
      </Link>

      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-container">
              <h2>{movie.title}</h2>
              <img src={movie.poster_url} alt={movie.title} />
              <div className="movie-details">
                <span>Rating: {movie.rating}</span>
                <span>{movie.coming_soon ? 'Coming Soon' : 'Currently Running'}</span>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ManageMovies;
