// Navbar.jsx
import React from 'react';
import "../CSS/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;