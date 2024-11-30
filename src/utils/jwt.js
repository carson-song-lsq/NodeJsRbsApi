// src/utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    permissions: user.permissions || [],
  };

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) throw new Error('JWT_SECRET environment variable is missing');

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) throw new Error('JWT_SECRET environment variable is missing');

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error(`Invalid or expired token: ${ error}`);
  }
};

module.exports = { generateToken, verifyToken };
