const request = require('supertest');
const app = require('../src/app'); // Path to your Express app

describe('Claim APIs', () => {
    test('POST /claims - Create a new claim', async () => {
      const res = await request(app)
        .post('/claims')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'CreateTestObject' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Claim created successfully');
    });
  
    test('GET /claims - Get all claims', async () => {
      const res = await request(app)
        .get('/claims')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
  