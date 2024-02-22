import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../utils/API';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // You may have a checkbox for admin registration
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the signup function with the registration details
      await signup({ isAdmin, username, email, password });

      // Redirect to the login page or another page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div>
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
        {/*
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin
        </label>
        */}

        <button type="submit">Register</button>
      </form>

      {/* Link to the login page */}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
