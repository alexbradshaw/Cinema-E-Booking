import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAdmin, getAllMovies } from '../utils/API';
import './CSS/ManageMovies.css'; // Import CSS for ManageMovies view
import { AuthContext } from '../App';

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { admin: { isAdmin } } = useContext(AuthContext);

  useEffect(() => { checkAdmin(navigate) }, [isAdmin]);

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
              <img src={movie.poster_url} alt={movie.title} className="movie-poster" />
              <div className="movie-details">
                <h4>{movie.title}</h4>
                <p>Rating: {movie.rating}</p>
                <p>{movie.coming_soon ? 'Coming Soon' : 'Currently Running'}</p>
                <div className="button-container">
                    <button className="view-button">View</button>
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                </div>
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
