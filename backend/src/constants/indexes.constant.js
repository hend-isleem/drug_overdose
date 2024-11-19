const codeIndex = require('../modules/v1/auth/codes/codes.index')
const tokenIndex = require('../modules/v1/auth/tokens/tokens.index')
const userIndex = require('../modules/v1/users/users.index')
const drugIndex = require('../modules/v1/drugs/drugs.index')

const indexConstant = {
  codes: codeIndex,
  tokens: tokenIndex,
  users: userIndex,
  drugs: drugIndex
}

module.exports = indexConstant
