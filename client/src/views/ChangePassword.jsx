import React, { useState } from 'react';
import { changePassword } from '../utils/API';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const ChangePassword = () => {
  const [oldPassword, setOld] = useState('');
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const changePass = useMutation({ mutationFn: changePassword })

  const handleSubmit = async (event) => {
    event.preventDefault();
    changePass.mutate({ token, password });
  };

  return (
    <div>
      {
        changePass.isError && (<h1>There was an error with changing your password!</h1>)
      }
      {
        changePass.isSuccess 
          ? 
            <>
              <h1>Your password has been updated!</h1>
              <Link to={'/login'}>Proceed to Login</Link>
            </>
            :
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
      }
    </div>
  );
};

export default ChangePassword;
