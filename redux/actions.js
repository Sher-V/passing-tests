import {
  DELETE_TEST,
  DELETE_TEST_FROM_REDUCER,
  GET_TEST,
  GET_TESTS,
  SAVE_TEST,
  SET_TEST,
  SET_TESTS
} from "./constants";

export const setTests = tests => ({ type: SET_TESTS, tests });
export const deleteTestFromReducer = id => ({
  type: DELETE_TEST_FROM_REDUCER,
  id
});
export const setTest = test => ({ type: SET_TEST, test });

// sagas action creators
export const getTests = () => ({ type: GET_TESTS });
export const deleteTest = id => ({ type: DELETE_TEST, id });

export const getTest = id => ({ type: GET_TEST, id });
export const saveTest = (fields) =>{ debugger; return  { type: SAVE_TEST, fields}};
