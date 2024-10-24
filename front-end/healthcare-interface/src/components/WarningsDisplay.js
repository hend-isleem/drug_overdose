import React from 'react';

function WarningsDisplay({ warnings, alternatives }) {
  return (
    <div>
      <h2>Interaction Warnings</h2>
      {warnings.length > 0 ? (
        <ul>
          {warnings.map((warning, index) => (
            <li key={index}>{warning.message}</li> // Assuming 'message' is part of the warning object
          ))}
        </ul>
      ) : (
        <p>No warnings found.</p>
      )}
      {alternatives && alternatives.length > 0 && (
        <div>
          <h3>Alternative Medications</h3>
          <ul>
            {alternatives.map((alt, index) => (
              <li key={index}>{alt.name}</li> // Assuming 'name' is part of the alternative medication object
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WarningsDisplay;

