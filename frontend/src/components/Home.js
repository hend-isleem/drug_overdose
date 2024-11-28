import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
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
    <div className="bg-gray-900 flex justify-center items-center font-poppins">
      <div className="text-center text-gray-200 bg-gray-800 rounded-lg shadow-lg w-144 p-10 mt-28">
        <h1 className="text-2xl font-bold mb-8">
          Welcome to the Drug-Drug interactions checker
        </h1>
        <p className="text-gray-400 mb-8">
          Easily check for potential interactions between your medications.
        </p>
        <h2 className="text-lg mb-8">
          Please log in to access the DDIs Checker
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-cyan-500 text-white text-lg font-bold rounded-md shadow-md hover:bg-gray-600 hover:scale-105 transition-all duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-cyan-500 text-white text-lg font-bold rounded-md shadow-md hover:bg-gray-600 hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
