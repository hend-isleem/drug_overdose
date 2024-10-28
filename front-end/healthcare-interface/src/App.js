import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import OurTeam from './components/OurTeam';
import Header from './components/Header';
import Search from './components/Search'; // Import the Search component
import backgroundImage from './components/background.jpg';
import './App.css';

function App() {
  const appStyle = {
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
    background: `url(${backgroundImage}) no-repeat center center fixed`, // Background image applied here
    backgroundSize: 'cover' // Ensure the background covers the entire viewport
  };

  return (
    <Router>
      <Header /> {/* Include the Header component */}
      <div style={appStyle}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/search" element={<Search />} />  {/* New route for the Search component */}
          {/* You can add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


