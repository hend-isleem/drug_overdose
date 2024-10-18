import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi'; // Using react-icons for the settings icon

const Header = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <h1>ProHealth</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/our-team">Our Team</Link></li>
          <li><Link to="/our-project">Our Project</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/settings"><FiSettings /></Link></li>
        </ul>
      </nav>
    </header>
  );
  
};

export default Header;
