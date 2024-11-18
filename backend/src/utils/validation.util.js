const _ = require('lodash')

const getSchemaAndRequiredArray = (schema) => {
  const required = []
  const cleanedSchema = Object.keys(schema).reduce((newSchema, key) => {
    if (schema[key].required) required.push(key)
    newSchema[key] = _.omit(schema[key], ['required'])
    return newSchema
  }, {})
  return { schema: cleanedSchema, required }
}

const validationUtil = {
  getSchemaAndRequiredArray
}

module.exports = validationUtil
