const tokenIndex = require('../modules/v1/auth/tokens/tokens.index');
const userIndex = require('../modules/v1/users/users.index');

const indexConstant = {
  tokens: tokenIndex,
  users: userIndex,
};

module.exports = indexConstant;
