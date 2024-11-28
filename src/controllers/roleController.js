const db = require('../db/inMemoryDB'); // Assuming your in-memory DB is set up here

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles (Admin only)
 */
exports.getRoles = (req, res) => {
  try {
    const roles = db.roles;
    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: 'No roles found', statusCode: 404 });
    }
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID (Admin only)
 */
exports.getRoleById = (req, res) => {
  const roleId = parseInt(req.params.id, 10);
  try {
    const role = db.roles.find((r) => r.id === roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found', statusCode: 404 });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role (Admin only)
 */
exports.createRole = (req, res) => {
  const { name, permissions } = req.body;

  if (!name || !permissions) {
    return res.status(400).json({ message: 'Name and permissions are required', statusCode: 400 });
  }

  try {
    const newRole = {
      id: db.roles.length + 1,
      name,
      permissions,
    };
    db.roles.push(newRole);
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID (Admin only)
 */
exports.updateRole = (req, res) => {
  const roleId = parseInt(req.params.id, 10);
  const { name, permissions } = req.body;

  if (!name || !permissions) {
    return res.status(400).json({ message: 'Name and permissions are required', statusCode: 400 });
  }

  try {
    const role = db.roles.find((r) => r.id === roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found', statusCode: 404 });
    }

    role.name = name;
    role.permissions = permissions; // Update permissions
    res.status(200).json(role);
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID (Admin only)
 */
exports.deleteRole = (req, res) => {
  const roleId = parseInt(req.params.id, 10);

  try {
    const roleIndex = db.roles.findIndex((r) => r.id === roleId);
    if (roleIndex === -1) {
      return res.status(404).json({ message: 'Role not found', statusCode: 404 });
    }

    db.roles.splice(roleIndex, 1); // Delete role from in-memory DB
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};
