import React, { useState } from 'react';
import { changePassword } from '../utils/API';
import { Link, useParams } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOld] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password.length < 4) {
        throw new Error('Password is too short!');
      }
      await changePassword(token, password);
      setSubmitted(true);
    } catch (error) {
      console.error('Error during registration:', error);

      alert('Password change failed. ' +  error);
    }
  };

  return (
    <div>
      {
        !submitted ?
        <>
          <h1>Change Password</h1>
          <form onSubmit={handleSubmit}>

            
            <label htmlFor="oldPassword">Enter your old password:</label>
            <input
              type="text"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOld(e.target.value)}
              required
            />

            <label htmlFor="password">Enter your new password:</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Change Password</button>
          </form>
        </>
        : 
        <>
            <h1>Your password has been updated!</h1>
            <Link to={'/login'}>Proceed to Login</Link>
        </>
      }
    </div>
  );
};

export default ChangePassword;
