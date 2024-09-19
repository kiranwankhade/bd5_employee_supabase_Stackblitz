module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Departments",
      [
        {
          name: "Engineering",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Marketing", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Departments", null, {});
  },
};
