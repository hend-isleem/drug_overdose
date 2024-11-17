const passport = require('passport')

const authIf = () => async (req, res, next) =>
  new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) reject()
      if (user) req.user = user
      resolve()
    })(req, res, next)
  })
    .then(() => next())
    .catch((err) => next(err))

module.exports = authIf
