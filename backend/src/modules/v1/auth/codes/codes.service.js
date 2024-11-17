const httpStatus = require('http-status');
const { getDigitalCode } = require('node-verification-code');
const ApiError = require('../../../../utils/ApiError');
const dalService = require('../../../dal/dal.service');
const errorCode = require('../../../../codes/error.code');
const config = require('../../../../config/config.config');

const collectionName = 'codes';

async function create(createDto) {
  const code = getDigitalCode(6).toString();
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setHours(now.getHours() + +(config.jwt.verification_code_expiration_hours || 1));
  return dalService.createOne(collectionName, { ...createDto, code, expiresAt });
}

async function getById(id) {
  const document = await dalService.readOne(collectionName, { code: id }, {}, id);
  if (!document) throw new ApiError(httpStatus.NOT_FOUND, errorCode.NOT_FOUND);
  return document;
}

async function verifyCode(code) {
  const document = await getById(code);
  await dalService.deleteMany(collectionName, { email: document.email }, {});
  return document;
}

const codeService = {
  create,
  getById,
  verifyCode,
};

module.exports = codeService;
