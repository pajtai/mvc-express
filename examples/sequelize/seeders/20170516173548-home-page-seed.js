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
        // couldn't get queryInterface.bulkInsert to work
        return models.Pages
            .findOrCreate({where: {
                title: 'Home',
                content: '<h1>Hello world!</h1>'
            }})
            .spread((user, created) => {
                console.log(user.get({
                    plain : true
                }));
                console.log('created', created);
            });
    },

    down: function (queryInterface, Sequelize) {
        return models.Pages
            .destroy({where: {
                title: 'Home',
                content: '<h1>Hello world!</h1>'
            }})
            .then(numDeleted => {
                console.log('deleted', numDeleted);
            });
    }
};
