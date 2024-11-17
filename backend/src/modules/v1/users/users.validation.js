const regexConstant = require('../../../constants/regexes.constant');
const roleConstant = require('../../../constants/roles.constant');
const validationUtil = require('../../../utils/validation.util');
const commonValidation = require('../../../validations/common.validation');
const schema = require('./users.schema');

const { schema: userSchema, required } = validationUtil.getSchemaAndRequiredArray(schema);

const params = {
  type: 'object',
  minProperties: 1,
  properties: {
    userEmail: { type: ['string', 'null'], format: 'email', transform: ['trim', 'toLowerCase'] },
  },
  required: ['userEmail'],
  additionalProperties: false,
};

const create = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: userSchema,
    additionalProperties: false,
    required,
  },
};

const get = {
  query: {
    type: 'object',
    minProperties: 1,
    properties: {
      ...commonValidation.queryProps,
      role: { type: 'string', enum: Object.values(roleConstant) },
    },
    additionalProperties: false,
  },
};

const update = {
  params,
  body: {
    type: 'object',
    minProperties: 1,
    properties: userSchema,
    additionalProperties: false,
  },
};

const remove = {
  params,
};

const resetPassword = {
  params,
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      currentPassword: { type: 'string' },
      newPassword: { type: 'string', pattern: regexConstant.password.source },
    },
    allRequired: true,
    additionalProperties: false,
    errorMessage: {
      properties: {
        newPassword:
          'must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
      },
    },
  },
};

const userValidation = {
  create,
  get,
  update,
  remove,
  resetPassword,
};

module.exports = userValidation;
