const request = require('supertest');
const app = require('../src/app'); // Path to your Express app

describe('Auth APIs', () => {
  test('POST /auth/register - Register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        phone: '1234567890',
      });
    expect(res.statusCode).toBe(201);
  });

  test('POST /auth/login - Log in with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin123',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /auth/login - Log in with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid username or password');
  });
});
