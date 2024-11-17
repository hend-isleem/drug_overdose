const chai = require('chai')
const chaiHttp = require('chai-http')
const supertest = require('supertest')
const httpStatus = require('http-status')
const app = require('../../app/app.module')

app.set('trust proxy', false)
const { expect } = chai
chai.use(chaiHttp)
const request = supertest(app)

describe('Auth Routes', async function () {
  this.timeout(20000)

  const userData = {
    email: 'testuser@example.com',
    password: 'StrongP@ssw0rd',
    name: 'Test User'
  }

  const adminData = {
    email: 'admin@sesa1.com',
    password: 'password1'
  }

  let userToken
  let resetCode

  // Test Registration
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request.post('/v1/auth/register').send(userData)
      const res2 = await request.post('/v1/auth/confirm-email').send({ code: res.body.code })
      expect(res.status).to.equal(httpStatus.CREATED)
      expect(res.body).to.have.property('code')
      expect(res2.status).to.equal(httpStatus.OK)
      expect(res2.body).to.have.property('user')
      expect(res2.body).to.have.property('tokens')
    })

    it('should return validation error for invalid data', async () => {
      const res = await request.post('/v1/auth/register').send({
        email: 'invalidemail',
        password: 'short'
      })
      expect(res.status).to.equal(httpStatus.BAD_REQUEST)
    })
  })

  // Test Login
  describe('POST /login', () => {
    it('should login a registered user', async () => {
      const res = await request.post('/v1/auth/login').send({
        email: userData.email,
        password: userData.password
      })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body).to.have.property('tokens')
      userToken = res.body.tokens.refresh.token
    })

    it('should return error for incorrect credentials', async () => {
      const res = await request.post('/v1/auth/login').send({
        email: userData.email,
        password: 'WrongPassword123'
      })
      expect(res.status).to.equal(httpStatus.BAD_REQUEST)
    })
  })

  // Test Admin Login
  describe('POST /admin-login', () => {
    it('should login an admin user', async () => {
      const res = await request.post('/v1/auth/admin-login').send(adminData)
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body).to.have.property('tokens')
    })

    it('should not allow non-admin users to login as admin', async () => {
      const res = await request.post('/v1/auth/admin-login').send({
        email: userData.email,
        password: userData.password
      })
      expect(res.status).to.equal(httpStatus.BAD_REQUEST)
    })
  })

  // Test Token Refresh
  describe('POST /refresh-tokens', () => {
    it('should refresh tokens', async () => {
      const res = await request.post('/v1/auth/refresh-tokens').send({ token: userToken })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body).to.have.property('access')
      expect(res.body).to.have.property('refresh')
    })
  })

  // Test Logout
  describe('POST /logout', () => {
    it('should logout a user', async () => {
      const res = await request.post('/v1/auth/logout').send({ token: userToken })
      expect(res.status).to.equal(httpStatus.NO_CONTENT)
    })
  })

  // Test Forgot Password
  describe('POST /forgot-password', () => {
    it('should send a password reset code', async () => {
      const res = await request.post('/v1/auth/forgot-password').send({ email: userData.email })
      expect(res.body).to.have.property('code')
      expect(res.status).to.equal(httpStatus.OK)
      resetCode = res.body.code
    })

    it('should return error for non-existent email', async () => {
      const res = await request.post('/v1/auth/forgot-password').send({ email: 'nonexistent@example.com' })
      expect(res.status).to.equal(httpStatus.NOT_FOUND)
    })
  })

  // Test Resend Confirmation Email
  describe('POST /resend-confirmation-email', () => {
    it('should resend confirmation email', async () => {
      const res = await request.post('/v1/auth/resend-confirmation-email').send({ email: userData.email })
      expect(res.status).to.equal(httpStatus.BAD_REQUEST) // User is already verified
    })
  })

  // Test Reset Password
  describe('POST /reset-password', () => {
    it('should reset password with valid code', async () => {
      const res = await request.post('/v1/auth/reset-password').send({
        email: userData.email,
        password: 'NewStrongP@ssw0rd',
        code: resetCode
      })
      expect(res.status).to.equal(httpStatus.OK)
    })

    it('should return error for invalid code', async () => {
      const res = await request.post('/v1/auth/reset-password').send({
        email: userData.email,
        password: 'NewStrongP@ssw0rd',
        code: 'invalid-code'
      })
      expect(res.status).to.equal(httpStatus.NOT_FOUND)
    })
  })
})
