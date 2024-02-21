// MoviePage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const MoviePage = () => {
  const location = useLocation();
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
    </div>
  );
};

export default MoviePage;
