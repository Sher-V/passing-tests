import { DELETE_TEST_FROM_REDUCER, SET_TEST, SET_TESTS } from "../constants";
import produce from "immer";

export const initialState = {
  test: {
    title: "",
    questions: [],
    answers: []
  }
};

export const testReducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_TEST:
      action.test.questions = action.test.questions.map((question, index) => {
          return {...question, answers: action.test.answers[index]}
        });
      action.test.questions.forEach((question, index) => {
        const right_answer = question.answers.find((answer, index) => answer.is_right_answer === true);
        action.test.questions[index].right_answer = right_answer.answer;
      })
      draft.test = action.test;
      break;
    default:
      return draft;
  }
});
