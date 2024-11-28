const db = require('../db/inMemoryDB'); // Import the database module (in-memory DB)
const { validateTestObjectId } = require('../utils/validation'); // Assuming you have a utility for validation

// Function to get all TestObjects
const getTestObjects = (req, res) => {
  try {
    const testObjects = db.testObjects; // In-memory data
    res.status(200).json(testObjects); // Return list of all test objects
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to retrieve test objects' });
  }
};

// Function to get a TestObject by ID
const getTestObjectById = (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  // Validate the ID
  if (!validateTestObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Find the TestObject by ID
    const testObject = db.testObjects.find(obj => obj.id === parseInt(id));

    if (!testObject) {
      return res.status(404).json({ message: `TestObject with ID ${id} not found` });
    }

    // If the TestObject is found, return it
    res.status(200).json(testObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to retrieve test object' });
  }
};

// Function to create a new TestObject
const createTestObject = (req, res) => {
  const { name, description } = req.body;

  try {
    // Create new TestObject object
    const newTestObject = {
      id: db.testObjects.length + 1, // Simple ID generation for the in-memory DB
      name,
      description
    };

    db.testObjects.push(newTestObject); // Add to in-memory DB

    res.status(201).json(newTestObject); // Return the created TestObject
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to create test object' });
  }
};

// Function to update a TestObject by ID
const updateTestObject = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Validate the ID
  if (!validateTestObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const testObject = db.testObjects.find(obj => obj.id === parseInt(id));

    if (!testObject) {
      return res.status(404).json({ message: `TestObject with ID ${id} not found` });
    }

    // Update the TestObject
    testObject.name = name || testObject.name;
    testObject.description = description || testObject.description;

    res.status(200).json(testObject); // Return the updated TestObject
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to update test object' });
  }
};

// Function to delete a TestObject by ID
const deleteTestObject = (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!validateTestObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const testObjectIndex = db.testObjects.findIndex(obj => obj.id === parseInt(id));

    if (testObjectIndex === -1) {
      return res.status(404).json({ message: `TestObject with ID ${id} not found` });
    }

    // Remove the TestObject from the in-memory DB
    db.testObjects.splice(testObjectIndex, 1);

    res.status(200).json({ message: `TestObject with ID ${id} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to delete test object' });
  }
};

module.exports = {
  getTestObjects,
  getTestObjectById,
  createTestObject,
  updateTestObject,
  deleteTestObject
};