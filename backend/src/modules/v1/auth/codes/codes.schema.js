const codeSchema = {
  code: { type: 'string', transform: ['trim'] },
  email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] },
  expiresAt: { type: ['string', 'null'], format: 'date-time' },
  createdAt: { type: ['string', 'null'], format: 'date-time' }
}

module.exports = codeSchema
