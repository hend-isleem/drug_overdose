const regexConstant = require('../../../constants/regexes.constant');
const roleConstant = require('../../../constants/roles.constant');

const userSchema = {
  email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'], required: true },
  password: { type: 'string', pattern: regexConstant.password.source, required: true },
  role: { type: 'string', enum: Object.values(roleConstant), required: true },
  verified: { type: 'boolean' },
  name: { type: 'string', transform: ['trim'], required: true },
  createdAt: { type: ['string', 'null'], format: 'date-time' },
};

module.exports = userSchema;
