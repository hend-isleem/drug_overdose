import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div style={pageStyle}>
      <div style={contentContainerStyle}>
        <h1 style={headingStyle}>Welcome to the Drug Interaction Checker</h1>
        <p style={subHeadingStyle}>
          Easily check for potential interactions between your medications.
        </p>
        {isLoggedIn ? (
          <Link to="/input-medication" style={buttonStyle}>
            Start Checking Medications
          </Link>
        ) : (
          <div>
            <h2 style={promptStyle}>
              Please log in to access the Drug Interaction Checker
            </h2>
            {/* <div style={authButtonsContainerStyle}>
              <Link to="/register" style={authButtonStyle}>
                Register
              </Link>
              <Link to="/login" style={authButtonStyle}>
                Login
              </Link>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  backgroundColor: "#222831",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Poppins', sans-serif",
  margin: 0,
};

const contentContainerStyle = {
  textAlign: "center",
  color: "#eeeeee",
  padding: "30px",
  backgroundColor: "#393e46",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  width: "400px",
  maxWidth: "400px",
};

const headingStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "15px",
};

const subHeadingStyle = {
  fontSize: "1rem",
  marginBottom: "20px",
  color: "#cccccc",
};

const promptStyle = {
  fontSize: "1rem",
  marginBottom: "20px",
  color: "#eeeeee",
};

const buttonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#00adb5",
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: "bold",
  textDecoration: "none",
  borderRadius: "5px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease, transform 0.3s ease",
  marginTop: "20px",
  cursor: "pointer",
  width: "150px",
  textAlign: "center",
};

// const authButtonsContainerStyle = {
//   display: "flex",
//   justifyContent: "center",
//   gap: "10px",
// };

// const authButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#5c646f",
//   color: "#ffffff",
//   fontSize: "1rem",
//   fontWeight: "bold",
//   textDecoration: "none",
//   borderRadius: "5px",
//   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//   transition: "background-color 0.3s ease, transform 0.3s ease",
//   cursor: "pointer",
//   width: "150px",
//   textAlign: "center",
// };
export default Home;
