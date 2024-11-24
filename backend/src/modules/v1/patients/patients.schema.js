const patientSchema = {
  name: { type: 'string', transform: ['trim'] },
  drugs: { type: 'array', items: { type: 'string', transform: ['trim'] }, required: true },
  interactions: {
    type: 'object',
    properties: {
      interactionSeverity: { type: 'string', enum: ['None', 'Low', 'Moderate', 'High', 'Severe'] },
      summary: { type: 'string' },
      recommendations: { type: 'string' },
      alternativeMedications: { type: 'string' }
    }
  },
  createdAt: { type: ['string', 'null'], format: 'date-time' }
}

module.exports = patientSchema
