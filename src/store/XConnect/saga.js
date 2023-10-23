import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// Login Redux States
import {
  GET_INTERFACES_CONFIG_DATA,
  SET_INTERFACES_CONFIG_DATA,
  GET_X_CONNECT_CONFIG_DATA,
  SET_X_CONNECT_CONFIG_DATA,
  DELETE_X_CONNECT_CONFIG_DATA,
} from "./actionTypes";

import {
  // Interface GET
  getInterfaceConfigData,
  getInterfaceConfigSuccess,
  getInterfaceConfigFail,
  // Interface SET
  setInterfaceConfigData,
  setInterfaceConfigFail,
  setInterfaceConfigSuccess,
  // X-Connect GET
  getXConnectConfigSuccess,
  getXConnectConfigFail,
  // X-Connect SET
  setXConnectConfigSuccess,
  setXConnectConfigFail,
  // X-Connect DELETE
  deleteXConnectConfigSuccess,
  deleteXConnectConfigFail,
} from "./action";

import {
  getXConnectInterfaceData,
  setXConnectInterfaceData,
  getXConnectData,
  setXConnectData,
  deleteXConnectData,
} from "../../helpers/backend_helper";

// Interface configuration

function* fetchInterfaceData(deviceId) {
  try {
    const response = yield call(getXConnectInterfaceData, deviceId.payload);
    yield put(getInterfaceConfigSuccess(response));
  } catch (error) {
    yield put(getInterfaceConfigFail(error));
  }
}
function* setInterfaceData({ payload: data }) {
  try {
    const response = yield call(setXConnectInterfaceData, data);
    yield put(setInterfaceConfigSuccess(response));
  } catch (error) {
    yield put(setInterfaceConfigFail(error));
  }
}
export function* watchFetchInterfaceData() {
  yield takeEvery(GET_INTERFACES_CONFIG_DATA, fetchInterfaceData);
}
export function* watchSetInterfaceData() {
  yield takeEvery(SET_INTERFACES_CONFIG_DATA, setInterfaceData);
}

// X-Connect Configuration

// Interface configuration

function* fetchXConnectData(deviceId) {
  try {
    const response = yield call(getXConnectData, deviceId.payload);
    yield put(getXConnectConfigSuccess(response));
    toast.success("Xconnect config fetch successful");
  } catch (error) {
    yield put(getXConnectConfigFail(error));
    toast.error("Xconnect config fetch failed");
  }
}

function* createXConnectData({ payload: data }) {
  try {
    const response = yield call(setXConnectData, data);
    yield put(setXConnectConfigSuccess(response));
    if (response.statusCode == 200)
      toast.success("Xconnect config update successfully");
    else toast.error("Xconnect config update failed");
  } catch (error) {
    yield put(setXConnectConfigFail(error));
    toast.error("Xconnect config update failed");
  }
}

function* removeXConnectData(removingEdgeInfo) {
  try {
    const response = yield call(deleteXConnectData, removingEdgeInfo.payload);
    toast.success("Xconnect config update successfully");
    yield put(deleteXConnectConfigSuccess(response));
  } catch (error) {
    yield put(deleteXConnectConfigFail(error));
    toast.error("Xconnect config update failed");
  }
}

export function* watchFetchXConnectData() {
  yield takeEvery(GET_X_CONNECT_CONFIG_DATA, fetchXConnectData);
}
export function* watchSetXConnectData() {
  yield takeEvery(SET_X_CONNECT_CONFIG_DATA, createXConnectData);
}
export function* watchDeleteXConnectData() {
  yield takeEvery(DELETE_X_CONNECT_CONFIG_DATA, removeXConnectData);
}

function* getXConnectSaga() {
  // X-Connect Interfaces
  yield all([fork(watchSetInterfaceData)]);
  yield all([fork(watchFetchInterfaceData)]);
  // X-Connect Map Configuration
  yield all([fork(watchSetXConnectData)]);
  yield all([fork(watchFetchXConnectData)]);
  yield all([fork(watchDeleteXConnectData)]);
}

export default getXConnectSaga;
