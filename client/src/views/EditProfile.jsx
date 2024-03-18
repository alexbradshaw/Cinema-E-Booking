import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, updateUser } from '../utils/API';
import './CSS/EditProfile.css';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getLoggedInUser();
        setUsername(user.username);
        setEmail(user.email);
      } catch (error) {
        console.error('Error getting logged in user:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="editProfileContainer">
      <h2>Manage Profile</h2>
      <form onSubmit={handleSubmit} className="editProfileForm">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="inputField"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          disabled
          className="inputField"
          required
        />
        <br />
        <button type="submit" className='save-changes'>Save Changes</button>
        <button type="button" className='back' onClick={handleBack}>Back</button>
      </form>
    </div>
  );
};

export default EditProfile;
