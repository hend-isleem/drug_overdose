import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

const App = () => {
  const [currentMedications, setCurrentMedications] = useState('');
  const [newPrescription, setNewPrescription] = useState('');
  const [interactionWarnings, setInteractionWarnings] = useState(null);
  const [alternativeMedications, setAlternativeMedications] = useState(null);

  const handleCheckInteractions = () => {
    // Simulated logic for checking interactions and suggesting alternatives
    const hasInteraction = true; // Replace with actual interaction check logic
    const warnings = hasInteraction ? 'Drug interaction detected between the current medications and the new prescription.' : 'No interactions detected.';
    const alternatives = hasInteraction ? 'Suggested alternatives: Medication A, Medication B, Medication C.' : '';

    setInteractionWarnings(warnings);
    setAlternativeMedications(alternatives);
  };

  return (
    <Router>
      <div className="app-container" style={styles.container}>
        {/* Header with navigation */}
        <header style={styles.header}>
          <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </nav>
        </header>

        {/* Routes for Home, Login, and Sign Up */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        {/* Main interaction checker */}
        <div style={styles.main}>
          <h2>Real-Time Drug Interaction Checker</h2>

          {/* Input forms for medications */}
          <div style={styles.cardRow}>
            <div style={styles.card}>
              <h3>Current Medications</h3>
              <textarea
                value={currentMedications}
                onChange={(e) => setCurrentMedications(e.target.value)}
                placeholder="Enter current medications"
                style={styles.textArea}
              />
            </div>

            <div style={styles.card}>
              <h3>New Prescription</h3>
              <input
                type="text"
                value={newPrescription}
                onChange={(e) => setNewPrescription(e.target.value)}
                placeholder="Enter new prescription"
                style={styles.input}
              />
            </div>
          </div>

          <button onClick={handleCheckInteractions} style={styles.button}>
            Check for Interactions
          </button>

          {/* Display interaction warnings */}
          {interactionWarnings && (
            <div style={styles.cardWarning}>
              <h4>Interaction Warnings</h4>
              <p>{interactionWarnings}</p>
            </div>
          )}

          {/* Display alternative medications */}
          {alternativeMedications && (
            <div style={styles.cardWarning}>
              <h4>Suggested Medication Alternatives</h4>
              <p>{alternativeMedications}</p>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

// Updated styles for full page width, fixed header, and proper content constraints
const styles = {
  container: {
    backgroundImage: 'url(/freestocks-nss2eRzQwgw-unsplash.jpg)', // Background image in public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw', // Full width of the viewport
    height: '100vh', // Full height of the viewport
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#333',
    padding: '10px 20px', // Add padding for a more compact design
    textAlign: 'center',
    width: '100%', // Ensure the header spans the full width
    position: 'fixed', // Keep the header fixed at the top
    top: 0,
    left: 0,
    zIndex: 1000, // Ensure the header stays on top of the content
    display: 'flex',
    justifyContent: 'center', // Center the navigation links
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: '#fff',
    margin: '0 20px', // Add space between links
    textDecoration: 'none',
    fontSize: '18px', // Font size for the links
  },
  main: {
    paddingTop: '100px', // Add padding to avoid content hiding under the header
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingBottom: '40px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency to make text readable over the background
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Add a shadow effect
    maxWidth: '1200px', // Limit the width of the content
    width: '100%',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  card: {
    flex: '1',
    margin: '0 10px',
    backgroundColor: '#F9F9F9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  textArea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #CCC',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #CCC',
  },
  button: {
    padding: '12px 30px',
    backgroundColor: '#E50914',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginTop: '20px',
  },
  cardWarning: {
    marginTop: '20px',
    backgroundColor: '#F8D7DA',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
};

export default App;
