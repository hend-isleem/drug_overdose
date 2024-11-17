const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: 'Too many requests created from this IP, please try again after 10 minutes',
});

module.exports = limiter;
