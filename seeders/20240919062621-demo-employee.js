module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Employees',
      [
        {
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  },
};
