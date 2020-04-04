import {
  call,
  put,
  takeEvery,
  takeLatest,
  all
} from "@redux-saga/core/effects";
import * as axios from "axios";
import {
  deleteTestFromReducer,
  setTest,
  setTestError,
  setTestLoading,
  setTests,
  setTestsError,
  setTestsLoading
} from "./actions";
import {
  CREATE_TEST,
  DELETE_TEST,
  GET_TEST,
  GET_TESTS,
  SAVE_TEST,
  UPDATE_TEST
} from "./constants";
import { transformSingleQuestions } from "./utils";

const API = {
  fetchTests: () => axios.get("http://localhost:3000/tests"),
  deleteTest: id => axios.delete(`http://localhost:3000/tests/${id}`),
  fetchTest: id => axios.get(`http://localhost:3000/tests/${id}`),
  updateTest: data => axios.put(`http://localhost:3000/tests`, data),
  createTest: data => axios.post(`http://localhost:3000/tests`, data)
};

function* getTests() {
  try {
    yield put(setTestsLoading());
    const response = yield call(API.fetchTests);
    const tests = response.data;
    yield put(setTests(tests));
  } catch (e) {
    yield put(setTestsError());
  }
}

function* deleteTest(action) {
  try {
    const response = yield call(API.deleteTest, action.id);
    if (response.status === 200) yield put(deleteTestFromReducer(action.id));
  } catch (e) {
    yield put(setTestsError());
  }
}

function* getTest(action) {
  try {
    yield put(setTestLoading());
    const response = yield call(API.fetchTest, action.id);
    const test = response.data;
    yield put(setTest(test));
  } catch (e) {
    yield put(setTestError());
  }
}

function* updateTest(action) {
  const data = transformSingleQuestions(action.fields);
  try {
    yield call(API.updateTest, data);
    yield put({ type: "TEST_CREATED" });
  } catch (e) {
    yield put(setTestError());
  }
}

function* createTest(action) {
  const data = transformSingleQuestions(action.fields);
  try {
    yield call(API.createTest, data);
    yield put({ type: "TEST_CREATED" });
  } catch (e) {
    yield put(setTestError());
  }
}

export function* rootSaga() {
  yield all([
    yield takeLatest(GET_TESTS, getTests),
    yield takeEvery(DELETE_TEST, deleteTest),
    yield takeLatest(GET_TEST, getTest),
    yield takeLatest(UPDATE_TEST, updateTest),
    yield takeLatest(CREATE_TEST, createTest)
  ]);
}
