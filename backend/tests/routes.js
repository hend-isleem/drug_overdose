// const request = require('supertest');
// const app = require('../src/modules/app/app.module'); // adjust path as necessary

// describe('API Route Tests', () => {
//   test('should return 200 for /v1/auth route', async () => {
//     const res = await request(app).get('/v1/auth');
//     expect(res.statusCode).toBe(404);
//   });

//   test('should return 200 for /v1/contacts route', async () => {
//     const res = await request(app).get('/v1/contacts');
//     expect(res.statusCode).toBe(404);
//   });

//   test('should return 200 for /v1/users route', async () => {
//     const res = await request(app).get('/v1/users');
//     expect(res.statusCode).toBe(404);
//   });

//   test('should return 200 for /v1/swagger route', async () => {
//     const res = await request(app).get('/v1/swagger/api-docs');
//     expect(res.statusCode).toBe(200);
//   });

//   test('should return 404 for unknown route', async () => {
//     const res = await request(app).get('/v1/unknown');
//     expect(res.statusCode).toBe(404);
//   });

//   test('should have security headers from helmet middleware', async () => {
//     const res = await request(app).get('/v1/auth');
//     expect(res.headers['x-dns-prefetch-control']).toBe('off');
//     expect(res.headers['x-frame-options']).toBe('DENY');
//     expect(res.headers['x-xss-protection']).toBe('0');
//   });
// });


const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const supertest = require('supertest');

const expect = chai.expect;
chai.use(chaiHttp);
app.set('trust proxy', false);


describe('Contact API Tests', function() {
  let authToken;

  // Assuming login is needed
  before(function(done) {
    supertest(app)
      .post('/auth/login')
      .send({ email: 'user@example.com', password: 'password' })
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  console.log(authToken);

  it('should create a new contact', function(done) {
    supertest(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.include({
          name: 'John Doe',
          email: 'john@example.com'
        });
        done();
      });
  });

  // Additional CRUD tests would follow...

});
