import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { confirmAccount } from '../utils/API';
import { AuthContext } from '../App';

const RegisterConfirmation = () => {
  const { token } = useParams();
  const { dispatch } = useContext(AuthContext);

  const confirm = async () => {
    const { auth } = await confirmAccount(token);
    console.log(auth);
    localStorage.setItem('auth', auth);
    await dispatch({ type: 'SET_AUTH', payload: true });
  }

  useEffect(() => {
    confirm();
  }, []);

  return (
   <div> 
      <h2>Your E-Cinema Account has been registered</h2>
      <p>
        Thank you for registering with E-Cinema. You can now <Link to={'/'}>browse and buy tickets!</Link>.
      </p>
   </div>
  );
};

export default RegisterConfirmation;
