module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'EmployeeRoles',
      [
        {
          employeeId: 1,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          employeeId: 2,
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          employeeId: 3,
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EmployeeRoles', null, {});
  },
};
