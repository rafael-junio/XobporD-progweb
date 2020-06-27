
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        email: 'admin@admin.com',
        password: '$2b$15$VUgqmppwPQpMdtvVCjzCr.OuWZHvhEakkyXNNG/cyAMRtKYVvBR2y',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
