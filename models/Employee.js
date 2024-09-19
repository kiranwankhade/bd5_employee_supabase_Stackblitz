module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Employee.associate = (models) => {
    Employee.belongsToMany(models.Department, {
      through: models.EmployeeDepartment, // Join table
      foreignKey: 'employeeId',
      otherKey: 'departmentId',
    });

    Employee.belongsToMany(models.Role, {
      through: models.EmployeeRole, // Join table
      foreignKey: 'employeeId',
      otherKey: 'roleId',
    });
  };

  return Employee;
};
