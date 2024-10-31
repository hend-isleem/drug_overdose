const express = require('express');
const authRoute = require('./auth/auth.route');
const contactRoute = require('./contacts/contacts.route');
const userRoute = require('./users/users.route');
const swaggerRoute = require('./swagger/swagger.route');

const routes = express.Router();

routes.use('/auth', authRoute);
routes.use('/contacts', contactRoute);
routes.use('/users', userRoute);
routes.use('/swagger', swaggerRoute);

module.exports = routes;
