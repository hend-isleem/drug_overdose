const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const catchAsync = require('../../../utils/catchAsync')
const ApiError = require('../../../utils/ApiError')
const userService = require('./users.service')
const roles = require('../../../constants/roles.constant')
const errorCode = require('../../../codes/error.code')

const create = catchAsync(async (req, res) => {
  await userService.create({ ...req.body, verified: true })
  res.status(httpStatus.NO_CONTENT).send()
})

const query = catchAsync(async (req, res) => {
  const result = await userService.query(_.pickBy(req.query))
  res.send(result)
})

const get = catchAsync(async (req, res) => {
  let { userEmail } = req.params
  if (req.user.role !== roles.ADMIN || !userEmail) userEmail = req.user.email
  const user = await userService.getById(userEmail)
  res.send(_.omit(user, ['password']))
})

const update = catchAsync(async (req, res) => {
  let { userEmail } = req.params
  if (req.user.role !== roles.ADMIN || !userEmail) userEmail = req.user.email
  const user = await userService.updateById(userEmail, req.body)
  res.send(user.email)
})

const remove = catchAsync(async (req, res) => {
  let { userEmail } = req.params
  if (req.user.role !== roles.ADMIN || !userEmail) userEmail = req.user.email
  await userService.deleteById(userEmail)
  res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req, res) => {
  let { userEmail } = req.params
  if (req.user.role !== roles.ADMIN || !userEmail) userEmail = req.user.email
  const user = await userService.getById(userEmail)
  if (!(await bcrypt.compare(req.body.currentPassword, user.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, errorCode.INCORRECT_PASSWORD)
  await userService.updateById(userEmail, { password: req.body.newPassword })
  res.status(httpStatus.NO_CONTENT).send()
})

const userController = {
  create,
  query,
  get,
  update,
  remove,
  resetPassword
}

module.exports = userController
