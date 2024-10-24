import React, { useState } from 'react';

function DrugInteractionChecker() {
    const [drugInput, setDrugInput] = useState('');  // State to store the user's input
    const [results, setResults] = useState([]);     // State to store the fetched results

    const handleInputChange = (event) => {
        setDrugInput(event.target.value);  // Update the state with the user input
    };

    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent the form from submitting in the traditional way
        // Here you would typically call a function to fetch data based on `drugInput`
        console.log('Form submitted with input:', drugInput);
        // Imagine fetchInteractions is a function to call your API
        fetchInteractions(drugInput).then(data => {
            setResults(data);  // Update your state with the fetched results
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="drug_input">Enter Drug Names:</label>
                <input
                    type="text"
                    id="drug_input"
                    name="drug_input"
                    value={drugInput}
                    onChange={handleInputChange}
                />
                <button type="submit">Check Interactions</button>
            </form>
            <div>
                {results.length > 0 && (
                    <div>
                        <h2>Interaction Results</h2>
                        {/* Display the results here */}
                        {results.map((result, index) => (
                            <p key={index}>{result}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DrugInteractionChecker;

