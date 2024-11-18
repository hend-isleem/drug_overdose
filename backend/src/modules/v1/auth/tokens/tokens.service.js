const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const errorCode = require('../../../../codes/error.code')
const tokenConstant = require('./tokens.constant')
const ApiError = require('../../../../utils/ApiError')
const config = require('../../../../config/config.config')
const dalService = require('../../../dal/dal.service')

const collectionName = 'tokens'

function sign(jwtPayloadDto, expiresIn) {
  return jwt.sign(jwtPayloadDto, config.jwt.secret, { expiresIn })
}

async function createRefreshToken(createDto) {
  const now = new Date()
  const expiresAt = new Date(now)
  expiresAt.setMonth(now.getMonth() + +(config.jwt.refresh_expiration_months || 1))
  const token = sign({ sub: createDto.email, role: createDto.role, type: tokenConstant.REFRESH }, `${+expiresAt - +now}`)
  await dalService.createOne(collectionName, { ...createDto, token, expiresAt, type: tokenConstant.REFRESH })
  return { token, expiresAt }
}

function createAuthToken(createDto) {
  const now = new Date()
  const expiresAt = new Date(now)
  expiresAt.setHours(now.getHours() + +(config.jwt.access_expiration_hours || 1))
  const token = sign({ sub: createDto.email, role: createDto.role, type: tokenConstant.ACCESS }, `${+expiresAt - +now}`)
  return { token, expiresAt }
}

async function createBothTokens(createDto) {
  const access = createAuthToken(createDto)
  const refresh = await createRefreshToken(createDto)
  return { access, refresh }
}

async function getById(id) {
  const document = await dalService.readOne(collectionName, { token: id }, {}, id)
  if (!document) throw new ApiError(httpStatus.NOT_FOUND, errorCode.INVALID_TOKEN)
  return document
}

async function deleteById(id) {
  const deleted = await dalService.deleteOne(collectionName, { token: id }, {}, id)
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, errorCode.NOT_FOUND)
  return deleted
}

async function refreshTokens(token) {
  const tokenDoc = await getById(token)
  const generateTokenDto = { email: tokenDoc.email, role: tokenDoc.role }
  const access = createAuthToken(generateTokenDto)
  const tokens = { access, refresh: { token: '', expiresAt: new Date() } }
  const sevenDaysLater = new Date()
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 7)
  if (tokenDoc.expiresAt <= sevenDaysLater) tokens.refresh = await createRefreshToken(generateTokenDto)
  else tokens.refresh = { token: tokenDoc.token, expiresAt: tokenDoc.expiresAt }
  return tokens
}

const tokenService = {
  createBothTokens,
  getById,
  deleteById,
  refreshTokens
}

module.exports = tokenService
