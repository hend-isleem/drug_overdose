import React from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation

function Header() {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/') // Navigate to the home page
    // Add logic to scroll to the welcoming container if you're on the home page
    const welcomingContainer = document.getElementById('welcoming-container')
    if (welcomingContainer) {
      welcomingContainer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        {/* Use onClick handler for the logo */}
        <span style={logoTextStyle} onClick={handleLogoClick}>
          DDIs Checker
        </span>
      </div>
    </header>
  )
}

// Styles
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
  background: 'linear-gradient(to right, #4e54c8, #8f94fb)', // Purple gradient background
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
}

const logoTextStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#ffffff',
  textDecoration: 'none', // Removes underline
  cursor: 'pointer', // Adds pointer cursor for better UX
}

export default Header
