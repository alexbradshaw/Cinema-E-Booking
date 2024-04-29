import React, { useState } from 'react';
import { sendResetEmail } from '../utils/API';
import { useMutation } from '@tanstack/react-query';

const Reset = () => {
  const [userOrEmail, setUserOrEmail] = useState('');
  const resetEmail = useMutation({ mutationFn: sendResetEmail })

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetEmail.mutate(userOrEmail);
  };

  return (
    <div>
      {
        resetEmail.isSuccess 
          ?
            <h1 style={{"marginTop": "50px"}}>Our system will send a reset link shortly.</h1>
            :
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
      }
    </div>
  );
};

export default Reset;
