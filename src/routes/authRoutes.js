const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');  // Importing controller methods

// POST /auth/register - Register a new user
router.post('/register', register);

// POST /auth/login - Login and get JWT token
router.post('/login', login);

module.exports = router;
