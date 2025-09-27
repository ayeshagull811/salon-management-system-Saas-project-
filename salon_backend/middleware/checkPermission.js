const db = require("../models");

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Fetch user with roles & permissions
      const user = await db.User.findByPk(req.user.id, {
        include: [
          {
            model: db.Role,
            as: "Roles", // must match User.associate
            include: [
              {
                model: db.Permission,
                as: "Permissions", // must match Role.associate
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(403).json({ message: "Forbidden: user not found" });
      }

      // Collect unique permissions
      const userPermissions = [
        ...new Set(
          user.Roles?.flatMap((role) =>
            role.Permissions?.map((perm) => perm.name.trim().toLowerCase())
          ) || []
        ),
      ];

      req.user.permissions = userPermissions; // attach for controller if needed
      console.log("🔑 User Permissions:", userPermissions);

      // Check required permission
      if (!userPermissions.includes(permissionName.toLowerCase())) {
        return res.status(403).json({ message: `Forbidden: missing ${permissionName}` });
      }

      next();
    } catch (error) {
      console.error("checkPermission error:", error);
      res.status(500).json({ message: "Server error in permission check" });
    }
  };
};

module.exports = checkPermission;
