import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MedicationInputForm = () => {
  const [drugList, setDrugList] = useState([]);
  const [currentDrug, setCurrentDrug] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

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
    console.log("Checking interactions for:", drugList);
    navigate("/interaction-results"); // Navigate to the results page
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
        <button onClick={handleCheckInteractions} style={checkButtonStyle}>
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
  width: "500px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headingStyle = {
  fontSize: "24px",
  marginBottom: "10px",
  color: "#333",
};

const descriptionStyle = {
  fontSize: "16px",
  marginBottom: "20px",
  color: "#555",
};

const inputContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "70%",
};

const addButtonStyle = {
  padding: "10px 15px",
  marginLeft: "10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

const listContainerStyle = {
  marginBottom: "20px",
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
  borderBottom: "1px solid #ccc",
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
  justifyContent: "center",
  gap: "10px",
};

const checkButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const resetButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#888",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default MedicationInputForm;
