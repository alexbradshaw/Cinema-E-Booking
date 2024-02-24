// Navbar.jsx
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminCheck, authCheck, logout, searchMovies } from '../../utils/API'; 
import { AuthContext } from '../../App';
import "../CSS/Navbar.css";

const AuthenticatedNav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { admin: { isAdmin }, auth, dispatch } = useContext(AuthContext);

  const adminStatus = async () => {
    const adminObject = await adminCheck();
    dispatch({ type:'SET_ADMIN', payload: adminObject });
  };

  useEffect(() => {
    if (auth) {
      adminStatus();
    }
  }, [auth]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      // Call the search function with the current search term
      const searchResults = await searchMovies(searchTerm);

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

  const signOut = async () => {
    try {
        await logout();
        dispatch({ type:'RESET' });
        localStorage.removeItem("auth");
    } catch (e) {
        console.log('Something went wrong with logout!')
        console.log('Message: ', e.message);
    }
}

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/editProfile">Profile</Link></li>
        <li><Link onClick={signOut}>Logout</Link></li>
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
        {
          isAdmin ? <li><Link to="/admin">Admin</Link></li> : <></>
        }
      </ul>
    </nav>
  );
};

const Navbar = () => {

  const { auth, dispatch } = useContext(AuthContext);

  const authStatus = async () => {
    const authStatus = await authCheck();
    dispatch({ type:'SET_AUTH', payload: authStatus });
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      authStatus();
    }
  }, [])

  return (
    <nav>
      <h1>Cinema E-Booking</h1>
      <ul>
        {
          !auth ?
            <>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
            </>
            :
            <AuthenticatedNav />
        }
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;