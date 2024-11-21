import React, { useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setShowSuccessPopup(false);

    // Example functionality for registration
    if (username && email && password) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h2 style={formTitleStyle}>Register</h2>
        <form onSubmit={handleRegister} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>
              Username:
            </label>
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
            <label htmlFor="email" style={labelStyle}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password:
            </label>
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
            Register
          </button>
        </form>
        {error && <p style={errorStyle}>{error}</p>}
        {showSuccessPopup && (
          <div style={popupContainerStyle}>
            <div style={popupStyle}>
              <div style={popupIconStyle}>✅</div>
              <p style={popupMessageStyle}>Registration Successful!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  minHeight: "100vh", // Ensures full-page height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#222831;", // Matches login page background
  margin: 0,
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "400px",
  margin: "50px auto",
  padding: "30px",
  backgroundColor: "#393e46",
  borderRadius: "10px",
  color: "#eeeeee",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formTitleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "1.5rem",
  color: "#ffffff",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const inputGroupStyle = {
  marginBottom: "15px",
  width: "100%",
};

const labelStyle = {
  marginBottom: "5px",
  display: "block",
  fontSize: "1rem",
  color: "#eeeeee",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #eeeeee",
  borderRadius: "5px",
  backgroundColor: "#222831",
  color: "#ffffff",
  boxSizing: "border-box",
  marginTop: "5px",
};

const submitButtonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#00adb5",
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s ease",
};

const errorStyle = {
  color: "red",
  marginBottom: "15px",
  textAlign: "center",
};

const popupContainerStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1000",
};

const popupStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

const popupIconStyle = {
  fontSize: "40px",
  color: "rgb(0, 123, 255)",
};

const popupMessageStyle = {
  fontSize: "18px",
  marginTop: "10px",
  color: "green",
};

export default RegisterForm;
