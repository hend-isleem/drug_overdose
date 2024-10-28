import React, { useState } from 'react';

const Search = () => {
    const [firstMed, setFirstMed] = useState('');
    const [secondMed, setSecondMed] = useState('');
    const [interactionWarning, setInteractionWarning] = useState(null);
    const [step, setStep] = useState(1); // To control the step of input

    const handleFirstSearch = async () => {
        if (!firstMed) return;
        setStep(2); // Move to next step to enter second medication
        
    };

    const handleSecondSearch = async () => {
        if (!secondMed) return;
        
        try {
            // Simulate API call to check interactions
            const response = await fetch(`https://api.yourservice.com/interactions?drug1=${firstMed}&drug2=${secondMed}`);
            const data = await response.json();
            
            if (data.warning) {
                setInteractionWarning(data.warning);
            } else {
                setInteractionWarning("No interactions found.");
            }
        } catch (error) {
            console.error('Failed to fetch interaction information:', error);
            setInteractionWarning("Error fetching data.");
        }
    };

    return (
        <div className="search-container">
            {step === 1 ? (
                <div>
                    <input
                        type="text"
                        value={firstMed}
                        onChange={(e) => setFirstMed(e.target.value)}
                        placeholder="Enter first medication"
                    />
                    <button onClick={handleFirstSearch}>Search</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={secondMed}
                        onChange={(e) => setSecondMed(e.target.value)}
                        placeholder="Enter second medication"
                    />
                    <button onClick={handleSecondSearch}>Check Interactions</button>
                </div>
            )}
            {interactionWarning && <div className="interaction-warnings">{interactionWarning}</div>}
        </div>
    );
};

export default Search;






