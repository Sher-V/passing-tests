import {
  ADD_ANSWER,
  DELETE_ANSWER,
  DELETE_TEST_FROM_REDUCER,
  RESET_TEST,
  SET_TEST,
  SET_TESTS,
  TEST_CREATED,
  TEST_ERROR,
  TEST_LOADING
} from "../constants";
import produce from "immer";

export const initialState = {
  test: {
    title: "",
    questions: []
  },
  loading: false,
  loaded: false,
  error: false,
  created: false
};

export const testReducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_TEST:
      action.test.questions = action.test.questions.map(question => {
        if (question.type === "single")
          question.right_answer = question.answers.find(
            answer => answer.is_right_answer === true
          ).answer;
        return question;
      });
      draft.loading = false;
      draft.error = false;
      draft.test = action.test;
      draft.loaded = true;
      break;
    case RESET_TEST:
      draft.test = initialState.test;
      draft.loading = false;
      draft.loaded = false;
      draft.error = false;
      draft.created = false;
      break;
    case TEST_LOADING:
      draft.loading = true;
      break;
    case TEST_ERROR:
      draft.loading = false;
      draft.error = true;
      break;
    case TEST_CREATED:
      draft.created = true;
      break;
    default:
      return draft;
  }
});
