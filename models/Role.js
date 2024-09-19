module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.Employee, {
      through: models.EmployeeRole, // Join table
      foreignKey: 'roleId',
      otherKey: 'employeeId',
    });
  };

  return Role;
};
