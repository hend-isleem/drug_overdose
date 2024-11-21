import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(storedLogs);
  }, []);

  const handleClearLogs = () => {
    localStorage.removeItem("logs");
    setLogs([]);
  };

  const handleLogClick = (medications) => {
    navigate("/interaction-results", { state: { medications } });
  };

  return (
    <div style={logsContainerStyle}>
      <h2 style={headingStyle}>Medication Logs</h2>
      {logs.length > 0 ? (
        logs.map((log) => (
          <div
            key={log.id}
            style={logItemStyle}
            onClick={() => handleLogClick(log.medications)}
          >
            <p style={logDateStyle}>
              <strong>Date:</strong> {log.date}
            </p>
            <p style={logMedicationsStyle}>
              <strong>Medications:</strong> {log.medications.join(", ")}
            </p>
          </div>
        ))
      ) : (
        <p style={noLogsStyle}>No logs available</p>
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
