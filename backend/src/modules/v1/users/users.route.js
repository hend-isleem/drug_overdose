const express = require('express')
const auth = require('../../../middlewares/auth.middleware')
const validate = require('../../../middlewares/validate.middleware')
const userValidation = require('./users.validation')
const userController = require('./users.controller')
const roleConstant = require('../../../constants/roles.constant')

const userRoute = express.Router()

userRoute
  .route('/')
  .post(auth(roleConstant.ADMIN), validate(userValidation.create), userController.create)
  .get(auth(...Object.values(roleConstant)), validate(userValidation.get), userController.query)

userRoute
  .route('/:userEmail')
  .get(auth(...Object.values(roleConstant)), validate(userValidation.remove), userController.get)
  .patch(auth(...Object.values(roleConstant)), validate(userValidation.update), userController.update)
  .delete(auth(...Object.values(roleConstant)), validate(userValidation.remove), userController.remove)
  .put(auth(...Object.values(roleConstant)), validate(userValidation.resetPassword), userController.resetPassword)

module.exports = userRoute
