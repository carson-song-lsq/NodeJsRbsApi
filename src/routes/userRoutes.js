const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyJwtToken, verifyRole } = require("../middlewares/jwtMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations for managing users
 */

/**
 * @swagger
 * path:
 *  /users:
 *    get:
 *      tags: [Users]
 *      summary: Get all users
 *      description: Retrieve a list of all users (Admin only)
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: List of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/User"
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        403:
 *          description: Forbidden
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        500:
 *          description: Server error
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 */
router.get("/", verifyJwtToken, verifyRole(['admin']), userController.getUsers);

/**
 * @swagger
 * path:
 *  /users/{id}:
 *    get:
 *      tags: [Users]
 *      summary: Get a user by ID
 *      description: Retrieve a user by its ID (Admin only)
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: User ID
 *      responses:
 *        200:
 *          description: User retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        403:
 *          description: Forbidden
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        404:
 *          description: User not found
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        500:
 *          description: Server error
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 */
router.get("/:id", verifyJwtToken, verifyRole(['admin']), userController.getUserById);

/**
 * @swagger
 * path:
 *  /users/{id}:
 *    put:
 *      tags: [Users]
 *      summary: Update user by ID
 *      description: Update user details by its ID (Admin only)
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: User ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: User updated successfully
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        403:
 *          description: Forbidden
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        404:
 *          description: User not found
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        500:
 *          description: Server error
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 */
router.put("/:id", verifyJwtToken, verifyRole(['admin']), userController.updateUser);

/**
 * @swagger
 * path:
 *  /users/{id}:
 *    delete:
 *      tags: [Users]
 *      summary: Delete user by ID
 *      description: Delete user by its ID (Admin only)
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: User ID
 *      responses:
 *        200:
 *          description: User deleted successfully
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              $ref: "#/components/schemas/Error"
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json":
 *              $ref: "#/components/schemas/Error"
 *        403:
 *          description: Forbidden
 *          content:
 *            application/json":
 *              $ref: "#/components/schemas/Error"
 *        404:
 *          description: User not found
 *          content:
 *            application/json":
 *              $ref: "#/components/schemas/Error"
 *        500:
 *          description: Server error
 *          content:
 *            application/json":
 *              $ref: "#/components/schemas/Error"
 */
router.delete("/:id", verifyJwtToken, verifyRole(['admin']), userController.deleteUser);

module.exports = router;
