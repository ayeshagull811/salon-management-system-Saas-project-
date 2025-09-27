'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Ensure 'owner' role exists
    await queryInterface.bulkInsert(
      'Roles',
      [{ name: 'owner', createdAt: now, updatedAt: now }],
      { ignoreDuplicates: true }
    );

    // Get owner role ID after insert
    const [ownerRole] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = 'owner' LIMIT 1;`
    );
    const ownerRoleId = ownerRole[0].id; // ✅ this must exist

    // Get all permission IDs
    const [allPerms] = await queryInterface.sequelize.query(
      `SELECT id FROM Permissions;`
    );

    const rolePermData = allPerms.map((perm) => ({
      roleId: ownerRoleId, // ✅ must not be null
      permissionId: perm.id,
      createdAt: now,
      updatedAt: now,
    }));

    if (rolePermData.length > 0) {
      await queryInterface.bulkInsert('RolePermissions', rolePermData, {
        ignoreDuplicates: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RolePermissions', null, {});
    await queryInterface.bulkDelete('Roles', { name: 'owner' }, {});
  },
};
