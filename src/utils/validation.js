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
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  
  module.exports = {
    validateTestObjectId,
    validateNonEmptyString,
    validateTestObjectData,
    validateRole,
    validateEmail
  };
  