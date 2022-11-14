"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "Pablo's Space",
          description:
            "Welcome to my personal space, bro. Here you can check out whats up with my adventures around the world!",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          title: "Josephine's Pesonal Stories",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4,
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
