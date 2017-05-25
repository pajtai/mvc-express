'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('pages', 'slug', {
            type: Sequelize.STRING
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('pages', 'slug');
    }
};
