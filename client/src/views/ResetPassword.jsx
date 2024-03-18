import React, { useState } from 'react';
import { sendResetEmail } from '../utils/API';

const Reset = () => {
  const [userOrEmail, setUserOrEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendResetEmail(userOrEmail);
      setSubmitted(true);
    } catch (error) {
      console.error('Error during registration:', error);

      alert('Password change failed. Please try again.');
    }
  };

  return (
    <div>
      {
        !submitted ?
        <>
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>

            <label htmlFor="userOrEmail">Enter your Username or Email:</label>
            <input
              type="text"
              id="userOrEmail"
              value={userOrEmail}
              onChange={(e) => setUserOrEmail(e.target.value)}
              required
            />

            <button type="submit">Reset</button>
          </form>
        </>
        : 
        <h1>Our system will send a reset link shortly.</h1>
      }
    </div>
  );
};

export default Reset;
