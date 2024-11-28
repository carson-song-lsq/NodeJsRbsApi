const db = require('../db/inMemoryDB'); // Assuming your in-memory DB is set up here

/**
 * @swagger
 * /claims:
 *   get:
 *     summary: Get all claims (Admin only)
 *     tags: [Claims]
 *     responses:
 *       200:
 *         description: List of claims
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Server error
 */
exports.getClaims = (req, res) => {
  try {
    const claims = db.claims;
    if (!claims || claims.length === 0) {
      return res.status(404).json({ message: 'No claims found', statusCode: 404 });
    }
    res.status(200).json(claims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /claims/{id}:
 *   get:
 *     summary: Get a claim by ID (Admin only)
 *     tags: [Claims]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the claim to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Claim details
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Not found - Claim does not exist
 *       500:
 *         description: Server error
 */
exports.getClaimById = (req, res) => {
  const claimId = parseInt(req.params.id, 10);
  try {
    const claim = db.claims.find((c) => c.id === claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found', statusCode: 404 });
    }
    res.status(200).json(claim);
  } catch (error) {
    console.error('Error fetching claim:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /claims:
 *   post:
 *     summary: Create a new claim (Admin only)
 *     tags: [Claims]
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
 *         description: Claim created
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Server error
 */
exports.createClaim = (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required', statusCode: 400 });
  }

  try {
    const newClaim = {
      id: db.claims.length + 1,
      name,
      description,
    };
    db.claims.push(newClaim);
    res.status(201).json(newClaim);
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /claims/{id}:
 *   put:
 *     summary: Update a claim by ID (Admin only)
 *     tags: [Claims]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the claim to update
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
 *         description: Claim updated
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Not found - Claim does not exist
 *       500:
 *         description: Server error
 */
exports.updateClaim = (req, res) => {
  const claimId = parseInt(req.params.id, 10);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required', statusCode: 400 });
  }

  try {
    const claim = db.claims.find((c) => c.id === claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found', statusCode: 404 });
    }

    claim.name = name;
    claim.description = description;
    res.status(200).json(claim);
  } catch (error) {
    console.error('Error updating claim:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /claims/{id}:
 *   delete:
 *     summary: Delete a claim by ID (Admin only)
 *     tags: [Claims]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the claim to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Claim deleted
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Not found - Claim does not exist
 *       500:
 *         description: Server error
 */
exports.deleteClaim = (req, res) => {
  const claimId = parseInt(req.params.id, 10);

  try {
    const claimIndex = db.claims.findIndex((c) => c.id === claimId);
    if (claimIndex === -1) {
      return res.status(404).json({ message: 'Claim not found', statusCode: 404 });
    }

    db.claims.splice(claimIndex, 1); // Delete claim from in-memory DB
    res.status(200).json({ message: 'Claim deleted successfully' });
  } catch (error) {
    console.error('Error deleting claim:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};
