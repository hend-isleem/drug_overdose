const validationUtil = require('../../../utils/validation.util')
const commonValidation = require('../../../validations/common.validation')
const schema = require('./patients.schema')

const { schema: patientSchema, required } = validationUtil.getSchemaAndRequiredArray(schema)

const body = {
  type: 'object',
  minProperties: 1,
  properties: patientSchema,
  additionalProperties: false
}

const create = {
  body: {
    ...body,
    required
  }
}

const get = {
  query: {
    type: 'object',
    minProperties: 1,
    properties: {
      ...commonValidation.queryProps
    },
    additionalProperties: false
  }
}

const update = {
  params: commonValidation.params,
  body
}

const remove = {
  params: commonValidation.params
}

const patientValidation = {
  create,
  get,
  update,
  remove
}

module.exports = patientValidation
