import React, { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <header style={headerStyle}>
      <h1>Drug Interaction Checker</h1>
      <form onSubmit={handleSearch} style={searchFormStyle}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
        <button type="submit" style={searchButtonStyle}>
          Search
        </button>
      </form>
      <nav>
        <a href="/" style={linkStyle}>
          Home
        </a>{" "}
        |{" "}
        <a href="/input-medication" style={linkStyle}>
          Medication Input
        </a>{" "}
        |{" "}
        <a href="/logs" style={linkStyle}>
          Logs
        </a>
      </nav>
      <div style={authButtonsStyle}>
        <a href="/register" style={linkStyle}>
          Register
        </a>

        <a href="/login" style={linkStyle}>
          Login
        </a>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "0 10px",
};

const searchFormStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const searchInputStyle = {
  padding: "5px",
  width: "200px",
  marginRight: "5px",
};

const searchButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const authButtonsStyle = {
  display: "flex",
  gap: "10px",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};

export default Header;
