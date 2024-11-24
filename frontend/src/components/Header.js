import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <h1 style={logoTextStyle}>DDIs Checker</h1>
      </div>
    </header>
  );
};

// Styles
const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px",
  background: "linear-gradient(to right, #4e54c8, #8f94fb)", // Purple gradient background
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const logoTextStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#ffffff",
  margin: 0,
};

export default Header;

