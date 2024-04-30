import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import Link for navigation
import { login } from '../utils/API'; // Adjust the path based on your file structure
import { AuthContext } from '../App';
import "./CSS/Login.css"; // import for CSS
import { useMutation } from '@tanstack/react-query';

const Login = (props) => {
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false); 
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();
  const { auth, dispatch } = useContext(AuthContext);

  const location = useLocation();

  const loginMutation = useMutation({ 
    mutationFn: login, 
    onSuccess: async () => {
      await dispatch({ type: 'SET_AUTH', payload: true });
      if (location.state.pendingOrder) {
        navigate('/orderConfirmation', {state: location.state})
      } else {
        navigate('/');
      }
    },
    onError: () => {
      setShowErrorPopup(true);
    }
  })

  useEffect(() => {
    if (!localStorage.getItem('auth') && auth) {
      dispatch({ type: 'SET_AUTH', payload: false });
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginMutation.mutate({ userOrEmail, password, rememberMe });
  };

  const togglePasswordVisibility = () => { //show password function
    setShowPassword(!showPassword);
  };

  return (
    <div id="login-container">
        <h1> Login </h1>
        
        {showErrorPopup && ( // Conditional rendering for the error popup
        <div className="error-popup">
          <p>{loginMutation.error.cause}</p>
          <button onClick={() => setShowErrorPopup(false)}>X</button> {/* Button to close the popup */}
        </div>
        )} 
        <div className='mainContainer'>
          <form className="form" onSubmit={handleSubmit}>

              {/* Login Input */}
              <div className="inputContainer">
                  <label className="image-replace email" htmlFor="signin-email">E-mail or Username</label>
                  <input 
                    className = {'inputBox'}
                    
                    id="userOrEmail" 
                    type="text"
                    value={userOrEmail}
                    onChange={(e) => setUserOrEmail(e.target.value)}
                    required
                    placeholder="E-mail or Username">
                  </input>
              </div>
              <br />

              {/* Password Input */}
              <div className="inputContainer">
                  <label className="image-replace password" htmlFor="signin-password">Password</label>
                  <input
                      className = {'inputBox'}
                      id="password"
                      type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password">
                  </input>

                  <div className = "showButtonContainer">
                    <button className="showButton" type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>   
                  </div>
                  
              </div>
              <br />

              {/* Remember Me Button */}
              <div className="inputContainer">
                <label>
                  Remember Me
                  <input
                      className = {'rememberInputBox'}
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                  />

                </label>
              </div>

              {/* Submit Button */}
              <div className="buttonContainer">
                <div className="inputContainer">
                    <input 
                        className="full-width" 
                        type="submit" 
                        value="Login"> 
                    </input>
                </div>
              </div>
          </form>
        
          <p className="form-bottom-message"><a href="/register">Create an Account</a></p>

          <p className="form-bottom-message"><a href="/resetPassword">Forgot Your Password?</a></p>
        </div>
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