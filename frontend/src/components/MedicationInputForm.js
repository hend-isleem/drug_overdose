import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingOverlay from './LoadingOverlay'

function MedicationInputForm() {
  const [drugList, setDrugList] = useState([])
  const [currentDrug, setCurrentDrug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem('user')
      if (user) {
        setAccessToken(JSON.parse(user).token)
        setIsLoggedIn(true)
      } else {
        navigate('/')
        setIsLoggedIn(false)
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
  const handleChange = (e) => {
    setCurrentDrug(e.target.value)
  }
  const handleAddDrug = () => {
    if (currentDrug) {
      setDrugList([...drugList, currentDrug])
      setCurrentDrug('')
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddDrug()
    }
  }
  const handleRemoveDrug = (index) => {
    setDrugList(drugList.filter((_, i) => i !== index))
  }
  const handleCheckInteractions = async () => {
    if (!isLoggedIn || drugList.length === 0) return
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(
        'v1/drugs/',
        { drugs: drugList },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      if (response.status === 200) {
        const { data } = response
        navigate('/interaction-results', {
          state: { interactions: data.interactions },
        })
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('user')
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'user',
            oldValue: null,
            newValue: null,
          })
        )
        alert('Session expired. Please log in again.')
        navigate('/login')
      }
      setError(err.response?.data?.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }
  const handleReset = () => {
    setDrugList([])
  }
  return (
    <div className="bg-gray-800 rounded-lg shadow-md text-gray-200 text-center w-144 p-10 mt-24 mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Drug-Drug Interactions Checker
      </h2>
      <p className="text-gray-400 mb-6">
        Check interactions with multiple drugs.
      </p>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Enter a drug name"
          value={currentDrug}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        />
        <button
          onClick={handleAddDrug}
          className="ml-2 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-400 transition"
        >
          Add
        </button>
      </div>
      {drugList.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Unsaved interactions list</h3>
          <ul className="list-none p-0">
            {drugList.map((drug, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b border-gray-600"
              >
                {drug}
                <button
                  onClick={() => handleRemoveDrug(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-400 transition"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <button
          onClick={handleCheckInteractions}
          disabled={drugList.length < 2}
          className={`px-4 py-2 rounded-md ${
            drugList.length < 2
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-400'
          } text-white transition`}
        >
          Check Interactions
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
        >
          Start Over
        </button>
      </div>
      {loading && <LoadingOverlay />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}

export default MedicationInputForm
