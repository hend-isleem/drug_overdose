/* eslint-disable no-loop-func */
const chai = require('chai')
const chaiHttp = require('chai-http')
const supertest = require('supertest')
const httpStatus = require('http-status')
const app = require('../../app/app.module')
const drugsConstant = require('../../../constants/drugs.constant')

app.set('trust proxy', false)
const { expect } = chai
chai.use(chaiHttp)
const request = supertest(app)

describe('Drugs Routes', async function () {
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

  before(async () => {
    const res = await request.post('/v1/auth/admin-login').send(adminData)
    try {
      await request.delete(`/v1/users/${userData.email}`).auth(res.body.tokens.access.token, { type: 'bearer' })
    } catch (error) {}
    await request.post('/v1/auth/register').send(userData)
    const res1 = await request.post('/v1/auth/login').send(userData)
    userToken = res1.body.tokens.access.token
  })

  let drugId

  describe('POST /v1/drugs', () => {
    for (let i = 0; i < drugsConstant.length; i++) {
      it(`should return interaction warnings between the drugs ${drugsConstant[i].join(', ')}`, async () => {
        const res = await request.post('/v1/drugs').auth(userToken, { type: 'bearer' }).send({ drugs: drugsConstant[i] })
        drugId = res.body._id
        expect(res.status).to.equal(httpStatus.OK)
        expect(res.body).to.have.property('interactions')
        expect(res.body.interactions).to.be.an('array')
      })
    }

    it('should return validation error for missing drugs data', async () => {
      const res = await request.post('/v1/drugs').auth(userToken, { type: 'bearer' }).send()
      expect(res.status).to.equal(httpStatus.BAD_REQUEST)
    })
  })

  // Test Query Drugs
  describe('GET /v1/drugs', () => {
    it('should allow authorized user to query drugs', async () => {
      const res = await request.get('/v1/drugs').auth(userToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body.count).to.be.a('number')
      expect(res.body.pages).to.be.a('number')
      expect(res.body.documents).to.be.an('array')
    })

    it('should not allow unauthorized user to query drugs', async () => {
      const res = await request.get('/v1/drugs')
      expect(res.status).to.equal(httpStatus.UNAUTHORIZED)
    })
  })

  // Test Get Drug by ID
  describe('GET /v1/drugs/:id', () => {
    it('should allow authorized user to get drug by ID', async () => {
      const res = await request.get(`/v1/drugs/${drugId}`).auth(userToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body).to.have.property('_id')
      expect(res.body._id).to.equal(drugId)
    })

    it('should return not found for invalid ID', async () => {
      const res = await request.get('/v1/drugs/6739527c934ecc31f543e84d').auth(userToken, { type: 'bearer' })
      expect(res.status).to.equal(httpStatus.NOT_FOUND)
    })
  })
})
