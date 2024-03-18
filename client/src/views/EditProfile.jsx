import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, updateUser } from '../utils/API';
import './CSS/EditProfile.css';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_pic, setProfilePic] = useState('');
  const [promotion_enrollment, setEnrollment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getLoggedInUser();
        setUsername(user.username);
        setEmail(user.email);
        setProfilePic(user.profile_pic);
        setEnrollment(user.promotion_enrollment);
      } catch (error) {
        console.error('Error getting logged in user:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser({ username, promotion_enrollment, profile_pic });
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

        <label htmlFor="profile_pic">Profile Pic:</label>
        <input
          type="text"
          id="profile_pic"
          value={profile_pic}
          onChange={(e) => setProfilePic(e.target.value)}
          className="inputField"
          required
        />

        <label htmlFor="promotion_enrollment">Promotion Enrollment:</label>
        <input
        type="checkbox"
        checked={promotion_enrollment}
        onChange={(e) => setEnrollment(e.target.checked)}
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
