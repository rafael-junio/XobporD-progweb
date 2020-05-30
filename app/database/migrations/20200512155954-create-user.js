module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allownNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allownNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allownNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allownNull: false,
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
