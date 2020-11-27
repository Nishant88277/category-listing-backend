'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('manage_categories', [
      {
        name: 'Category-1',
      },
      {
        name: 'Category-2',
        parent_id: 1
      },
      {
        name: 'Category-3',
        parent_id: 1
      },
      {
        name: 'Category-4'
      },
      {
        name: 'Category-5',
        parent_id: 2
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
