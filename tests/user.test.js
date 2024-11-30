const request = require('supertest');
const app = require('../src/app');

let adminToken;

beforeAll(async () => {
  // Log in as admin to get the JWT token
  const res = await request(app)
    .post('/auth/login')
    .send({ username: 'admin', password: 'admin123' });
  adminToken = res.body.token;
});

describe('User APIs', () => {
  test('GET /users - Get all users (Admin Only)', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('POST /users - Create a new user (Admin Only)', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        username: 'newuser',
        password: 'password123',
        email: 'newuser@example.com',
        phone: '9876543210',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  test('GET /users/:id - Get user by ID (Admin Only)', async () => {
    const res = await request(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username', 'admin');
  });

  test('DELETE /users/:id - Delete user by ID (Admin Only)', async () => {
    const res = await request(app)
      .delete('/users/2')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
});
