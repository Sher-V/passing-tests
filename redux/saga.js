import {
  call,
  put,
  takeEvery,
  takeLatest,
  all
} from "@redux-saga/core/effects";
import * as axios from "axios";
import { deleteTestFromReducer, setTest, setTests } from "./actions";
import { DELETE_TEST, GET_TEST, GET_TESTS } from "./constants";

const API = {
  fetchTests: () => axios.get("http://localhost:3000/tests"),
  deleteTest: id => axios.delete(`http://localhost:3000/tests/${id}`),
  fetchTest: id => axios.get(`http://localhost:3000/tests/${id}`)
};

function* getTests() {
  try {
    const response = yield call(API.fetchTests);
    const tests = response.data;

    // success
    yield put(setTests(tests));
  } catch (e) {
    // yield put()
  }
}

function* deleteTest(action) {
  try {
    const response = yield call(API.deleteTest, action.id);
    if (response.status === 200) yield put(deleteTestFromReducer(action.id));
  } catch (e) {}
}

function* getTest(action) {
  try {
    const response = yield call(API.fetchTest, action.id);
    const test = response.data;

    yield put(setTest(test));
  } catch (e) {}
}

export function* rootSaga() {
  yield all([
    yield takeLatest(GET_TESTS, getTests),
    yield takeEvery(DELETE_TEST, deleteTest),
    yield takeLatest(GET_TEST, getTest)
  ]);
}
