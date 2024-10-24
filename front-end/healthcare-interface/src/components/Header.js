import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/our-team">Our Team</Link></li>
        </ul>
      </nav>
    </header>
  );
}
<nav style={{ background: 'navy', padding: '10px 0' }}>
  <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
    <li style={{ margin: '0 10px' }}><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
    <li style={{ margin: '0 10px' }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
    <li style={{ margin: '0 10px' }}><Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link></li>
    <li style={{ margin: '0 10px' }}><Link to="/our-team" style={{ color: 'white', textDecoration: 'none' }}>Our Team</Link></li>
  </ul>
</nav>

export default Header;
