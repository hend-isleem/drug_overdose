import React, { useState } from "react";
import "../App.css"; // Shared styles

const MedicationInputForm = () => {
  const [drugList, setDrugList] = useState([]);
  const [currentDrug, setCurrentDrug] = useState("");

  const handleAddDrug = () => {
    if (currentDrug) {
      setDrugList([...drugList, currentDrug]);
      setCurrentDrug("");
    }
  };

  const handleRemoveDrug = (index) => {
    setDrugList(drugList.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setDrugList([]);
  };

  return (
    <div className="app"> {/* Matches the home page's background */}
      <div className="overlay"></div> {/* Optional overlay */}
      <div className="container">
        <h1 className="title">Medication Input</h1>
        <p className="subtitle">
          Enter your medications to check for potential interactions.
        </p>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a drug name"
            value={currentDrug}
            onChange={(e) => setCurrentDrug(e.target.value)}
            className="input-field" // Use shared input styles
          />
          <button onClick={handleAddDrug} className="secondary-button">
            Add
          </button>
        </div>
        {drugList.length > 0 && (
          <ul className="drug-list">
            {drugList.map((drug, index) => (
              <li key={index} className="drug-item">
                {drug}
                <button
                  onClick={() => handleRemoveDrug(index)}
                  className="remove-button"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="button-group">
          <button
            className="secondary-button"
            disabled={drugList.length < 2}
          >
            Check Interactions
          </button>
          <button onClick={handleReset} className="secondary-button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicationInputForm;




