const codeSchema = require('../modules/v1/auth/codes/codes.schema')
const drugSchema = require('../modules/v1/drugs/drugs.schema')
const tokenSchema = require('../modules/v1/auth/tokens/tokens.schema')
const patientSchema = require('../modules/v1/patients/patients.schema')
const userSchema = require('../modules/v1/users/users.schema')

const collectionConstant = {
  codes: codeSchema,
  drugs: drugSchema,
  tokens: tokenSchema,
  patients: patientSchema,
  users: userSchema
}

module.exports = collectionConstant
