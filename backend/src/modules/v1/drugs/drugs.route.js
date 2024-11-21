const express = require('express')
const auth = require('../../../middlewares/auth.middleware')
const validate = require('../../../middlewares/validate.middleware')
const drugValidation = require('./drugs.validation')
const drugController = require('./drugs.controller')
const roleConstant = require('../../../constants/roles.constant')

const drugRoute = express.Router()

drugRoute
  .route('/')
  .post(auth(roleConstant.USER), validate(drugValidation.create), drugController.create)
  .get(auth(roleConstant.USER), validate(drugValidation.get), drugController.query)

drugRoute
  .route('/:id')
  .get(auth(roleConstant.USER), validate(drugValidation.remove), drugController.get)
  .patch(auth(roleConstant.ADMIN), validate(drugValidation.update), drugController.update)
  .delete(auth(roleConstant.ADMIN), validate(drugValidation.remove), drugController.remove)

module.exports = drugRoute
