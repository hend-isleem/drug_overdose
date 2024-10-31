const Ajv = require('ajv');
// const localize = require('ajv-i18n');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const ajv = new Ajv({ allErrors: true, removeAdditional: true, useDefaults: 'empty', coerceTypes: 'array' });
require('ajv-formats')(ajv);
require('ajv-keywords')(ajv);
require('ajv-errors')(ajv);

const isValid = (schema, body) => {
  const validation = ajv.compile(schema);
  const valid = validation(body);
  if (!valid) {
    // localize.ar(validation.errors);
    throw new ApiError(httpStatus.BAD_REQUEST, ajv.errorsText(validation.errors, { separator: '\n' }));
  }
};

const validate = (schema) => (req, res, next) => {
  if (req.params.userEmail === 'null' || req.params.userEmail === 'undefined') req.params.userEmail = null;
  if (req.params && schema.params) isValid(schema.params, req.params);
  if (req.query && schema.query) isValid(schema.query, req.query);
  if (req.body && schema.body) isValid(schema.body, req.body);
  return next();
};

module.exports = validate;
