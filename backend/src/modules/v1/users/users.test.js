const chai = require('chai')
const chaiHttp = require('chai-http')
const supertest = require('supertest')
const httpStatus = require('http-status')
const app = require('../../app/app.module')

const { expect } = chai
chai.use(chaiHttp)
const request = supertest(app)

describe('User Routes', async function () {
  this.timeout(20000)

  const adminCredentials = {
    email: 'admin@sesa1.com',
    password: 'password1'
  }

  const newUser = {
    email: 'testuser@example.com',
    password: 'StrongP@ssw0rd',
    name: 'Test User',
    role: 'user'
  }

  let adminToken
  let userToken

  before(async () => {
    const adminRes = await request.post('/v1/auth/admin-login').send(adminCredentials)
    adminToken = adminRes.body.tokens.access.token
    await request.delete(`/v1/users/${newUser.email}`).auth(adminToken, { type: 'bearer' })
  })

  describe('POST /users', () => {
    it('should create a new user (Admin only)', async () => {
      const res = await request.post('/v1/users').auth(adminToken, { type: 'bearer' }).send(newUser)
      const res1 = await request.post('/v1/auth/login').send({ email: newUser.email, password: newUser.password })
      userToken = res1.body.tokens.refresh.token
      expect(res.status).to.equal(httpStatus.NO_CONTENT)
    })

    it('should return 403 for non-admin user trying to create a user', async () => {
      const res = await request
        .post('/v1/users')
        .auth(userToken, { type: 'bearer' })
        .send({ ...newUser, email: 'unauthorized@example.com' })
      expect(res.status).to.equal(httpStatus.UNAUTHORIZED)
    })
  })

  describe('GET /users', () => {
    it('should return a list of users (Admin only)', async () => {
      const res = await request.get('/v1/users').auth(adminToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body.documents).to.be.an('array')
    })

    it('should return 403 for non-admin user trying to list users', async () => {
      const res = await request.get('/v1/users').auth(userToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.UNAUTHORIZED)
    })
  })

  describe('GET /users/:userEmail', () => {
    it("should return a user's data by email", async () => {
      const res = await request.get(`/v1/users/${newUser.email}`).auth(adminToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body.email).to.equal(newUser.email)
    })

    it('should return 404 if user does not exist', async () => {
      const res = await request.get('/v1/users/nonexistent@example.com').auth(adminToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.NOT_FOUND)
    })
  })

  describe('PATCH /users/:userEmail', () => {
    it("should update a user's data", async () => {
      const newName = 'Updated User'
      const res = await request
        .patch(`/v1/users/${newUser.email}`)
        .auth(adminToken, { type: 'bearer' })
        .send({ name: newName })
      const res1 = await request.get(`/v1/users/${newUser.email}`).auth(adminToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res1.body.name).to.equal(newName)
    })

    it('should return 404 if trying to update a non-existent user', async () => {
      const res = await request
        .patch('/v1/users/nonexistent@example.com')
        .auth(adminToken, { type: 'bearer' })
        .send({ name: 'Does not exist' })
      expect(res.status).to.equal(httpStatus.NOT_FOUND)
    })
  })

  describe('PUT /users/:userEmail (reset password)', () => {
    it('should reset the password', async () => {
      const res = await request
        .put(`/v1/users/${newUser.email}`)
        .auth(adminToken, { type: 'bearer' })
        .send({ currentPassword: newUser.password, newPassword: 'NewPassword@123' })
      expect(res.status).to.equal(httpStatus.NO_CONTENT)
    })

    it('should return 400 for incorrect current password', async () => {
      const res = await request
        .put(`/v1/users/${newUser.email}`)
        .auth(adminToken, { type: 'bearer' })
        .send({ currentPassword: 'WrongPassword@123', newPassword: 'NewPassword@123' })
      expect(res.status).to.equal(httpStatus.BAD_REQUEST)
    })
  })
})
