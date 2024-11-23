import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
      if (user) {
        setAccessToken(JSON.parse(user).token)
      } else {
        navigate('/')
        setLoading(false)
      }
    }
    checkUserStatus()
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        checkUserStatus()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [navigate])
  useEffect(() => {
    const handleGetLogs = async () => {
      if (!isLoggedIn || !accessToken) return
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('v1/drugs/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (response.status === 200) {
          setLogs(response.data.documents || [])
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('user')
          alert('Session expired. Please log in again.')
          navigate('/login')
        }
        setError(err.response?.data?.message || 'An error occurred.')
      } finally {
        setLoading(false)
      }
    }
    handleGetLogs()
  }, [isLoggedIn, accessToken, navigate])
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-gray-200 p-6 font-poppins">
      <h2 className="text-2xl font-bold mb-6">Latest Checks</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-gray-400">{error}</p>
      ) : logs.length > 0 ? (
        logs.map((log) => (
          <div
            key={log._id}
            className="bg-gray-800 text-gray-200 rounded-md p-6 mb-4 shadow-md cursor-pointer transition-transform hover:scale-105 w-128"
            onClick={() =>
              navigate('/interaction-results', {
                state: { interactions: log.interactions },
              })
            }
          >
            <p className="mb-2">
              <strong>Date:</strong> {new Date(log.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Medications:</strong> {log.drugs.join(', ')}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No logs available.</p>
      )}
    </div>
  )
}

export default Logs
