const jwt = require('jsonwebtoken');
require('dotenv').config(); // Make sure to load .env variables

// In-memory user data
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'adminpassword',  // Use hashed passwords in production!
    role: { id: 1, name: 'Admin' }
  }
];

// Function to generate JWT token for admin
const generateAdminToken = (username, password) => {
  // Find the admin user
  const adminUser = users.find(user => user.username === username && user.password === password);

  if (!adminUser) {
    console.log('Invalid username or password');
    return;
  }

  // Create JWT token with the user info
  const token = jwt.sign(
    { id: adminUser.id, username: adminUser.username, role: adminUser.role.name },
    process.env.JWT_SECRET, // Make sure to set this in your .env
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  console.log('Generated Admin JWT Token:', token);
  return token;
};

// Example usage: Generate JWT token for admin
generateAdminToken('admin', 'adminpassword');
