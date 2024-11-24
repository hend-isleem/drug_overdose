const express = require('express')
const authRoute = require('./auth/auth.route')
const drugRoute = require('./drugs/drugs.route')
const patientRoute = require('./patients/patients.route')
const userRoute = require('./users/users.route')

const routes = express.Router()

routes.use('/auth', authRoute)
routes.use('/drugs', drugRoute)
routes.use('/patients', patientRoute)
routes.use('/users', userRoute)

module.exports = routes
