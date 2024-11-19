import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccessPopup(false);

    try {
      const response = await axios.post("http://localhost:3001/v1/auth/login", {
        "email": username,
        "password": password
    });
      console.log(response);
      if (response.data.tokens && response.data.tokens.access.token) {
        localStorage.setItem("user", JSON.stringify({ username, token: response.data.tokens.access.token}));
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false); 
          navigate("/"); 
        }, 2000); 
      } else {
        alert("Login failed: Invalid response from server.");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid credentials or server error. Please try again.");
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div style={popupContainerStyle}>
          <div style={popupStyle}>
            <div style={popupIconStyle}>✔️</div>
            <p style={popupMessageStyle}>Login Successful!</p>
          </div>
        </div>
      )}
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
  color: "green",
};

const popupMessageStyle = {
  fontSize: "18px",
  marginTop: "10px",
  color: "green",
};

export default LoginForm;
