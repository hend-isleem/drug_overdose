const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')
const httpStatus = require('http-status')
const config = require('../../../config/config.config')
const tokenConstant = require('./tokens/tokens.constant')
const userService = require('../users/users.service')
const ApiError = require('../../../utils/ApiError')
const errorCode = require('../../../codes/error.code')

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenConstant.ACCESS) throw new ApiError(httpStatus.FORBIDDEN, errorCode.INVALID_TOKEN)
    const user = await userService.getById(payload.sub)
    if (!user) return done(null, false)
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const authStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = authStrategy
