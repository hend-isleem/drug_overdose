const express = require('express')
const auth = require('../../../middlewares/auth.middleware')
const validate = require('../../../middlewares/validate.middleware')
const patientValidation = require('./patients.validation')
const patientController = require('./patients.controller')
const roleConstant = require('../../../constants/roles.constant')

const patientRoute = express.Router()

patientRoute
  .route('/')
  .post(auth(roleConstant.USER), validate(patientValidation.create), patientController.create)
  .get(auth(roleConstant.USER), validate(patientValidation.get), patientController.query)

patientRoute
  .route('/:id')
  .get(auth(roleConstant.USER), validate(patientValidation.remove), patientController.get)
  .patch(auth(roleConstant.ADMIN), validate(patientValidation.update), patientController.update)
  .delete(auth(roleConstant.ADMIN), validate(patientValidation.remove), patientController.remove)

module.exports = patientRoute
