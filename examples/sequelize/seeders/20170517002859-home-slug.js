'use strict';

const config = require('../config/config.json');
const modelLoader = require('mvc-express-sequelize')(config);
const mvc = require('../../../index');
const path = require('path');

mvc.boot({
    root : path.join(__dirname, '..', 'app'),
    modelLoader,
    listen : false
});

// models is available after boot
const models = mvc.models;

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
