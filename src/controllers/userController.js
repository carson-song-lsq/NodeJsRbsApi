const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/inMemoryDB'); // Assuming your in-memory DB is set up here
const { JWT_SECRET } = process.env;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - username
 *         - password
 *         - role
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         statusCode:
 *           type: integer
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 */
exports.getUsers = async (req, res) => {
  try {
    const users = db.users;
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", statusCode: 500 });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (Admin only)
 */
exports.getUserById = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = db.users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", statusCode: 404 });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", statusCode: 500 });
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 */
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required", statusCode: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: db.users.length + 1,
      username,
      password: hashedPassword,
      role: 'User', // Default role for new users
    };
    db.users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", statusCode: 500 });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID (Admin only)
 */
exports.updateUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required", statusCode: 400 });
  }

  try {
    const user = db.users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", statusCode: 404 });
    }

    user.username = username;
    user.password = await bcrypt.hash(password, 10); // Hash the new password
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", statusCode: 500 });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID (Admin only)
 */
exports.deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const userIndex = db.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found", statusCode: 404 });
    }

    db.users.splice(userIndex, 1); // Delete user from in-memory DB
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", statusCode: 500 });
  }
};

/**
 * Generate a JWT token for an authenticated user
 * @param {Object} user The user to generate the token for
 */
function generateJwtToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}
