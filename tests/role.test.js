const request = require('supertest');
const app = require('../src/app'); // Path to your Express app

describe('Role APIs', () => {
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

    test('POST /roles - Create a new role', async () => {
      const res = await request(app)
        .post('/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Editor', permissions: [`CreateTestObject`] });
      expect(res.statusCode).toBe(201);
    });
  
    test('GET /roles - Get all roles', async () => {
      const res = await request(app)
        .get('/roles')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
  