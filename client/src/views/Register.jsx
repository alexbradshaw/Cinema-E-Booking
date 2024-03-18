import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../utils/API';
import { AuthContext } from '../App';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [promotion_enrollment, setPromotions] = useState(false); // You may have a checkbox for admin registration
  const [submitted, setSubmitted] = useState(false);

  const { auth, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('auth') && auth) {
      dispatch({ type: 'SET_AUTH', payload: false });
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signup({ promotion_enrollment, username, email, password });
      setSubmitted(true);
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      { 
        !submitted ? 
        <>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* You may have a checkbox for admin registration */}
            
            <label>
              <input
                type="checkbox"
                checked={promotion_enrollment}
                onChange={(e) => setPromotions(e.target.checked)}
              />
              Would you like to be enrolled in promotions?
            </label>
          

            <button type="submit">Register</button>
          </form>

          {/* Link to the login page */}
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </>
        :
        <>
          <h1>You have been sent a confirmation link to verify your account. Please check <span>{email}</span>.</h1>
        </>
      }
    </div>
  );
};

export default Register;
