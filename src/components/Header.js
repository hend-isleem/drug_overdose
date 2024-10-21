import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Drug Interaction Checker</h1>
      <nav>
        <a href="/" style={linkStyle}>
          Home
        </a>{" "}
        |
        <a href="/input-medication" style={linkStyle}>
          Medication Input
        </a>{" "}
        |
        <a href="/logs" style={linkStyle}>
          Logs
        </a>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "0 10px",
};

export default Header;
