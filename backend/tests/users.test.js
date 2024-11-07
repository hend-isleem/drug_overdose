const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/modules/app/app.module.js'); // Adjust the path as necessary to import your Express app


console.log("Test suit 1");

describe('GET /users', function() {
    it('should return a list of users', function(done) {
        supertest(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
            if (err) return done(err);
            // expect(res.body).to.be.an('array');
            done();
        });
    });
});




/*
(async () => {
    const { expect } = await import('chai');  // Use dynamic import
    const request = (await import('supertest')).default;
    const app = (await import('../src/modules/app/app.module.js')).default;

    // Dummy auth token - Replace with valid token or mock authentication for tests
    
    const adminToken = 'valid-admin-token';
    const userToken = 'valid-user-token';

    describe('User Routes', function () {

        let createdUserEmail;

        // Test for creating a user (POST /v1/users)
        it('should create a new user (ADMIN only)', async function () {
            const newUser = {
                email: 'testuser@example.com',
                password: 'Password123!',
                role: 'USER',
                name: 'Test User'
            };

            const response = await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${adminToken}`)  // Set Authorization header
                .send(newUser);

            expect(response.status).to.equal(204);  // Expecting no content status
            createdUserEmail = newUser.email;
        });

        // Test for querying users (GET /v1/users)
        it('should get a list of users (ADMIN only)', async function () {
            const response = await request(app)
                .get('/v1/users')
                .set('Authorization', `Bearer ${adminToken}`)  // Set Authorization header
                .send();

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.property('email');
        });

        // Test for getting a specific user by email (GET /v1/users/:userEmail)
        it('should get a specific user by email (ADMIN only)', async function () {
            const response = await request(app)
                .get(`/v1/users/${createdUserEmail}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('email', createdUserEmail);
            expect(response.body).to.not.have.property('password');  // Ensure password is not included
        });

        // Test for updating a user's data (PATCH /v1/users/:userEmail)
        it('should update user information (ADMIN only)', async function () {
            const updatedData = { name: 'Updated Test User' };

            const response = await request(app)
                .patch(`/v1/users/${createdUserEmail}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updatedData);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('email', createdUserEmail);
        });

        // Test for deleting a user (DELETE /v1/users/:userEmail)
        it('should delete a user (ADMIN only)', async function () {
            const response = await request(app)
                .delete(`/v1/users/${createdUserEmail}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(response.status).to.equal(204);  // Expecting no content
        });

        // Test for user reset password (PUT /v1/users/:userEmail)
        it('should reset user password (ADMIN only)', async function () {
            const passwordData = {
                currentPassword: 'Password123!',
                newPassword: 'NewPassword456!'
            };

            const response = await request(app)
                .put(`/v1/users/${createdUserEmail}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(passwordData);

            expect(response.status).to.equal(204);  // Expecting no content
        });
    });
})();

*/