const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config.config');
const logger = require('../modules/winston/winston.logger');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, {}, false, err.stack);
  }
  next(error);
};
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode];
  }
  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message: req.i18n.exists(message) ? req.t(message) : message,
    ...(Object.keys(err.data).length && { data: err.data }),
    ...(config.env === 'development' && { stack: err.stack }),
  };
  if (config.env === 'development') logger.error(err);
  res.status(statusCode).send(response);
};

const errorMiddlewares = {
  errorConverter,
  errorHandler,
};

module.exports = errorMiddlewares;
