module.exports = (sequelize, DataTypes) => {
  const EmployeeDepartment = sequelize.define('EmployeeDepartment', {
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Employees',
        key: 'id',
      },
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },
  });

  return EmployeeDepartment;
};
