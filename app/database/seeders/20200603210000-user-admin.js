
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        email: 'admin@admin.com',
        password: '$2b$15$gSyG.gjQc2iRVZXmoS5g0u9x7CEmfmIZLxKnvkvWGYSswzO8Co4am',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
