import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setShowSuccessPopup(false)
    if (!username || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    try {
      setLoading(true)
      setError(null)
      setShowSuccessPopup(null)
      const response = await axios.post(
        'http://localhost:3001/v1/auth/register',
        {
          name: username,
          email,
          password,
        }
      )
      if (response.status === 201) {
        setShowSuccessPopup('User registered successfully!')
        setTimeout(() => {
          setShowSuccessPopup(false)
          navigate('/login')
        }, 2000)
      } else {
        setError(response.message || 'An error occurred. Please try again.')
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Network error. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg text-gray-200 w-144 p-10 mt-24">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col w-full px-10">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm mb-1">
              name:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-cyan-500 text-white rounded-md hover:bg-gray-600 transition my-2"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {showSuccessPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl text-blue-500">✅</div>
              <p className="text-green-600 mt-4 text-lg">
                Registration Successful!
              </p>
            </div>
          </div>
        )}
        <p className="text-center mt-6">
          Already registered?{' '}
          <button
            className="text-cyan-500 hover:underline"
            onClick={() => navigate('/login')}
          >
            Please log in!
          </button>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
