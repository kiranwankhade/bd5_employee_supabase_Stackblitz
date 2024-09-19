module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Department.associate = (models) => {
    Department.belongsToMany(models.Employee, {
      through: models.EmployeeDepartment, // Join table
      foreignKey: 'departmentId',
      otherKey: 'employeeId',
    });
  };

  return Department;
};
