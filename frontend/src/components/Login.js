import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      alert("Login successful!");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={submitButtonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginTop: "5px",
};

const submitButtonStyle = {
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default LoginForm;
