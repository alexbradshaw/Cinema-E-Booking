import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { login } from '../utils/API'; // Adjust the path based on your file structure
import { AuthContext } from '../App';
import "./CSS/Login.css"; // import for CSS

const Login = () => {
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added for "Show Password" feature
  const [showErrorPopup, setShowErrorPopup] = useState(false); // Added for showing the error popup
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
      //setUserOrEmail('');
      //setPassword('');
      // If login is successful, navigate to the home page or dashboard
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      // Set the error message to display to the user
      setShowErrorPopup(true); // Show the error popup on catch
    } //finally {
      //navigate('/');
    //}
  };

  const togglePasswordVisibility = () => { //show password function
    setShowPassword(!showPassword);
  };

  const handleClosePopup = () => { // Function to close the error popup
    setShowErrorPopup(false);
  };

  return (
    <div id="login-container">
        <h1> Login </h1>
        
        {showErrorPopup && ( // Conditional rendering for the error popup
        <div className="error-popup">
          <p>Incorrect Username or Password</p>
          <button onClick={handleClosePopup}>X</button> {/* Button to close the popup */}
        </div>
        )} 

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
                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password">
                </input>
                <button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>   
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