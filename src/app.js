const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const claimRoutes = require('./routes/claimRoutes');
const testObjectRoutes = require('./routes/testObjectRoutes');
const { verifyJwtToken } = require('./middlewares/jwtMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/auth', authRoutes); // Public routes: Login and Register
app.use('/users', verifyJwtToken, userRoutes); // Protected routes for managing users
app.use('/roles', verifyJwtToken, roleRoutes); // Protected routes for managing roles
app.use('/claims', verifyJwtToken, claimRoutes); // Protected routes for managing claims
app.use('/testobjects', verifyJwtToken, testObjectRoutes); // Protected routes for managing test objects

// Swagger API documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json'); // Ensure your swagger.json is up to date
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling for 404 (route not found)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

module.exports = app;
