import {DELETE_TEST_FROM_REDUCER, SET_TESTS, TESTS_ERROR, TESTS_LOADING} from "../constants";
import produce from "immer";

export const initialState = {
  tests: [],
  loading: false,
  error: false
};

export const reducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_TESTS:
      draft.tests = action.tests;
      draft.loading = false;
      break;
    case DELETE_TEST_FROM_REDUCER:
      const index = draft.tests.findIndex(test => test.id === action.id);
      draft.tests.splice(index, 1);
      break;
    case TESTS_LOADING:
      draft.loading = true;
      break;
    case TESTS_ERROR:
      draft.loading = false;
      draft.error = true;
      break;
    default:
      return draft;
  }
});

