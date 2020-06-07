module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@admin.com",
          password: "$2b$15$iEh6jm9ogJ9go0KbplhHretBKF9suAsIvvXplD/t45H5ZEUV2e6Me",
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
