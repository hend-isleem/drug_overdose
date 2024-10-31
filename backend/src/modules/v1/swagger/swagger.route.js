const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.config');

const route = express.Router();

route.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = route;
