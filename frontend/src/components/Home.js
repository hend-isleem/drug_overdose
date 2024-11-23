import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "./Home.css"; // Assuming CSS is extracted for global styles

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div style={pageStyle}>
      <div style={particleStyle}></div>
      <div style={overlayStyle}></div>
      <div style={containerStyle}>
        <FaHeartbeat style={heartIconStyle} />
        <h1 style={titleStyle}>Welcome to the Drug Interaction Checker</h1>
        <p style={subtitleStyle}>
          Easily check for potential interactions between your medications.
        </p>
        <p style={additionalStatementStyle}>
          {isLoggedIn
            ? "Start checking now!"
            : "Please log in to access the Drug Interaction Checker"}
        </p>
        {isLoggedIn ? (
          <Link to="/input-medication" style={primaryButtonStyle}>
            Start Now
          </Link>
        ) : (
          <div style={buttonGroupStyle}>
            <Link to="/register" style={secondaryButtonStyle}>
              Register
            </Link>
            <Link to="/login" style={secondaryButtonStyle}>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  position: "relative",
  backgroundColor: "#0d1b2a",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Poppins', sans-serif",
  margin: 0,
  overflow: "hidden",
};

const particleStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "200%",
  height: "200%",
  background: `
    radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
  backgroundSize: "80px 80px",
  backgroundPosition: "0 0, 40px 40px",
  animation: "moveParticles 15s linear infinite",
  zIndex: 0,
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))",
  zIndex: 1,
};

const containerStyle = {
  zIndex: 2,
  background: "rgba(39, 40, 34, 0.95)",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)",
  maxWidth: "350px",
  width: "90%",
};

const heartIconStyle = {
  fontSize: "3rem",
  color: "#00adb5",
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "10px",
  background: "linear-gradient(90deg, #00adb5, #ffffff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitleStyle = {
  fontSize: "1rem",
  marginBottom: "10px",
  color: "#cccccc",
};

const additionalStatementStyle = {
  fontSize: "0.9rem",
  marginBottom: "15px",
  color: "#f5f5f5",
  fontWeight: "bold",
};

const primaryButtonStyle = {
  display: "inline-block",
  padding: "12px 20px",
  backgroundColor: "#e50914",
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "5px",
  textDecoration: "none",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
  marginTop: "10px",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const secondaryButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#444444",
  color: "#ffffff",
  fontSize: "0.9rem",
  fontWeight: "bold",
  borderRadius: "5px",
  textDecoration: "none",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
};

export default Home;

















