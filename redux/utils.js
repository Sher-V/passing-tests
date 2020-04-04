export const transformSingleQuestions = data => {
  const transformedData = { ...data };
  transformedData.questions = transformedData.questions.map(question => {
    const unFrozenQuestion = {};
    for (let i in question) {
      unFrozenQuestion[i] = question[i];
    }
    if (question.type === "single") {
      unFrozenQuestion.answers = unFrozenQuestion.answers.map(answer => {
        const unFrozenAnswer = {};
        for (let i in answer) {
          unFrozenAnswer[i] = answer[i];
        }
        if (unFrozenAnswer.answer === unFrozenQuestion.right_answer) {
          unFrozenAnswer.is_right_answer = true;
        } else unFrozenAnswer.is_right_answer = false;
        return unFrozenAnswer;
      });
      delete unFrozenQuestion.right_answer;
    }
    return unFrozenQuestion;
  });
  return transformedData;
};
