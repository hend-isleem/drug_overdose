import React from 'react'

function LoadingOverlay() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin" />
      <p className="text-white mt-4">Loading...</p>
    </div>
  )
}

export default LoadingOverlay
