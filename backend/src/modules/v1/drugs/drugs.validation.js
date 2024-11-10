const validationUtil = require('../../../utils/validation.util');
const commonValidation = require('../../../validations/common.validation');
const schema = require('./drugs.schema');

const { schema: drugSchema, required } = validationUtil.getSchemaAndRequiredArray(schema);

const body = {
  type: 'object',
  minProperties: 1,
  properties: drugSchema,
  additionalProperties: false,
};

const create = {
  body: {
    ...body,
    required,
  },
};

const get = {
  query: {
    type: 'object',
    minProperties: 1,
    properties: {
      ...commonValidation.queryProps,
    },
    additionalProperties: false,
  },
};

const update = {
  params: commonValidation.params,
  body,
};

const remove = {
  params: commonValidation.params,
};

const drugValidation = {
  create,
  get,
  update,
  remove,
};

module.exports = drugValidation;
