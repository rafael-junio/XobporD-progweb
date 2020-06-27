const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@admin.com",
          password: bcrypt.hashSync("admin", 15),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
