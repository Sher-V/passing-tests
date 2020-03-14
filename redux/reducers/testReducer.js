import { DELETE_TEST_FROM_REDUCER, SET_TEST, SET_TESTS } from "../constants";
import produce from "immer";

export const initialState = {
  test: {
    name: "",
    questions: []
  }
};

export const testReducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_TEST:
      debugger
      draft.test.questions = action.test;
      break;
    default:
      return draft;
  }
});
