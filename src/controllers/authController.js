const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../db/inMemoryDB'); // Your in-memory user database
const {validateUsername, validateEmail, validatePhone, sanitizeString} = require('../utils/validation')

// Controller for user registration
const register = (req, res) => {
  const { username, password, email, phone } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: {
        message: 'Invalid email format',
        status: 400,
      },
    });
  }
  
  if (phone && !validatePhone(phone)) {
    return res.status(400).json({
      error: {
        message: 'Invalid phone number format',
        status: 400,
      },
    });
  }

// Validate username
if (!validateUsername(username)) {
  return res.status(400).json({
    error: {
      message: 'Invalid username format. Only alphanumeric characters and underscores are allowed.',
      status: 400,
    },
  });
}

// Sanitize username to prevent injection
const sanitizedUsername = sanitizeString(username);

  // Check if the user already exists
  const existingUser = users.find(user => user.username === sanitizedUsername);
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
      name: sanitizedUsername,
      password: hashedPassword, // Store hashed password,
      email: email,
      phone: phone,
      role: 'user', // Default role
    };

    // Add the new user to the in-memory database
    users.push(newUser);

    res.status(201).json({
      message: `New User ${sanitizedUsername} registered successfully`,
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
    console.log(`New user ${sanitizedUsername} registered successfully.`);
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
    console.log(`User ${user.username} logged in successfully with "${user.role}" role and issued JwtToken to expire in 1h.`);
  });
};

module.exports = {
  register,
  login,
};
