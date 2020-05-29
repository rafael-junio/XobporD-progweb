'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Files', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownNull: false,
    },
    fileName: {
      type: Sequelize.STRING,
      allownNull: false,
    },
    uploadName: {
      type: Sequelize.STRING,
      allownNull: false,
      unique: true,
    },
    type: {
      type: Sequelize.STRING,
      allownNull: false,
    },
    size: {
      type: Sequelize.STRING,
      allownNull: false,
    },
    uploadedBy: {
      type: Sequelize.STRING,
      allownNull: false,
    },
    uploadAt: {
      type: Sequelize.DATE,
      allownNull: false,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Files'),
};
