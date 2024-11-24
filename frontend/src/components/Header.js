import React from 'react'

function Header() {
  return (
    <header className="bg-gray-800 text-gray-200 p-5 flex justify-center items-center shadow-md font-poppins">
      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold text-white">
          DDIs Checker
        </a>
      </div>
    </header>
  )
}

export default Header
