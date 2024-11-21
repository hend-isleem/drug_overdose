const httpStatus = require('http-status')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const ApiError = require('../../../utils/ApiError')
const catchAsync = require('../../../utils/catchAsync')
const userService = require('../users/users.service')
const codeService = require('./codes/codes.service')
// const nodemailerService = require('../../nodemailer/nodemailer.service')
const tokenService = require('./tokens/tokens.service')
const roleConstant = require('../../../constants/roles.constant')
const errorCode = require('../../../codes/error.code')
const config = require('../../../config/config.config')

const register = catchAsync(async (req, res) => {
  const user = await userService.create({ ...req.body, role: roleConstant.USER, verified: true })
  const codeDoc = await codeService.create({ email: user.email })
  if (config.env === 'test') {
    res.status(httpStatus.CREATED).send({ code: codeDoc.code })
  } else {
    // await nodemailerService.sendConfirmationEmail(user.email, user.name, codeDoc.code, req.t)
    res.status(httpStatus.CREATED).send()
  }
})

const login = catchAsync(async (req, res) => {
  const user = await userService.getById(req.body.email)
  if (user.role !== roleConstant.USER) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.USER_ROLE_LOGIN)
  const correctPassword = await bcrypt.compare(req.body.password, user.password)
  if (!correctPassword) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.INCORRECT_PASSWORD)
  // if (!user.verified) {
  //   const codeDoc = await codeService.create({ email: user.email })
    // if (config.env !== 'test') await nodemailerService.sendConfirmationEmail(user.email, user.name, codeDoc.code, req.t)
    // throw new ApiError(httpStatus.PRECONDITION_REQUIRED, errorCode.UNVERIFIED_EMAIL)
  // }
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role })
  res.send({ user: _.omit(user, ['password']), tokens })
})

const adminLogin = catchAsync(async (req, res) => {
  const user = await userService.getById(req.body.email)
  if (user.role === roleConstant.USER) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.ADMIN_ROLE_LOGIN)
  const correctPassword = await bcrypt.compare(req.body.password, user.password)
  if (!correctPassword) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.INCORRECT_PASSWORD)
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role })
  res.send({ user: _.omit(user, ['password']), tokens })
})

const logout = catchAsync(async (req, res) => {
  await tokenService.deleteById(req.body.token)
  res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await tokenService.refreshTokens(req.body.token)
  res.send(tokens)
})

const forgotPassword = catchAsync(async (req, res) => {
  const user = await userService.getById(req.body.email)
  const codeDoc = await codeService.create({ email: user.email })
  if (config.env === 'test') {
    res.send({ code: codeDoc.code })
  } else {
    // await nodemailerService.sendResetPasswordEmail(user.email, codeDoc.code, req.t)
    res.status(httpStatus.NO_CONTENT).send()
  }
})

const resetPassword = catchAsync(async (req, res) => {
  const codeDoc = await codeService.verifyCode(req.body.code)
  const user = await userService.getById(codeDoc.email)
  const newUser = await userService.updateById(codeDoc.email, { password: req.body.password, verified: true })
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role })
  res.send({ user: _.omit(newUser, ['password']), tokens })
})

const verifyCode = catchAsync(async (req, res) => {
  await codeService.getById(req.body.code)
  res.status(httpStatus.NO_CONTENT).send()
})

const confirmEmail = catchAsync(async (req, res) => {
  const codeDoc = await codeService.verifyCode(req.body.code)
  const user = await userService.getById(codeDoc.email)
  const newUser = await userService.updateById(codeDoc.email, { verified: true })
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role })
  res.send({ user: _.omit(newUser, ['password']), tokens })
})

const resendConfirmationEmail = catchAsync(async (req, res) => {
  const user = await userService.getById(req.body.email)
  if (user.verified) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.VERIFIED_EMAIL)
  const codeDoc = await codeService.create({ email: req.body.email })
  if (config.env === 'test') {
    res.send({ code: codeDoc.code })
  } else {
    // await nodemailerService.sendConfirmationEmail(user.email, user.name, codeDoc.code, req.t)
    res.status(httpStatus.NO_CONTENT).send()
  }
})

const authController = {
  register,
  login,
  adminLogin,
  logout,
  refreshTokens,
  forgotPassword,
  verifyCode,
  resetPassword,
  confirmEmail,
  resendConfirmationEmail
}

module.exports = authController
