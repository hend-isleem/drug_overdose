import React, { useState } from 'react';

const Home = () => {
  const [currentMedications, setCurrentMedications] = useState('');
  const [newPrescription, setNewPrescription] = useState('');
  const [interactionWarnings, setInteractionWarnings] = useState(null);

  const checkInteractions = () => {
    const warnings = "Warning: Interaction detected!";
    setInteractionWarnings(warnings);
  };

  return (
    <div className="container">
      {/* Centered welcome message */}
      <div className="welcome-section">
        <h1>Welcome to ProHealth</h1>
        <p>Check interactions easily with our tool</p>
      </div>

      {/* Drug Interaction Checker Section */}
      <h2>Real-Time Drug Interaction Checker</h2>
      <div className="interaction-checker">
        <div>
          <h3>Current Medications</h3>
          <textarea
            value={currentMedications}
            onChange={(e) => setCurrentMedications(e.target.value)}
            placeholder="Enter current medications"
          />
        </div>
        <div>
          <h3>New Prescription</h3>
          <input
            type="text"
            value={newPrescription}
            onChange={(e) => setNewPrescription(e.target.value)}
            placeholder="Enter new prescription"
          />
        </div>
      </div>
      <button onClick={checkInteractions}>Check for Interactions</button>
      {interactionWarnings && <p>{interactionWarnings}</p>}
    </div>
  );
};

export default Home;


