const request = require('supertest');
const app = require('../src/app'); // Path to your Express app

describe('TestObject APIs', () => {
    test('POST /testObjects - Create a new TestObject', async () => {
      const res = await request(app)
        .post('/testObjects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'SampleTestObject' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'TestObject created successfully');
    });
  
    test('GET /testObjects - Get all TestObjects', async () => {
      const res = await request(app)
        .get('/testObjects')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
  