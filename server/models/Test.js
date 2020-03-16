const Sequilize = require("sequelize");
const db = require("../config/database");

const Test = db.define(
  "test",
  {
    title: {
      type: Sequilize.STRING,
      allowNull: false
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Test;
