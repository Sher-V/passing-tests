import { DELETE_TEST_FROM_REDUCER, SET_TESTS } from "../constants";
import produce from "immer";

export const initialState = {
  tests: [],
  value: 10
};

export const reducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_TESTS:
      draft.tests = action.tests;
      break;
    case DELETE_TEST_FROM_REDUCER:
      const index = draft.tests.findIndex(test => test.id === action.id);
      draft.tests.splice(index, 1);
      break;

    default:
      return draft;
  }
});

