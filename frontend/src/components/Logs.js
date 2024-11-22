import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [selectedLog, setSelectedLog] = useState(null) // State for selected log
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      setAccessToken(parsedUser.token)
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handleGetLogs = async () => {
      if (!isLoggedIn || !accessToken) return

      try {
        setLoading(true)
        setError(null)

        const response = await axios.get('http://localhost:3001/v1/drugs/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.status === 200) {
          setLogs(response.data.documents || [])
        } else if (response.status === 401) {
          alert('Session expired. Please log in again.')
          navigate('/login')
        } else {
          setError(response.message || 'An error occurred. Please try again.')
        }
      } catch (err) {
        console.error('Failed to fetch drug interactions:', err)
        setError(err.message || 'An error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    handleGetLogs()
  }, [isLoggedIn, accessToken, navigate])

  const handleLogClick = (log) => {
    setSelectedLog(log) // Set the clicked log as selected
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Major':
        return '#ff4d4d' // Red
      case 'Moderate':
        return '#ffac33' // Orange
      case 'Minor':
        return '#33cc33' // Green
      default:
        return '#cccccc' // Grey
    }
  }

  const styles = {
    classificationCard: {
      color: 'black',
      backgroundColor: '#fff',
      padding: '10px',
      margin: '10px 0',
      borderLeft: '5px solid',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    level: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    description: {
      fontSize: '16px',
    },
  }

  return (
    <div style={logsContainerStyle}>
      <h2 style={headingStyle}>Medication Logs</h2>
      {loading ? (
        <p style={noLogsStyle}>Loading...</p>
      ) : error ? (
        <p style={noLogsStyle}>{error}</p>
      ) : isLoggedIn ? (
        selectedLog ? (
          <div>
            <button
              onClick={() => setSelectedLog(null)}
              style={clearButtonStyle}
            >
              Back to Logs
            </button>
            <h2>Log Details</h2>
            <p>
              <strong>Date:</strong>{' '}
              {new Date(selectedLog.createdAt).toLocaleString()}
            </p>
            {selectedLog.interactions && selectedLog.interactions.length > 0 ? (
              selectedLog.interactions.map((interaction, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.classificationCard,
                    borderLeftColor: getLevelColor(interaction.severity),
                  }}
                >
                  <h2 style={styles.severity}>
                    {interaction.severity} Interaction
                  </h2>
                  <h3>Drugs: {interaction.drugs.split('  ').join(' | ')}</h3>
                  <p style={styles.description}>{interaction.description}</p>
                </div>
              ))
            ) : (
              <p>No interactions available for this log.</p>
            )}
          </div>
        ) : logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log._id}
              style={logItemStyle}
              onClick={() => handleLogClick(log)}
            >
              <p style={logDateStyle}>
                <strong>Date:</strong>{' '}
                {new Date(log.createdAt).toLocaleString()}
              </p>
              <p style={logMedicationsStyle}>
                <strong>Medications:</strong> {log.drugs.join(', ')}
              </p>
            </div>
          ))
        ) : (
          <p style={noLogsStyle}>No logs available.</p>
        )
      ) : (
        <p style={noLogsStyle}>You have to login for logs to show.</p>
      )}
    </div>
  )
}

// Styles
const logsContainerStyle = {
  backgroundColor: '#222831',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#eeeeee',
  fontFamily: "'Poppins', sans-serif",
  padding: '20px',
}

const headingStyle = {
  fontSize: '1.8rem',
  marginBottom: '20px',
}

const logItemStyle = {
  backgroundColor: '#393e46',
  color: '#eeeeee',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '10px',
  width: '80%',
  maxWidth: '500px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
}

const logDateStyle = {
  marginBottom: '10px',
}

const logMedicationsStyle = {
  marginBottom: '0',
}

const noLogsStyle = {
  color: '#cccccc',
}

const clearButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#f44336',
  color: '#ffffff',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
}

export default Logs
