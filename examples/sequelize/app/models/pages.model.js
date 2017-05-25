'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pages = sequelize.define('Pages', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      title: {
          type: DataTypes.STRING
      },
      slug: {
          type: DataTypes.STRING
      },
      content: {
          type: DataTypes.TEXT
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pages;
};