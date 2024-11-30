const request = require('supertest');
const app = require('../src/app'); // Assuming your app is in the root directory

describe('GET /users', () => {
  it('should respond with a 200 status code', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
  });

  it('should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.body).toBeInstanceOf(Array);
  });
});