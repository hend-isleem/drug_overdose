const httpStatus = require('http-status');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const ApiError = require('../../../utils/ApiError');
const catchAsync = require('../../../utils/catchAsync');
const userService = require('../users/users.service');
const tokenService = require('./tokens/tokens.service');
const roleConstant = require('../../../constants/roles.constant');
const errorCode = require('../../../codes/error.code');

const adminLogin = catchAsync(async (req, res) => {
  const user = await userService.getById(req.body.email);
  if (user.role === roleConstant.USER) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.ADMIN_ROLE_LOGIN);
  const correctPassword = await bcrypt.compare(req.body.password, user.password);
  if (!correctPassword) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.INCORRECT_PASSWORD);
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role });
  res.send({ user: _.omit(user, ['password']), tokens });
});

const logout = catchAsync(async (req, res) => {
  await tokenService.deleteById(req.body.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await tokenService.refreshTokens(req.body.token);
  res.send(tokens);
});

const authController = {
  adminLogin,
  logout,
  refreshTokens,
};

module.exports = authController;
