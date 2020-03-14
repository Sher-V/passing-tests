const Sequilize = require("sequelize");
const db = require("../config/database");

const Test = db.define(
  "test",
  {
    name: {
      type: Sequilize.STRING
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Test;
