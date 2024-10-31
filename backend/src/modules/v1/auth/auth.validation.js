const login = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      email: { type: 'string', format: 'email', transform: ['trim', 'toLowerCase'] },
      password: { type: 'string' },
    },
    allRequired: true,
    additionalProperties: false,
  },
};

const logout = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      token: { type: 'string' },
    },
    allRequired: true,
    additionalProperties: false,
  },
};

const authValidation = {
  login,
  logout,
};

module.exports = authValidation;
