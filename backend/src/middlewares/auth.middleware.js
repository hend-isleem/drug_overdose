const httpStatus = require('http-status');
const passport = require('passport');
const errorCode = require('../codes/error.code');
const ApiError = require('../utils/ApiError');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) return reject(new ApiError(httpStatus.UNAUTHORIZED, errorCode.UNAUTHORIZED));
  req.user = user;
  if (requiredRights.length) {
    const hasRequiredRights = requiredRights.includes(user.role);
    if (!hasRequiredRights) return reject(new ApiError(httpStatus.FORBIDDEN, errorCode.FORBIDDEN));
  }
  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) =>
    new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));

module.exports = auth;
