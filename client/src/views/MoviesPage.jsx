// MoviePage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/MoviesPage.css';

const MoviePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || {};

  // Ensure that there are search results before rendering
  if (!results) {
    return <p>No results found.</p>;
  }

  // You may want to customize this rendering based on your data structure
  return (
    <div>
      <h1>{results[0].title}</h1>
      <img src={results[0].poster_url} alt={results[0].title} />
      <p>{results[0].synopsis}</p>
      {/* Add more details as needed */}

      {/* Button to navigate to /booking */}
      <button class="bookbutton" onClick={() => navigate('/booking')}>
        Book Now
      </button>
    </div>
  );
};

export default MoviePage;
