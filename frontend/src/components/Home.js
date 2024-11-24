import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa"; // For the heart icon
import "../App.css"; // Ensure correct path to App.css
import LoginForm from "./Login";
import RegisterForm from "./Register";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseForm = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="app">
      <div className="overlay"></div>
      <div className="container">
        <div className="heart-container">
          <FaHeartbeat className="large-heart-icon" />
        </div>
        <h1 className="title">Welcome to the Drug Interaction Checker</h1>
        <p className="subtitle">
          Easily check for potential interactions between your medications.
        </p>
        <p className="additional-statement">
          Please log in to access the Drug Interaction Checker
        </p>
        {!isLoggedIn ? (
          <div className="button-group">
            <button className="secondary-button" onClick={handleRegisterClick}>
              Register
            </button>
            <button className="secondary-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        ) : (
          <button className="primary-button">Start Now</button>
        )}

        {showLogin && (
          <div className="form-popup">
            <LoginForm />
            <button className="close-button" onClick={handleCloseForm}>
              Close
            </button>
          </div>
        )}

        {showRegister && (
          <div className="form-popup">
            <RegisterForm />
            <button className="close-button" onClick={handleCloseForm}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


