const Sequilize = require("sequelize");
const db = require("../config/database");
const Question = require("./Question");

const Answer = db.define(
  "answer",
  {
    answer: {
      type: Sequilize.STRING,
      allowNull: false
    },
    is_right_answer: {
      type: Sequilize.BOOLEAN,
      allowNull: false
    },
    question_id: {
      type: Sequilize.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: "id"
      }
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Answer;
