const contactSchema = {
  name: { type: 'string', transform: ['trim'] },
  phoneNumber: { type: 'string', transform: ['trim'] },
  contactEmail: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] },
  subject: { type: 'string', transform: ['trim'] },
  message: { type: 'string', transform: ['trim'] },
  contacted: { type: 'boolean' },
  createdAt: { type: ['string', 'null'], format: 'date-time' },
};

module.exports = contactSchema;
