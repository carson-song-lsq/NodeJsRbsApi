/**
 * Utility function to validate if the provided ID is a valid integer.
 * @param {string|number} id - The ID to validate.
 * @returns {boolean} - Returns true if the ID is a valid integer, false otherwise.
 */
const validateTestObjectId = (id) => {
  return !isNaN(id) && Number.isInteger(Number(id));
};

/**
 * Utility function to validate if the provided string is a non-empty value.
 * @param {string} value - The string to validate.
 * @returns {boolean} - Returns true if the string is non-empty, false otherwise.
 */
const validateNonEmptyString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Utility function to validate the structure of the TestObject data (name, description).
 * @param {object} testObject - The TestObject to validate.
 * @param {string} testObject.name - The name of the TestObject.
 * @param {string} testObject.description - The description of the TestObject.
 * @returns {boolean} - Returns true if the TestObject is valid, false otherwise.
 */
const validateTestObjectData = (testObject) => {
  return (
    validateNonEmptyString(testObject.name) && validateNonEmptyString(testObject.description)
  );
};

/**
 * Utility function to validate the role of a user (Admin, User).
 * @param {string} role - The role to validate.
 * @returns {boolean} - Returns true if the role is valid, false otherwise.
 */
const validateRole = (role) => {
  const validRoles = ['admin', 'user']; // Example valid roles
  return validRoles.includes(role);
};

/**
 * Utility function to validate email format.
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
* Validate phone to prevent script injection
* @param {string} phone
* @returns {boolean}
*/
const validatePhone = (phone) => {
  const phoneRegex = /^\+?[0-9]{0,3}\s?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

/**
* Validate username to prevent script injection
* @param {string} username
* @returns {boolean}
*/
const validateUsername = (username) => {
  // Allow only alphanumeric characters and underscores
  const usernameRegex = /^[a-zA-Z0-9_@.]+$/;
  return usernameRegex.test(username);
};

/**
 * Sanitize username by removing any potentially harmful characters
 * @param {string} username
 * @returns {string}
 */
const sanitizeString = (username) => {
  return username.replace(/[<>/"'`&]/g, ''); // Remove special characters
};

module.exports = {
  validateTestObjectId,
  validateNonEmptyString,
  validateTestObjectData,
  validateRole,
  validateEmail,
  validatePhone,
  validateUsername,
  sanitizeString
};
