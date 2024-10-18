import React, { useState } from "react";

const InteractionChecker = () => {
  const [currentMedications, setCurrentMedications] = useState("");
  const [newPrescription, setNewPrescription] = useState("");
  const [interaction, setInteraction] = useState(null);

  const handleInteractionCheck = async () => {
    // Call API to check interaction
    const response = await fetch("/api/check-interaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentMedications,
        newPrescription,
      }),
    });

    const result = await response.json();
    setInteraction(result);
  };

  return (
    <div className="interaction-checker">
      <h2>Real-Time Drug Interaction Checker</h2>
      <div className="form-group">
        <label>Enter Current Medications:</label>
        <textarea
          value={currentMedications}
          onChange={(e) => setCurrentMedications(e.target.value)}
          placeholder="Enter current medications"
        />
      </div>

      <div className="form-group">
        <label>Enter New Prescription:</label>
        <input
          type="text"
          value={newPrescription}
          onChange={(e) => setNewPrescription(e.target.value)}
          placeholder="Enter new prescription"
        />
      </div>

      <button onClick={handleInteractionCheck}>Check Interaction</button>

      {interaction && (
        <div className="interaction-result">
          <h3>Interaction Result:</h3>
          {interaction.warning ? (
            <>
              <p><strong>Warning:</strong> {interaction.warning}</p>
              {interaction.alternatives && (
                <div>
                  <h4>Alternatives:</h4>
                  <ul>
                    {interaction.alternatives.map((alt) => (
                      <li key={alt}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p>No interactions detected. You're safe to proceed.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractionChecker;
