// Navbar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminCheck, authCheck, logout, searchMovies } from '../../utils/API'; 
import { AuthContext } from '../../App';
import "../CSS/Navbar.css";
import { useMutation } from '@tanstack/react-query';

const AuthenticatedNav = () => {
  const { admin: { isAdmin }, auth, dispatch } = useContext(AuthContext);

  const check = useMutation({ 
    mutationFn: adminCheck,
    onSuccess: async (data) => {
      await dispatch({ type:'SET_ADMIN', payload: data });
    },
    onError: async () => {
      await dispatch({ type:'SET_ADMIN', payload: false });
    }
  })

  useEffect(() => {
    if (auth) {
      check.mutate();
    }
  }, [auth]);

  const signOut = useMutation({ 
    mutationFn: logout,
    onSuccess: async () => {
      await dispatch({ type:'RESET' });
    },
    onError: async (error) => {
      console.error("Something went wrong with logout!\n" + error);
      await dispatch({ type:'RESET' });
    }
  })

  return (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/editProfile">Profile</Link></li>
      <li><Link onClick={() => signOut.mutate()}>Logout</Link></li>
      { isAdmin ? <li><Link to="/admin">Admin</Link></li> : <></> }
    </>
  );
};

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { auth, dispatch } = useContext(AuthContext);

  const authStatus = useMutation({ 
    mutationFn: authCheck,
    onSuccess: async (data) => {
      await dispatch({ type:'SET_ADMIN', payload: data });
    },
    onError: async () => {
      await dispatch({ type:'RESET' });
    }
  })

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch({ type:'SET_AUTH', payload: true });
      authStatus.mutate();
    }
  }, [])
  
  const search = useMutation({ mutationFn: searchMovies })

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      // Call the search function with the current search term
      const searchResults = await search.mutateAsync(searchTerm);

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
      </ul>
    </nav>
  );
};

export default Navbar;