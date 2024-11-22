import React, { useEffect, useState } from 'react'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = JSON.parse(localStorage.getItem('user'))
      setIsLoggedIn(!!user)
      setUsername(user?.name || '')
    }
    checkLoginStatus()
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        checkLoginStatus()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'user',
        oldValue: JSON.stringify({ name: username }),
        newValue: null,
      })
    )
  }
  return (
    <header className="bg-gray-800 text-gray-200 p-5 flex justify-between items-center shadow-md font-poppins">
      <div className="flex items-center">
        <a href="/" className="text-xl md:text-2xl font-bold text-white">
          DDIs Checker
        </a>
      </div>
      <div className="flex gap-3 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-gray-200 text-sm md:text-base">
              Hello, {username}!
            </span>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-105 transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : null}
      </div>
    </header>
  )
}

export default Header
