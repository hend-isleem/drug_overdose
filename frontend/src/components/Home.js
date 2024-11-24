import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa"; // For the heart icon
import "./App.css"; // Assuming global CSS for colors and styles

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem("user");
      if (user) navigate("/medication-input");
    };
    checkUserStatus();

    const handleStorageChange = (event) => {
      if (event.key === "user") {
        checkUserStatus();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

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
        <div className="button-group">
          <button
            className="secondary-button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
