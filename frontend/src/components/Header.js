import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <h1 style={titleStyle}>Drug Interaction Checker</h1>
      </div>
      <nav style={navStyle}>
        <a href="/" style={linkStyle}>
          Home
        </a>
        <a href="/input-medication" style={linkStyle}>
          Medication Input
        </a>
        <a href="/logs" style={linkStyle}>
          Logs
        </a>
      </nav>
      <div style={authButtonsStyle}>
        <a href="/register" style={buttonStyle}>
          Register
        </a>
        <a href="/login" style={buttonStyle}>
          Login
        </a>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#393e46", // Same as the footer's background color
  color: "#eeeeee", // Light gray text color matching the footer
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  fontFamily: "'Poppins', sans-serif",
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
  color: "#eeeeee",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.3s ease",
};

const authButtonsStyle = {
  display: "flex",
  gap: "15px",
};

const buttonStyle = {
  backgroundColor: "#5c646f",
  color: "#ffffff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "center",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  width: "120px",
  height: "29px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Header; 
