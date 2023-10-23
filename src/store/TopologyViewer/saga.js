import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GET_NODES_DATA, GET_EDGES_DATA } from "./actionTypes";
import {
  getNodesDataSuccess,
  getNodesDataFail,
  getEdgesDataSuccess,
  getEdgesDataFail,
} from "./action";

import { getNodesData, getEdgesData } from "../../helpers/backend_helper";

// TOPOLOGY VIEWER CONFIGURATION

function* fetchNodesData() {
  try {
    const response = yield call(getNodesData);
    yield put(getNodesDataSuccess(response));
  } catch (error) {
    yield put(getNodesDataFail(error));
  }
}

function* fetchEdgesData() {
  try {
    const response = yield call(getEdgesData);
    yield put(getEdgesDataSuccess(response));
  } catch (error) {
    yield put(getEdgesDataFail(error));
  }
}

export function* watchNodesData() {
  yield takeEvery(GET_NODES_DATA, fetchNodesData);
}
export function* watchEdgeNodesData() {
  yield takeEvery(GET_EDGES_DATA, fetchEdgesData);
}

function* getMapSaga() {
  yield all([fork(watchNodesData)]);
  yield all([fork(watchEdgeNodesData)]);
}

export default getMapSaga;
