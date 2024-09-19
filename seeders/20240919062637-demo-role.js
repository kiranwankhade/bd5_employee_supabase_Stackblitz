module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          title: 'Software Engineer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Marketing Specialist',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Product Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
