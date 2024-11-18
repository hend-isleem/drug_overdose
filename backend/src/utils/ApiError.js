class ApiError extends Error {
  constructor(statusCode, message, data = {}, isOperational = true, stack = '') {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.data = data
    if (stack) this.stack = stack
    else Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApiError
