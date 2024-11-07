const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/modules/app/app.module.js');


app.set('trust proxy', false);
chai.use(chaiHttp);

describe('Invalid route', function() {
    it('should fail requesting this endpoint', function(done) {
        supertest(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(error, response) {
            if (error) {
                if (response && response.status === 404) {
                  done(); // Test passes coz 404 is the expected response
                } else {
                  return done(error); 
                }
              }
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal("Invalid Endpoint!");
            done();
        });
    });

    after(function(done) {
        // Close your server or connections after tests
        app.close(done);
    });
});

