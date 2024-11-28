const app = require('./app');  // Import the app.js file
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get the port from environment variable (defaults to 3000)
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
