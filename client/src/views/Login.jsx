import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { login } from '../utils/API'; // Adjust the path based on your file structure

const Login = () => {
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const isAdmin = await login({ userOrEmail, password });

      // Optionally, you can handle the result here
      if (isAdmin) {
        console.log('Login successful for admin');
        // Redirect the user to the admin dashboard or another page
      } else {
        console.log('Login successful for regular user');
        // Redirect the user to the regular user dashboard or another page
      }

      // Clear the form fields after successful login
      setUserOrEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userOrEmail">Username or Email:</label>
        <input
          type="text"
          id="userOrEmail"
          value={userOrEmail}
          onChange={(e) => setUserOrEmail(e.target.value)}
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

        <button type="submit">Login</button>
      </form>

      {/* Link to the registration page */}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
