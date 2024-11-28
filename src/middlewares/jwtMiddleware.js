const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

/**
 * Middleware to verify the JWT token
 */
exports.verifyJwtToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided', statusCode: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded JWT to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ message: 'Invalid or expired token', statusCode: 401 });
  }
};


// Middleware to verify the role of the user
exports.verifyRole = (roles) => {
  // Ensure roles is an array
  if (!Array.isArray(roles)) {
    throw new Error("Roles should be an array.");
  }

  return (req, res, next) => {
    const userRole = req.user?.role; // Extract the user's role from the decoded JWT

    if (!userRole) {
      return res.status(403).json({ message: 'Role not found in the token.' });
    }

    // Check if the user's role matches any of the allowed roles
    if (roles.includes(userRole)) {
      next(); // User has the required role, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'You do not have permission to access this resource.' });
    }
  };
};