const Sequilize = require("sequelize");
const db = require("../config/database");
const Test = require("./Test");

const Question = db.define(
  "question",
  {
    type: {
      type: Sequilize.STRING,
      allowNull: false
    },
    text: {
      type: Sequilize.STRING,
      allowNull: false
    },
    answers: {
      type: Sequilize.ARRAY(Sequilize.STRING),
      allowNull: false
    },
    right_answer: {
      type: Sequilize.ARRAY(Sequilize.STRING),
      allowNull: false
    },
    test_id: {
      type: Sequilize.INTEGER,
      references: {
        model: Test,
        key: "id"
      }
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Question;
