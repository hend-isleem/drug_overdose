import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setShowSuccessPopup(false)
    try {
      const response = await axios.post('v1/auth/login', {
        email,
        password,
      })
      if (response.data.tokens && response.data.tokens.access.token) {
        const { access } = response.data.tokens
        const user = {
          email,
          token: access.token,
          name: response.data.user?.name || 'User',
        }
        localStorage.setItem('user', JSON.stringify(user))
        setShowSuccessPopup(true)
        setTimeout(() => {
          setShowSuccessPopup(false)
          navigate('/medication-input')
        }, 2000)
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem('user')
      if (user) navigate('/medication-input')
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
  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg text-gray-200 flex flex-col items-center w-144 p-10 mt-28">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <form onSubmit={handleLogin} className="w-full flex flex-col px-10">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-cyan-500 text-white rounded-md hover:bg-gray-600 transition duration-300 my-2"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {showSuccessPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl text-blue-500">✅</div>
              <p className="text-green-600 mt-4 text-lg">Login Successful!</p>
            </div>
          </div>
        )}
        <p className="text-center mt-6">
          New user?{' '}
          <button
            className="text-cyan-500 hover:underline"
            onClick={() => navigate('/register')}
          >
            Please register!
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
