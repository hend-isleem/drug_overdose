import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// import React, { useState } from 'react';

const App = () => {
  const [currentMedications, setCurrentMedications] = useState('');
  const [newPrescription, setNewPrescription] = useState('');
  const [interactionWarnings, setInteractionWarnings] = useState(null);
  const [alternativeMedications, setAlternativeMedications] = useState(null);

  const handleCheckInteractions = () => {
    // Placeholder logic for checking interactions and suggesting alternatives
    const warnings = 'Sample warning: Drug interactions detected between your medications.';
    const alternatives = 'Suggested alternatives: Medication A, Medication B, Medication C.';
    setInteractionWarnings(warnings);
    setAlternativeMedications(alternatives);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.navbar}>
          <div style={styles.logo}>ProHealth</div>
          <div style={styles.headerLinks}>
            <a href="/" style={styles.link}>Home</a>
            <a href="/login" style={styles.link}>Login</a>
            <a href="/signup" style={styles.link}>Sign Up</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.main}>
        <h2>Real-Time Drug Interaction Checker</h2>

        {/* Medication Cards */}
        <div style={styles.cardRow}>
          {/* Current Medications Card */}
          <div style={styles.card}>
            <h3>Current Medications</h3>
            <textarea
              value={currentMedications}
              onChange={(e) => setCurrentMedications(e.target.value)}
              placeholder="Enter current medications"
              style={styles.textArea}
            />
          </div>

          {/* New Prescription Card */}
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

        {/* Interaction Warnings */}
        {interactionWarnings && (
          <div style={styles.cardWarning}>
            <h4>Interaction Warnings</h4>
            <p>{interactionWarnings}</p>
          </div>
        )}

        {/* Suggested Alternatives */}
        {alternativeMedications && (
          <div style={styles.cardWarning}>
            <h4>Suggested Medication Alternatives</h4>
            <p>{alternativeMedications}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <h4>Connect with Us</h4>
        <p>
          <a href="https://github.com" style={styles.footerLink}>GitHub</a> | 
          <a href="https://linkedin.com" style={styles.footerLink}> LinkedIn</a>
        </p>
        <p>Contact Information</p>
        <p>Oshawa, Canada<br />
          L1G 0C5<br />
          T: 905.721.8668 ext. 7365<br />
          F: 905.721.3370
        </p>
      </footer>
    </div>
  );
};

// Styles for the components
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  header: {
    backgroundColor: '#141414',
    padding: '20px',
    textAlign: 'center',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#E50914',
  },
  headerLinks: {
    display: 'flex',
  },
  link: {
    color: '#FFF',
    margin: '0 15px',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  main: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  card: {
    width: '45%',
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
  footer: {
    backgroundColor: '#141414',
    color: '#FFF',
    padding: '30px',
    textAlign: 'center',
    marginTop: '40px',
  },
  footerLink: {
    color: '#FFF',
    textDecoration: 'none',
    margin: '0 10px',
  },
};

export default App;

