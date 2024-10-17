import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Make sure to import Routes
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import './App.css'; // If you want to add custom CSS

const App = () => {
  return (
    <Router>
      <div className="app-container" style={styles.container}>
        {/* Header with navigation */}
        <header style={styles.header}>
          <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </nav>
        </header>

        {/* Define Routes */}
        <Routes> {/* Routes should be defined here */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    backgroundImage: 'url(/freestocks-nss2eRzQwgw-unsplash.jpg)', // Background image in public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#333',
    padding: '10px',
    textAlign: 'center',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: '#fff',
    margin: '0 15px',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default App;
