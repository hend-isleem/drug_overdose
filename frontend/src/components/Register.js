import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      alert("Please enter all required fields.");
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await axios.post("http://localhost:3001/v1/auth/register", {
        "name": username,
        "email": email,
        "password": password
      });
      if (response.status === 201) {
        setSuccess("User registered successfully!");
        setTimeout(() => {
          setSuccess(false); 
          navigate("/login"); 
        }, 2000); 
      } else {
        setError(response.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      if (err.response.data.message){
        setError(err.response.data.message)
      } else setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Register</h2>
      {error && <div style={errorStyle}>{error}</div>}
      {success && (
        <div style={popupContainerStyle}>
          <div style={popupStyle}>
            <div style={popupIconStyle}>✅</div>
            <p style={popupMessageStyle}>
              Registeration Successful! 
              <br></br>
              Redirecting to Login..
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} style={formStyle}>
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
          <label htmlFor="email">Email:</label>
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
        <button type="submit" style={submitButtonStyle} disabled={loading}>
          {loading ? "Registering..." : "Register"}
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
  backgroundColor: "white",
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
