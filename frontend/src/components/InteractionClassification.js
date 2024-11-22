import React from 'react'

function InteractionClassification() {
  const classifications = [
    {
      level: 'Major',
      description:
        'Highly clinically significant. Avoid combinations; the risk of the interaction outweighs the benefit.',
    },
    {
      level: 'Moderate',
      description:
        'Moderately clinically significant. Usually avoid combinations; use it only under special circumstances.',
    },
    {
      level: 'Minor',
      description:
        'Minimally clinically significant. Minimize risk; assess risk and consider an alternative drug, take steps to circumvent the interaction risk and/or institute a monitoring plan.',
    },
    {
      level: 'Unknown',
      description: 'No interaction information available.',
    },
  ]
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
    <div className="mt-12">
      <h2 className="text-xl font-bold text-white mb-4">
        Severity Levels Reference
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classifications.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${getLevelColor(
              item.level
            )}`}
          >
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              {item.level}
            </h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InteractionClassification
