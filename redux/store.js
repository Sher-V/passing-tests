import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./reducers/reducer";
import { rootSaga } from "./saga";
import { reducer as formReducer } from "redux-form";
import {testReducer} from "./reducers/testReducer";

const rootReducer = combineReducers({
  reducer,
  testReducer,
  form: formReducer
});

export const makeStore = (initialState, { isServer, req = null }) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }
  return store;
};

export default makeStore;
