// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Home = () => {
  return (
    <div style={homeContainerStyle}>
      <div style={contentContainerStyle}>
        <h1 style={headingStyle}>Welcome to the Drug Interaction Checker ✨</h1>
        <p style={subHeadingStyle}>
          Easily check for potential interactions between your medications.
        </p>
        <Link to="/input-medication" style={buttonStyle}>
          Start Checking Medications
        </Link>
      </div>
    </div>
  );
};


const homeContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2%',
  backgroundColor: 'white', 
};

const contentContainerStyle = {
  textAlign: 'center',
  color: '#333',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  width: '80%',
  maxWidth: '600px',
};

const headingStyle = {
  fontSize: '2.25rem', 
  fontWeight: 'bold',
  marginBottom: '15px',
  fontFamily: 'Arial, sans-serif',
};

const subHeadingStyle = {
  fontSize: '1rem',
  marginBottom: '30px',
  fontFamily: 'Arial, sans-serif',
  color: '#555',
};

const buttonStyle = {
  display: 'inline-block',
  padding: '15px 30px',
  backgroundColor: 'rgb(0, 123, 255)', 
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textDecoration: 'none',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  marginTop: '20px',
};

export default Home;
