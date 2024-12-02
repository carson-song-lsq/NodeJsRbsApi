const request = require('supertest');
const app = require('../src/app'); // Path to your Express app

describe('TestObject APIs', () => {
  test('POST /testObjects - Create a new TestObject', async () => {

    let user2Token;
    // Log in as admin to get the JWT token
    let res = await request(app)
      .post('/auth/login')
      .send({ username: 'user2', password: 'password123' });
    expect(res.body.token).not.toBeNull();
    user2Token = res.body.token;

    //Get all TestObjects which should have 2 by default
    res = await request(app)
      .get('/testObjects')
      .set('Authorization', `Bearer ${user2Token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
    expect(res.body.length).toEqual(2); 


    // Create a new TestObject
    res = await request(app)
      .post('/testObjects')
      .set('Authorization', `Bearer ${user2Token}`)
      .send({ name: 'SampleTestObject', description: 'Sample Test Object Description' });
    expect(res.statusCode).toBe(201);


    //Get all TestObjects to get 3 now.
    res = await request(app)
      .get('/testObjects')
      .set('Authorization', `Bearer ${user2Token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
    expect(res.body.length).toEqual(3); 
    expect(res.body[2].name).toEqual('SampleTestObject');
    expect(res.body[2].description).toEqual('Sample Test Object Description');



    //Delete TestObject 3 should fail with regular user token, because Delete is for admin permissions only. 
    res = await request(app)
      .delete('/testObjects/3')
      .set('Authorization', `Bearer ${user2Token}`);
    expect(res.statusCode).toBe(403);


    //Get all TestObjects should still have 3 objects.
    res = await request(app)
      .get('/testObjects')
      .set('Authorization', `Bearer ${user2Token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
    expect(res.body.length).toEqual(3); 


    // Log in as admin to get the JWT token
    let adminToken;
    res = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin123' });
    expect(res.body.token).not.toBeNull();
    adminToken = res.body.token;


    //Delete TestObject 3 should succeed with admin permission. 
    res = await request(app)
      .delete('/testObjects/3')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);


    //Get all TestObjects should have 2 objects because 3 is deleted.
    res = await request(app)
      .get('/testObjects')
      .set('Authorization', `Bearer ${user2Token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
    expect(res.body.length).toEqual(2); 

  });
});
