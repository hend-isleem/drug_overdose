const request = require('supertest');
const app = require('../src/modules/app/app.module'); // adjust path as necessary

describe('API Route Tests', () => {
  test('should return 200 for /v1/auth route', async () => {
    const res = await request(app).get('/v1/auth');
    expect(res.statusCode).toBe(404);
  });

  test('should return 200 for /v1/contacts route', async () => {
    const res = await request(app).get('/v1/contacts');
    expect(res.statusCode).toBe(404);
  });

  test('should return 200 for /v1/users route', async () => {
    const res = await request(app).get('/v1/users');
    expect(res.statusCode).toBe(404);
  });

  test('should return 200 for /v1/swagger route', async () => {
    const res = await request(app).get('/v1/swagger/api-docs');
    expect(res.statusCode).toBe(200);
  });

  test('should return 404 for unknown route', async () => {
    const res = await request(app).get('/v1/unknown');
    expect(res.statusCode).toBe(404);
  });

  test('should have security headers from helmet middleware', async () => {
    const res = await request(app).get('/v1/auth');
    expect(res.headers['x-dns-prefetch-control']).toBe('off');
    expect(res.headers['x-frame-options']).toBe('DENY');
    expect(res.headers['x-xss-protection']).toBe('0');
  });
});
