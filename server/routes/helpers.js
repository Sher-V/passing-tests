const Question = require("../models/Question");
const Answer = require("../models/Answer");

const saveQuestions = async (questions, testId) => {
  for (const question of questions) {
    const createdQuestion = await Question.create({
      type: question.type,
      text: question.text,
      test_id: testId
    });
    for (const answer of question.answers) {
      await Answer.create({
        answer: answer.answer,
        is_right_answer: answer.is_right_answer,
        question_id: createdQuestion.id
      });
    }
  }
};

module.exports = {
  saveQuestions
};
