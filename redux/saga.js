import {
  call,
  put,
  takeEvery,
  takeLatest,
  all
} from "@redux-saga/core/effects";
import * as axios from "axios";
import { deleteTestFromReducer, setTest, setTests } from "./actions";
import { DELETE_TEST, GET_TEST, GET_TESTS, SAVE_TEST } from "./constants";

const API = {
  fetchTests: () => axios.get("http://localhost:3000/tests"),
  deleteTest: id => axios.delete(`http://localhost:3000/tests/${id}`),
  fetchTest: id => axios.get(`http://localhost:3000/tests/${id}`),
  updateTest: data =>
    axios.put(`http://localhost:3000/tests`, {
      data
    })
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

function* saveTest(action) {
  console.log(action)
  debugger
  action.fields.questions.forEach(question => {
    if (question.type === "single")
      question.answers.forEach(answer => {
        debugger
        if (answer.answer === question.right_answer)
          answer.is_right_answer = true;
        else answer.is_right_answer = false;
      });
  });
  console.log(action)
  try {
    //const response = yield call(API.updateTest);
    //yield put();
  } catch (e) {}
}

export function* rootSaga() {
  yield all([
    yield takeLatest(GET_TESTS, getTests),
    yield takeEvery(DELETE_TEST, deleteTest),
    yield takeLatest(GET_TEST, getTest),
    yield takeLatest(SAVE_TEST, saveTest)
  ]);
}
