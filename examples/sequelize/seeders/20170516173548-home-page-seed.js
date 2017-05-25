'use strict';

const models = require('../core/loaders/models')();

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
