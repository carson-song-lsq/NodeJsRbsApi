const bcrypt = require('bcryptjs'); // Or bcrypt if you prefer

// in-memory database



let users = [];
// Default admin password (will be hashed)
const defaultAdminPassword = 'admin123';

// Encrypt the default admin password using bcrypt
bcrypt.hash(defaultAdminPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing admin password:', err);
    return;
  }

  // Create the default admin user with hashed password
  const defaultAdminUser = {
    id: 1,
    username: 'admin',
    password: hashedPassword,
    email: 'admin@example.com',
    phone: '1234567890',
    role: 'admin',
    permissions: ['CreateUser', 'CreateRole', 'CreateClaim', 'CreateTestObject', 'UpdateUser', 'DeleteUser', 'UpdateRole', 'DeleteRole', 'UpdateClaim', 'DeleteClaim'],
  };

  // Push the default admin user into the users array
  users.push(defaultAdminUser);

  console.log('Default admin user created with hashed password.');
});

 
// Default admin password (will be hashed)
const defaultUser2Password = 'password123';

// Encrypt the default admin password using bcrypt
bcrypt.hash(defaultUser2Password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing admin password:', err);
    return;
  }

  // Create the default admin user with hashed password
  const defaultUser = {
    id: 2,
    username: 'user2',
    password: hashedPassword,
    email: 'user@example.com',
    phone: '1024567890',
    role: 'user',
    permissions: ['CreateTestObject', 'ReadTestObject', 'UpdateTestObject', 'DeleteTestObject'],
  };

  // Push the default admin user into the users array
  users.push(defaultUser);

  console.log('Default admin user created with hashed password.');
});
  
  let roles = [
    {
      id: 1,
      name: 'admin',
      permissions: ['CreateUser', 'CreateRole', 'CreateClaim', 'CreateTestObject', 'UpdateUser', 'DeleteUser', 'UpdateRole', 'DeleteRole', 'UpdateClaim', 'DeleteClaim'],
    },
    {
      id: 2,
      name: 'user',
      permissions: ['CreateTestObject', 'ReadTestObject', 'UpdateTestObject', 'DeleteTestObject'],
    },
  ];
  
  let claims = [
    { id: 1, name: 'CreateUser' },
    { id: 2, name: 'UpdateUser' },
    { id: 3, name: 'DeleteUser' },
    { id: 4, name: 'CreateRole' },
    { id: 5, name: 'UpdateRole' },
    { id: 6, name: 'DeleteRole' },
    { id: 7, name: 'CreateClaim' },
    { id: 8, name: 'UpdateClaim' },
    { id: 9, name: 'DeleteClaim' },
    { id: 10, name: 'CreateTestObject' },
    { id: 11, name: 'ReadTestObject' },
    { id: 12, name: 'UpdateTestObject' },
    { id: 13, name: 'DeleteTestObject' },
  ];
  
  let testObjects = [
    { id: 1, name: 'TestObject 1', description: 'First test object' },
    { id: 2, name: 'TestObject 2', description: 'Second test object' },
  ];
  
  // Export the in-memory DB
  module.exports = { users, roles, claims, testObjects };
  