'use strict';

const models = require('../core/loaders/models')();

module.exports = {
  up: function (queryInterface, Sequelize) {
      return models.Pages
          .update({ title:'Home', slug :'home' }, {where: {
              title: 'Home'
          }})
          .then(updated => {
              console.log('updated', updated);
          });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
