const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../db/inMemoryDB'); // Your in-memory user database

// Controller for user registration
const register = (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Create the new user
    const newUser = {
      id: users.length + 1, // For simplicity, increment user ID
      username,
      password: hashedPassword, // Store hashed password
      role: 'user', // Default role
    };

    // Add the new user to the in-memory database
    users.push(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
  });
};

// Controller for user login
const login = (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the entered password with the hashed password
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token with user information (id, role, etc.)
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
    });
  });
};

module.exports = {
  register,
  login,
};