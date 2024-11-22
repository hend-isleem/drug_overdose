import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setAccessToken(parsedUser.token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    const handleGetLogs = async () => {
      if (!isLoggedIn) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:3001/v1/drugs/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setLogs(response.data.documents || []);
        } else {
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            navigate("/login");
          } else {
            setError(response.message || "An error occurred. Please try again.");
          }
        }
      } catch (err) {
        console.error("Failed to fetch drug interactions:", err);
        setError(err.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && accessToken) {
      handleGetLogs();
    }
  }, [isLoggedIn, accessToken, navigate]);

  const handleClearLogs = async () => {
    try {
      await axios.delete("http://localhost:3001/v1/drugs/clear", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setLogs([]);
    } catch (err) {
      setError("Failed to clear logs. Please try again.");
    }
  };

  const handleLogClick = (log) => {
    console.log("Log Clicked:", log);
  };

  return (
    <div style={logsContainerStyle}>
      <h2 style={headingStyle}>Medication Logs</h2>
      {loading ? (
        <p style={noLogsStyle}>Loading...</p>
      ) : error ? (
        <p style={noLogsStyle}>{error}</p>
      ) : isLoggedIn ? (
        logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log._id}
              style={logItemStyle}
              onClick={() => handleLogClick(log)}
            >
              <p style={logDateStyle}>
                <strong>Date:</strong> {new Date(log.createdAt).toLocaleString()}
              </p>
              <p style={logMedicationsStyle}>
                <strong>Medications:</strong> {log.drugs.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p style={noLogsStyle}>No logs available.</p>
        )
      ) : (
        <p style={noLogsStyle}>You have to login for logs to show.</p>
      )}
      {logs.length > 0 && (
        <button onClick={handleClearLogs} style={clearButtonStyle}>
          Clear Logs
        </button>
      )}
    </div>
  );
};

// Styles
const logsContainerStyle = {
  backgroundColor: "#222831",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#eeeeee",
  fontFamily: "'Poppins', sans-serif",
  padding: "20px",
};

const headingStyle = {
  fontSize: "1.8rem",
  marginBottom: "20px",
};

const logItemStyle = {
  backgroundColor: "#393e46",
  color: "#eeeeee",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "10px",
  width: "80%",
  maxWidth: "500px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  transition: "transform 0.2s ease",
};

const logDateStyle = {
  marginBottom: "10px",
};

const logMedicationsStyle = {
  marginBottom: "0",
};

const noLogsStyle = {
  color: "#cccccc",
};

const clearButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#f44336",
  color: "#ffffff",
  fontSize: "1rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

export default Logs;
