const Backend = require('i18next-fs-backend');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const xss = require('xss-clean');
const errorMiddlewares = require('../../middlewares/error.middleware');
const ApiError = require('../../utils/ApiError');
const errorCode = require('../../codes/error.code');
const config = require('../../config/config.config');
const authStrategy = require('../v1/auth/auth.strategy');
const limiter = require('../../middlewares/rateLimiter.middleware');
const morganService = require('../morgan/morgan.service');
const routes = require('../v1/routes');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',
    },
  });

const app = express();
app.set('trust proxy', true);

if (config.env !== 'test') {
  app.use(morganService.successHandler);
  app.use(morganService.errorHandler);
}

// internationalization
app.use(middleware.handle(i18next));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', authStrategy);

// limit repeated failed requests to endpoints
if (config.env === 'production') {
  app.use('/v1/auth', limiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => next(new ApiError(httpStatus.NOT_FOUND, errorCode.INVALID_ENDPOINT)));

// convert error to ApiError, if needed
app.use(errorMiddlewares.errorConverter);

// handle error
app.use(errorMiddlewares.errorHandler);

module.exports = app;
