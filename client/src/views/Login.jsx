import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { login } from '../utils/API'; // Adjust the path based on your file structure
import { AuthContext } from '../App';

const Login = () => {
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { auth, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('auth') && auth) {
      dispatch({ type: 'SET_AUTH', payload: false });
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login({ userOrEmail, password });
      await dispatch({ type: 'SET_AUTH', payload: true });

      // Clear the form fields after successful login
      setUserOrEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div id="login-container">
        <h1> Login </h1>
        <form className="form" onSubmit={handleSubmit}>
            <p className="fieldset">
                <label className="image-replace email" htmlFor="signin-email">E-mail or Username</label>
                <input 
                    className="full-width has-padding has-border" 
                    id="userOrEmail" 
                    type="text"
                    value={userOrEmail}
                    onChange={(e) => setUserOrEmail(e.target.value)}
                    required
                    placeholder="E-mail or Username">
                </input>
               
            </p>

            <p className="fieldset">
                <label className="image-replace password" htmlFor="signin-password">Password</label>
                <input
                    className="full-width has-padding has-border"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password">
                </input>
                <a href="#0" className="hide-password">Show</a>
                
            </p>

            {/*
            <p class="fieldset">
                <input 
                    type="checkbox" 
                    id="remember-me" 
                    checked> </input>
                <label for="remember-me">Remember me</label>
            </p>
            */}   
            
            
            <p className="fieldset">
                <input 
                    className="full-width" 
                    type="submit" 
                    value="Login"> 
                </input>
            </p>
        </form>

        <p className="form-bottom-message"><a href="/register">Create an Account</a></p>

        <p className="form-bottom-message"><a href="/resetPassword">Forgot Your Password?</a></p>
    </div>

  );
};

export default Login;

    {/*
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
      /*
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
</div>*/