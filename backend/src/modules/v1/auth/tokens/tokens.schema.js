const roleConstant = require('../../../../constants/roles.constant');
const tokenConstant = require('./tokens.constant');

const tokenSchema = {
  token: { type: 'string', transform: ['trim'] },
  email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] },
  expiresAt: { type: ['string', 'null'], format: 'date-time' },
  type: { type: 'string', enum: [tokenConstant.REFRESH, tokenConstant.RESET_PASSWORD] },
  role: { type: 'string', enum: Object.values(roleConstant) },
  createdAt: { type: ['string', 'null'], format: 'date-time' },
};

module.exports = tokenSchema;
