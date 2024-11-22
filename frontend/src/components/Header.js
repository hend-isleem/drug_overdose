import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.email) {
      setIsLoggedIn(true)
      setUsername(user.name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUsername('')
    window.location.reload()
  }

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <h1 style={titleStyle}>Drug Interaction Checker</h1>
      </div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/input-medication" style={linkStyle}>
          Medication Input
        </Link>
        <Link to="/logs" style={linkStyle}>
          Logs
        </Link>
      </nav>
      <div style={authButtonsStyle}>
        {isLoggedIn ? (
          <>
            <span style={greetingStyle}>Hello, {username}!</span>
            <button style={buttonStyle} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" style={buttonStyle}>
              Register
            </Link>
            <Link to="/login" style={buttonStyle}>
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

// Styles
const headerStyle = {
  backgroundColor: '#393e46',
  color: '#eeeeee',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  fontFamily: "'Poppins', sans-serif",
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
}

const titleStyle = {
  fontSize: '1.8rem',
  margin: '0',
  fontWeight: 'bold',
  color: '#ffffff',
}

const navStyle = {
  display: 'flex',
  gap: '20px',
}

const linkStyle = {
  color: '#eeeeee',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.3s ease',
}

const authButtonsStyle = {
  display: 'flex',
  gap: '15px',
}

const buttonStyle = {
  backgroundColor: '#5c646f',
  color: '#ffffff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'center',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const greetingStyle = {
  color: '#eeeeee',
  fontSize: '1rem',
  marginRight: '15px',
  alignSelf: 'center',
}

export default Header
