import React from 'react';

const Home = () => {
  const containerStyle = {
    backgroundColor: 'blue',
    // Add other styles as needed
  };

  return (
    <div style={containerStyle}>
      <h1>Currently Running Movies</h1>
      {/* Display currently running movies here */}

      <h1>Coming Soon Movies</h1>
      {/* Display coming soon movies here */}

      <h2>Search for a Movie</h2>
      <form action="/search" method="get">
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" required />
        <button type="submit">Search</button>
      </form>

      <h2>Login</h2>
      <a href="/login">Login</a>
    </div>
  );
};

export default Home;
