const express = require('express')
const authController = require('./auth.controller')
const authValidation = require('./auth.validation')
const validate = require('../../../middlewares/validate.middleware')

const authRoute = express.Router()

authRoute.post('/register', validate(authValidation.register), authController.register)
authRoute.post('/login', validate(authValidation.login), authController.login)
authRoute.post('/admin-login', validate(authValidation.login), authController.adminLogin)
authRoute.post('/logout', validate(authValidation.logout), authController.logout)
authRoute.post('/refresh-tokens', validate(authValidation.logout), authController.refreshTokens)
authRoute.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword)
authRoute.post('/verify-code', validate(authValidation.verifyCode), authController.verifyCode)
authRoute.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword)
authRoute.post('/resend-confirmation-email', validate(authValidation.forgotPassword), authController.resendConfirmationEmail)
authRoute.post('/confirm-email', validate(authValidation.verifyCode), authController.confirmEmail)

module.exports = authRoute
