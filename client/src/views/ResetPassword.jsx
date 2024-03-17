import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../utils/API';

const Reset = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // You may have a checkbox for admin registration
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the signup function with the registration details
      await changePassword(email, oldPassword, newPassword);
      // Redirect to the login page or another page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);

      alert('Password change failed. Please try again.');
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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

        <button type="submit">Reset</button>
      </form>

      {/* Link to the login page */}
      <p><Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Reset;
