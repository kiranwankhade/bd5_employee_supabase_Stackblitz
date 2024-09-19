module.exports = (sequelize, DataTypes) => {
  const EmployeeRole = sequelize.define('EmployeeRole', {
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Employees',
        key: 'id',
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
  });

  return EmployeeRole;
};
