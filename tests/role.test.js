const request = require('supertest');
const app = require('../src/app'); // Path to your Express app

describe('Role APIs', () => {
    test('POST /roles - Create a new role', async () => {
      const res = await request(app)
        .post('/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Editor' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Role created successfully');
    });
  
    test('GET /roles - Get all roles', async () => {
      const res = await request(app)
        .get('/roles')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
  