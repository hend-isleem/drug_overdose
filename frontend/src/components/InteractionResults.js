import React from 'react'
import { useLocation } from 'react-router-dom'

import InteractionClassification from './InteractionClassification'

function InteractionReport() {
  const location = useLocation()
  const interactions = location.state?.interactions || []
  const getLevelColor = (level) => {
    switch (level) {
      case 'Major':
        return 'border-red-500' // Red
      case 'Moderate':
        return 'border-orange-400' // Orange
      case 'Minor':
        return 'border-green-500' // Green
      default:
        return 'border-gray-400' // Grey
    }
  }
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Drug-Drug Interactions Report
      </h1>
      {interactions.length === 0 ? (
        <p className="text-white text-center">
          No known interactions for the selected medications. Always consult
          with a healthcare provider for more details.
        </p>
      ) : (
        interactions.map((interaction, index) => (
          <div
            key={index}
            className={`bg-white p-4 mb-4 rounded-lg shadow-md border-l-4 ${getLevelColor(
              interaction.severity
            )}`}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {interaction.severity} Interaction
            </h2>
            <h3 className="text-gray-700">
              Drugs: {interaction.drugs.split('  ').join(' | ')}
            </h3>
            <p className="text-gray-600 mt-2">{interaction.description}</p>
          </div>
        ))
      )}
      <InteractionClassification />
    </div>
  )
}

export default InteractionReport
