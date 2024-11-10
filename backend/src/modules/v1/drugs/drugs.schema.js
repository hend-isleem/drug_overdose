const drugSchema = {
  name: { type: 'string', transform: ['trim'] },
  drugs: { type: 'array', items: { type: 'string', transform: ['trim'] } },
  interactions: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        severity: { type: 'string', transform: ['trim'] },
        drugs: { type: 'string', transform: ['trim'] },
        description: { type: 'string', transform: ['trim'] },
      },
    },
  },
  createdAt: { type: ['string', 'null'], format: 'date-time' },
};

module.exports = drugSchema;
