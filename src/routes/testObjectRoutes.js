const express = require('express');
const router = express.Router();
const testObjectController = require('../controllers/testObjectController'); // Assuming the controller is at this path
const jwtMiddleware = require('../middlewares/jwtMiddleware'); // Assuming the JWT middleware is at this path

// Define routes for CRUD operations on TestObject

/**
 * @swagger
 * /test-objects:
 *   get:
 *     summary: Get all TestObjects (Authenticated users only)
 *     tags: [TestObjects]
 *     responses:
 *       200:
 *         description: List of TestObjects
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error
 */
router.get('/', jwtMiddleware.verifyJwtToken, jwtMiddleware.verifyRole(['admin','user']), testObjectController.getTestObjects);

/**
 * @swagger
 * /test-objects/{id}:
 *   get:
 *     summary: Get a TestObject by ID (Authenticated users only)
 *     tags: [TestObjects]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the TestObject to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TestObject details
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Not found - TestObject does not exist
 *       500:
 *         description: Server error
 */
router.get('/:id', jwtMiddleware.verifyJwtToken, jwtMiddleware.verifyRole(['admin','user']), testObjectController.getTestObjectById);

/**
 * @swagger
 * /test-objects:
 *   post:
 *     summary: Create a new TestObject (Authenticated users only)
 *     tags: [TestObjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: TestObject created
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error
 */
router.post('/', jwtMiddleware.verifyJwtToken, jwtMiddleware.verifyRole(['admin','user']), testObjectController.createTestObject);

/**
 * @swagger
 * /test-objects/{id}:
 *   put:
 *     summary: Update a TestObject by ID (Authenticated users only)
 *     tags: [TestObjects]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the TestObject to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: TestObject updated
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Not found - TestObject does not exist
 *       500:
 *         description: Server error
 */
router.put('/:id', jwtMiddleware.verifyJwtToken, jwtMiddleware.verifyRole(['admin','user']), testObjectController.updateTestObject);

/**
 * @swagger
 * /test-objects/{id}:
 *   delete:
 *     summary: Delete a TestObject by ID (Authenticated users only)
 *     tags: [TestObjects]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the TestObject to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TestObject deleted
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Not found - TestObject does not exist
 *       500:
 *         description: Server error
 */
router.delete('/:id', jwtMiddleware.verifyJwtToken, jwtMiddleware.verifyRole(['admin']), testObjectController.deleteTestObject);

module.exports = router;
