import {
  ADD_ANSWER,
  CREATE_TEST,
  DELETE_ANSWER,
  DELETE_TEST,
  DELETE_TEST_FROM_REDUCER,
  GET_TEST,
  GET_TESTS,
  RESET_TEST,
  SAVE_TEST,
  SET_TEST,
  SET_TESTS, TEST_ERROR,
  TEST_LOADING, TESTS_ERROR, TESTS_LOADING,
  UPDATE_TEST
} from "./constants";

export const setTests = tests => ({ type: SET_TESTS, tests });
export const deleteTestFromReducer = id => ({
  type: DELETE_TEST_FROM_REDUCER,
  id
});
export const setTest = test => ({ type: SET_TEST, test });
export const resetTest = () => ({ type: RESET_TEST });
export const setTestLoading = () => ({ type: TEST_LOADING });
export const setTestError = () => ({type: TEST_ERROR})

export const setTestsError = () => ({type: TESTS_ERROR})
export const setTestsLoading = () => ({type: TESTS_LOADING})

// sagas action creators
export const getTests = () => ({ type: GET_TESTS });
export const deleteTest = id => ({ type: DELETE_TEST, id });

export const getTest = id => ({ type: GET_TEST, id });
export const saveTest = fields => ({ type: SAVE_TEST, fields });

export const createTest = fields => ({ type: CREATE_TEST, fields });
export const updateTest = fields => ({ type: UPDATE_TEST, fields });
