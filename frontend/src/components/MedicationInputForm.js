import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MedicationInputForm = () => {
  const [drugList, setDrugList] = useState([]);
  const [currentDrug, setCurrentDrug] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCurrentDrug(e.target.value);
  };

  const handleAddDrug = () => {
    if (currentDrug) {
      setDrugList([...drugList, currentDrug]);
      setCurrentDrug("");
    }
  };

  const handleRemoveDrug = (index) => {
    setDrugList(drugList.filter((_, i) => i !== index));
  };

  const handleCheckInteractions = () => {
    const existingLogs = JSON.parse(localStorage.getItem("logs")) || [];
    const newLog = {
      id: Date.now(),
      medications: drugList,
      date: new Date().toLocaleString(),
    };
    existingLogs.push(newLog);
    localStorage.setItem("logs", JSON.stringify(existingLogs));

    navigate("/interaction-results");
  };

  const handleReset = () => {
    setDrugList([]);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Drug Interaction Checker</h2>
      <p style={descriptionStyle}>
        Check interactions with multiple drugs, vaccines, supplements, alcohol,
        food, and diseases.
      </p>
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Enter a drug name"
          value={currentDrug}
          onChange={handleChange}
          style={inputStyle}
        />
        <button onClick={handleAddDrug} style={addButtonStyle}>
          Add
        </button>
      </div>
      {drugList.length > 0 && (
        <div style={listContainerStyle}>
          <h3>Unsaved interactions list</h3>
          <ul style={ulStyle}>
            {drugList.map((drug, index) => (
              <li key={index} style={liStyle}>
                {drug}
                <button
                  onClick={() => handleRemoveDrug(index)}
                  style={removeButtonStyle}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={buttonContainerStyle}>
        <button
          onClick={handleCheckInteractions}
          style={
            drugList.length < 2 ? disabledCheckButtonStyle : checkButtonStyle
          }
          disabled={drugList.length < 2}
        >
          Check Interactions
        </button>

        <button onClick={handleReset} style={resetButtonStyle}>
          Start over
        </button>
      </div>
    </div>
  );
};

// Styling
const containerStyle = {
  width: "100%",
  maxWidth: "400px", // Matches signup form
  margin: "50px auto", // Centers like the signup form
  padding: "30px",
  backgroundColor: "#393e46", // Matches signup form background
  borderRadius: "10px",
  color: "#eeeeee", // Light text for readability
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Similar shadow effect
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headingStyle = {
  fontSize: "24px",
  marginBottom: "10px",
  color: "#eeeeee", // Matches text color with other forms
};

const descriptionStyle = {
  fontSize: "16px",
  marginBottom: "20px",
  color: "#cccccc", // Slightly lighter text for description
};

const inputContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
  width: "100%",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #eeeeee", // Matches input borders to the form's aesthetic
  borderRadius: "5px",
  backgroundColor: "#222831", // Dark background for inputs
  color: "#ffffff", // Light text for readability
  boxSizing: "border-box", // Ensures consistent alignment
};

const addButtonStyle = {
  padding: "10px 15px",
  marginLeft: "10px",
  backgroundColor: "#00adb5", // Accent color matching other forms
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const listContainerStyle = {
  marginBottom: "20px",
  width: "100%", // Ensures consistent width alignment
};

const ulStyle = {
  listStyleType: "none",
  paddingLeft: "0",
};

const liStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #444", // Darker border for consistency
};

const removeButtonStyle = {
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%", // Matches width with container
  gap: "10px",
};

const checkButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#00adb5", // Accent color
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const resetButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#5c646f", // Neutral button color
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const disabledCheckButtonStyle = {
  ...checkButtonStyle,
  backgroundColor: "#cccccc", // Disabled background color
  cursor: "not-allowed",
};

export default MedicationInputForm;
