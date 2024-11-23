import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPills, FaBook, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <h1 style={titleStyle}>Drug Interaction Checker</h1>
      </div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          <FaHome style={iconStyle} />
          Home
        </Link>
        <Link to="/input-medication" style={linkStyle}>
          <FaPills style={iconStyle} />
          Medication Input
        </Link>
        <Link to="/logs" style={linkStyle}>
          <FaBook style={iconStyle} />
          Logs
        </Link>
      </nav>
      <div style={authButtonsStyle}>
        <Link to="/register" style={buttonStyle}>
          <FaUserPlus style={iconStyle} />
          Register
        </Link>
        <Link to="/login" style={buttonStyle}>
          <FaSignInAlt style={iconStyle} />
          Login
        </Link>
      </div>
    </header>
  );
};

// Styles
const headerStyle = {
  background: "linear-gradient(to right, #4e54c8, #8f94fb)", // Gradient background
  color: "#fff",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  fontFamily: "'Poppins', sans-serif",
  position: "sticky", // Sticks to the top on scroll
  top: 0,
  zIndex: 1000,
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "1.8rem",
  margin: "0",
  fontWeight: "bold",
  color: "#ffffff",
};

const navStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  transition: "color 0.3s ease",
};

const iconStyle = {
  fontSize: "1.2rem",
};

const authButtonsStyle = {
  display: "flex",
  gap: "15px",
};

const buttonStyle = {
  backgroundColor: "transparent",
  color: "#ffffff",
  border: "2px solid #ffffff",
  padding: "10px 20px",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease, transform 0.2s ease",
};

export default Header;

