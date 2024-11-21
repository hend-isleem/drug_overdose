import React from "react";

const Footer = () => {
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
  );
};

// Basic styling for the footer
const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
  borderTop: "1px solid #444",
  marginTop: "auto", // This will push the footer to the bottom when needed
};

const footerLinksStyle = {
  marginTop: "10px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "0 10px",
};

const disclaimerStyle = {
  fontSize: "12px",
  marginTop: "10px",
  color: "#ccc",
};

export default Footer;
