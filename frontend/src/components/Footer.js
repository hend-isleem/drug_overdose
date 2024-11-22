import React, { useEffect, useState } from 'react'

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
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
  return (
    <footer className="bg-gray-800 text-gray-200 p-5 text-center border-t border-gray-700 mt-auto font-poppins">
      <p>&copy; 2024 Drug-Drug Interactions Checker. All rights reserved.</p>
      {isLoggedIn ? (
        <div className="mt-3">
          <a
            href="/logs"
            className="text-cyan-500 hover:text-cyan-400 mx-2 transition-colors duration-300"
          >
            Latest Checks
          </a>
        </div>
      ) : null}
      <p className="text-sm mt-3 text-gray-400">
        Disclaimer: This tool is for informational purposes only. Always consult
        a healthcare professional for medical advice.
      </p>
    </footer>
  )
}

export default Footer
