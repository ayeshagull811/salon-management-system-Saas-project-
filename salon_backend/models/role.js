'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {    
      Role.belongsToMany(models.User, {
        through: models.UserSalons,
        foreignKey: "roleId",
        otherKey: "userId",
        as: "Users",
      });
Role.belongsToMany(models.Salon, {
  through: models.UserSalons,
  foreignKey: "roleId",
  otherKey: "salonId",
  as: "Salons",
});

   Role.belongsToMany(models.Permission, {
  through: models.RolePermissions,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "Permissions",   // ✅ Correct alias
});

    }
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};