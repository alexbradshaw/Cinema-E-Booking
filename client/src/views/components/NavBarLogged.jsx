import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { search } from '../../utils/API'; // Adjust the path based on your file structure

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      // Call the search function with the current search term
      const searchResults = await search(searchTerm);

      // Redirect to the search results page with the search term and results
      /*
      navigate({
        pathname: '/booking',
        search: `?query=${searchTerm}`,
        state: { results: searchResults },
      });
      */
      navigate('/movie', { state: { results: searchResults } });

      // Optionally, you can clear the search input after redirecting
      setSearchTerm('');
    } catch (error) {
      console.error('Error searching for movies:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/profile">Profile</a></li>
        <li>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a movie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
