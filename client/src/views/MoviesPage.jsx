// MoviePage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/MoviesPage.css';

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const MoviePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || {};

  if (!results) {
    return <p>No results found.</p>;
  }

  const lengthInMinutes = results[0].length;

  return (
    <div className="moviePageContainer">
      <div className="posterContainer">
        <img className="poster" src={results[0].poster_url} alt={results[0].title} />
      </div>
      <div className="movieDetails">
        <h1 className="title">{results[0].title}</h1>
        <p className="detailsText">
          {results[0].rating} &nbsp; &nbsp;
          {formatTime(lengthInMinutes)} &nbsp; &nbsp;
          <span className="director">Directed by:</span> {results[0].Director.name}
        </p>
        <p className="detailsText">{results[0].synopsis}</p>
        
        <h1>Showtimes</h1>
        {/* Showtimes here */}

        <button className="bookButton" onClick={() => navigate('/booking')}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MoviePage;
