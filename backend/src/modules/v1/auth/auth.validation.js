const regexConstant = require('../../../constants/regexes.constant')

const register = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] },
      password: { type: 'string', minLength: 8, maxLength: 24 },
      name: { type: 'string' }
    },
    allRequired: true,
    additionalProperties: false,
    errorMessage: {
      properties: {
        password:
          'must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
      }
    }
  }
}

const login = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] },
      password: { type: 'string' }
    },
    allRequired: true,
    additionalProperties: false
  }
}

const logout = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      token: { type: 'string' }
    },
    allRequired: true,
    additionalProperties: false
  }
}

const forgotPassword = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] }
    },
    allRequired: true,
    additionalProperties: false
  }
}

const verifyCode = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      code: { type: 'string' }
    },
    allRequired: true,
    additionalProperties: false
  }
}

const resetPassword = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] },
      password: { type: 'string', pattern: regexConstant.password.source },
      code: { type: 'string' }
    },
    allRequired: true,
    additionalProperties: false,
    errorMessage: {
      properties: {
        password:
          'must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
      }
    }
  }
}

const authValidation = {
  register,
  login,
  logout,
  forgotPassword,
  verifyCode,
  resetPassword
}

module.exports = authValidation
