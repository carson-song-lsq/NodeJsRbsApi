// src/routes/claimRoutes.js
const express = require('express');
const { createClaim, getClaims, updateClaim, deleteClaim } = require('../controllers/claimController');
const { verifyJwtToken, verifyRole } = require("../middlewares/jwtMiddleware");

const router = express.Router();

/**
 * @swagger
 * /claims:
 *   post:
 *     summary: Create a new claim (Admin only)
 *     tags: [Claims]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Claim created successfully
 *       403:
 *         description: Forbidden: You do not have permission to create a claim
 */
router.post('/', verifyJwtToken,  verifyRole(['admin']),createClaim);

/**
 * @swagger
 * /claims:
 *   get:
 *     summary: Get all claims (Admin only)
 *     tags: [Claims]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all claims
 *       403:
 *         description: Forbidden: You do not have permission to view claims
 */
router.get('/', verifyJwtToken,  verifyRole(['admin']),getClaims);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update an existing claim (Admin only)
 *     tags: [Claims]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *     responses:
 *       200:
 *         description: Claim updated successfully
 *       403:
 *         description: Forbidden: You do not have permission to update the claim
 */
router.put('/:id', verifyJwtToken,  verifyRole(['admin']),updateClaim);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a claim (Admin only)
 *     tags: [Claims]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Claim deleted successfully
 *       403:
 *         description: Forbidden: You do not have permission to delete the claim
 */
router.delete('/:id', verifyJwtToken, verifyRole(['admin']), deleteClaim);

module.exports = router;
