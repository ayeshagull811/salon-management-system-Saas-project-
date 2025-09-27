const { Role, Permission } = require("../models");

module.exports = {
  // Create role
  async createRole(req, res) {
    try {
      const { name, permissionIds } = req.body;

      // ✅ Check if role already exists
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole) {
        return res.status(400).json({ message: "Role already exists" });
      }

      // Create new role
      const role = await Role.create({ name });

      // Assign permissions if provided
      if (permissionIds && permissionIds.length > 0) {
        await role.setPermissions(permissionIds);
      }

      res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get all roles
  async getRoles(req, res) {
    try {
      const roles = await Role.findAll({
        include: [{ model: Permission, as: "Permissions" }],
      });
      res.json(roles);
    } catch (error) {
      console.error("Error in getRoles:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get single role
  async getRole(req, res) {
    try {
      const role = await Role.findByPk(req.params.id, {
        include: [{ model: Permission, as: "Permissions" }],
      });

      if (!role) return res.status(404).json({ message: "Role not found" });

      res.json(role);
    } catch (error) {
      console.error("Error in getRole:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update role
  async updateRole(req, res) {
    try {
      const { name, permissionIds } = req.body;

      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });

      // ✅ Optional: check if new name conflicts with existing role
      if (name && name !== role.name) {
        const nameExists = await Role.findOne({ where: { name } });
        if (nameExists) {
          return res.status(400).json({ message: "Role name already exists" });
        }
      }

      await role.update({ name });

      if (permissionIds) {
        await role.setPermissions(permissionIds);
      }

      res.json({ message: "Role updated successfully", role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete role
  async deleteRole(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });

      await role.destroy();
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
