// SearchResults.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  return (
    <div>
      <h2>Search Results for: {searchQuery}</h2>
      {/* Display search results here */}
    </div>
  );
};

export default SearchResults;
