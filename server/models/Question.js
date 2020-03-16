const Sequilize = require("sequelize");
const db = require("../config/database");
const Test = require("./Test");
const Answer = require("./Answer");

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

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

module.exports = Question;
