import {
  ADD_ANSWER,
  DELETE_ANSWER,
  DELETE_TEST_FROM_REDUCER,
  RESET_TEST,
  SET_TEST,
  SET_TESTS, TEST_CREATED
} from "../constants";
import produce from "immer";

export const initialState = {
  test: {
    title: "",
    questions: []
  },
  loaded: false,
  created: false,
};

export const testReducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_TEST:
      action.test.questions = action.test.questions.map(question => {
        if (question.type === "single")
          question.right_answer = question.answers.find(
            answer => answer.is_right_answer === true
          ).answer;
        else if (question.type === "multiple")
          question.right_answer = question.answers
            .filter(answer => answer.is_right_answer)
            .map(elem => elem.answer);
        return question;
      });
      console.log(action.test.questions);

      draft.test = action.test;
      draft.loaded = true;
      break;
    case RESET_TEST:
      draft.test = initialState.test;
      draft.loaded = false;
      break;
    case TEST_CREATED:
      draft.created = true;
      debugger
      break;
    default:
      return draft;
  }
});
