const regexConstant = require('../constants/regexes.constant')

const paginationProps = {
  limit: { type: 'integer', default: 10 },
  page: { type: 'integer', default: 1 }
}
const queryProps = {
  search: { type: 'string', transform: ['trim'] },
  sort: { type: 'string', transform: ['trim'], default: '-createdAt' },
  ...paginationProps
}
const query = {
  type: 'object',
  minProperties: 1,
  properties: queryProps,
  additionalProperties: false
}
const pagination = {
  type: 'object',
  minProperties: 1,
  properties: paginationProps,
  additionalProperties: false
}
const params = {
  type: 'object',
  minProperties: 1,
  properties: {
    id: { type: 'string', pattern: regexConstant.mongoObjectId.source }
  },
  allRequired: true,
  additionalProperties: false
}
const paramsString = {
  type: 'object',
  minProperties: 1,
  properties: {
    id: { type: 'string' }
  },
  allRequired: true,
  additionalProperties: false
}

const commonValidation = {
  paginationProps,
  queryProps,
  query,
  pagination,
  params,
  paramsString
}

module.exports = commonValidation
