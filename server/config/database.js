const Sequelize = require("sequelize");

module.exports = new Sequelize("tests_db", "vadim", "", {
  host: "localhost",
  dialect: "postgres",
  logging: false
});
