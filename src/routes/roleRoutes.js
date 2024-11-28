const express = require('express');
const router = express.Router();
const { verifyJwtToken, verifyRole } = require('../middlewares/jwtMiddleware');
const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/roleController');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles (Admin only)
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Server error
 */
router.get('/', verifyJwtToken, verifyRole(['admin']), getRoles);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a role by ID (Admin only)
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the role to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role details
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Not found - Role does not exist
 *       500:
 *         description: Server error
 */
router.get('/:id', verifyJwtToken, verifyRole(['admin']), getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role (Admin only)
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Role created
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Server error
 */
router.post('/', verifyJwtToken, verifyRole(['admin']), createRole);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a role by ID (Admin only)
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the role to update
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
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Role updated
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Not found - Role does not exist
 *       500:
 *         description: Server error
 */
router.put('/:id', verifyJwtToken, verifyRole(['admin']), updateRole);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a role by ID (Admin only)
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the role to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role deleted
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Not found - Role does not exist
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyJwtToken, verifyRole(['admin']), deleteRole);

module.exports = router;
