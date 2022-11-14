"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Cool trip to Patagonia",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Hot trip to Qatar",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Making friends in Amsterdam",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2,
        },
        {
          name: "The best bagles in Brick Lane!",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2,
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
    await queryInterface.bulkDelete("stories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
