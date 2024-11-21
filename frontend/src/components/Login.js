import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccessPopup(false);

    try {
      const response = await axios.post("http://localhost:3001/v1/auth/login", {
        email: email,
        password: password,
      });

      if (response.data.tokens && response.data.tokens.access.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email, token: response.data.tokens.access.token })
        );
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div style={pageContainerStyle}>
      <div style={formContainerStyle}>
        <h2 style={formTitleStyle}>Login</h2>
        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email:
            </label>
            <input
              type="text"
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
            <div style={passwordContainerStyle}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={passwordInputStyle}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                style={toggleVisibilityStyle}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          <button type="submit" style={submitButtonStyle}>
            Login
          </button>
        </form>
        {error && <p style={errorStyle}>{error}</p>}

        {showSuccessPopup && (
          <div style={popupContainerStyle}>
            <div style={popupStyle}>
              <div style={popupIconStyle}>✅</div>
              <p style={popupMessageStyle}>Login Successful!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const pageContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#222831;",
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "400px",
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
};

const passwordContainerStyle = {
  position: "relative",
};

const passwordInputStyle = {
  ...inputStyle,
  paddingRight: "40px",
};

const toggleVisibilityStyle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#eeeeee",
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
  marginTop: "10px",
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

export default LoginForm;

