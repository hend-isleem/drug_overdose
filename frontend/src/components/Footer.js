import React from 'react'

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Drug Interaction Checker. All rights reserved.</p>
      <div style={footerLinksStyle}>
        <a href="/terms" style={linkStyle}>
          Terms of Service
        </a>
        <a href="/privacy" style={linkStyle}>
          Privacy Policy
        </a>
        <a href="/contact" style={linkStyle}>
          Contact Us
        </a>
      </div>
      <p style={disclaimerStyle}>
        Disclaimer: This tool is for informational purposes only. Always consult
        a healthcare professional for medical advice.
      </p>
    </footer>
  )
}

// Basic styling for the footer
const footerStyle = {
  backgroundColor: '#393e46', // Matches the form container's color
  color: '#eeeeee', // Light gray for text
  padding: '20px',
  textAlign: 'center',
  borderTop: '1px solid #4a515d', // Subtle border to separate footer
  marginTop: 'auto',
  fontFamily: "'Poppins', sans-serif", // Matching the header font
}

const footerLinksStyle = {
  marginTop: '10px',
}

const linkStyle = {
  color: '#00adb5', // Accent color for links
  textDecoration: 'none',
  margin: '0 10px',
  transition: 'color 0.3s ease', // Smooth hover effect
}

const disclaimerStyle = {
  fontSize: '12px',
  marginTop: '10px',
  color: '#b0b0b0', // Slightly lighter gray for the disclaimer text
}

export default Footer
