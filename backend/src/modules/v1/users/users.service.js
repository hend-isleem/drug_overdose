const _ = require('lodash');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const ApiError = require('../../../utils/ApiError');
const dalService = require('../../dal/dal.service');
const errorCode = require('../../../codes/error.code');

const collectionName = 'users';

async function create(createDto) {
  if (!createDto.email) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.TAKEN_EMAIL);
  const document = await dalService.readOne(collectionName, { email: createDto.email }, {}, createDto.email);
  if (document) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.TAKEN_EMAIL);
  createDto.password = await bcrypt.hash(createDto.password, 10);
  return dalService.createOne(collectionName, createDto);
}

/**
 * Query documents
 * @param {object} queryDto - Query
 * @returns {Promise<{ pages: number, documents: [object] }>} Object of total number of pages and found documents
 */
async function query(queryDto) {
  const filters = _.omit(queryDto, ['search', 'sort', 'limit', 'page']);
  const options = _.pick(queryDto, ['sort', 'limit', 'page', 'skip']);
  if (queryDto.search) filters.name = { $regex: queryDto.search, $options: 'i' };
  if (queryDto.limit) options.skip = queryDto.limit * (queryDto.page - 1);
  if (queryDto.sort)
    options.sort = _.mapValues(
      _.keyBy(queryDto.sort.split(' '), (e) => (e[0] === '-' ? e.substring(1) : e)),
      (e) => (e[0] === '-' ? -1 : 1),
    );
  const result = await dalService.readMany(collectionName, filters, {
    ...options,
    projection: { password: 0 },
  });
  return result;
}

async function getById(id) {
  const document = await dalService.readOne(collectionName, { email: id }, {}, id);
  if (!document) throw new ApiError(httpStatus.NOT_FOUND, errorCode.UNREGISTERED_EMAIL);
  return document;
}

async function updateById(id, updateDto) {
  if (updateDto.email) {
    const document = await dalService.readOne(collectionName, { email: id }, {}, id);
    if (document) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.TAKEN_EMAIL);
    updateDto.verified = false;
  }
  if (updateDto.password) updateDto.password = await bcrypt.hash(updateDto.password, 10);
  const document = await dalService.updateOne(collectionName, { email: id }, { $set: updateDto }, { new: true }, id);
  if (!document) throw new ApiError(httpStatus.NOT_FOUND, errorCode.UNREGISTERED_EMAIL);
  return document;
}

async function deleteById(id) {
  const deleted = await dalService.deleteOne(collectionName, { email: id }, {}, id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, errorCode.UNREGISTERED_EMAIL);
  return deleted;
}

const userService = {
  create,
  query,
  getById,
  updateById,
  deleteById,
};

module.exports = userService;
