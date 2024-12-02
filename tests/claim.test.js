const request = require('supertest');
const app = require('../src/app'); // Path to your Express app

describe('Claim APIs', () => {
  var adminToken = "";
  beforeAll(async () => {
    let res = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin123',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).not.toBeNull();
    adminToken = res.body.token;
  });

  test('POST /claims - Create a new claim', async () => {

    res = await request(app)
      .post('/claims')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'TestNewClaim', description: "Test new Claim" });
    expect(res.statusCode).toBe(201);
  });

  test('GET /claims - Get all claims', async () => {
    const res = await request(app)
      .get('/claims')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
