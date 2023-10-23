import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  GET_OPTICAL_MONITOR_DATA_FAIL,
  GET_OPTICAL_MONITOR_DATA_SUCCESS,
  GET_OPTICAL_MONITOR_DATA,
} from "./actionTypes";

import {
  getOpticalMonitorDataFail,
  getOpticalMonitorDataSuccess,
} from "./action";
import { getOpticalMonitorData } from "../../helpers/backend_helper";

function* fetchOpticalMonitorDataById({ payload: { deviceId, filterBy } }) {
  try {
    const response = yield call(getOpticalMonitorData, deviceId, filterBy);
    yield put(getOpticalMonitorDataSuccess(response));
  } catch (error) {
    yield put(getOpticalMonitorDataFail(error));
  }
}

export function* watchOpticalMonitorData() {
  yield takeEvery(GET_OPTICAL_MONITOR_DATA, fetchOpticalMonitorDataById);
}

function* getOpticalMonitorSaga() {
  yield all([fork(watchOpticalMonitorData)]);
}

export default getOpticalMonitorSaga;
