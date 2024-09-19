module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'EmployeeDepartments',
      [
        {
          employeeId: 1,
          departmentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          employeeId: 2,
          departmentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          employeeId: 3,
          departmentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EmployeeDepartments', null, {});
  },
};
