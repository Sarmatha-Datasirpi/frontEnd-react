import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import { GET_DASHBOARD_DATA } from "./actionTypes";
import { getDashboardDataSuccess, getDashboardDataFail } from "./action";

import { getDashboardData } from "../../helpers/backend_helper";

// INTERFACES LIST

function* fetchDashboardData() {
  console.log("Inside SAGA.");
  try {
    const response = yield call(getDashboardData);
    yield put(getDashboardDataSuccess(response));
  } catch (error) {
    yield put(getDashboardDataFail(error));
  }
}

export function* watchDashboardData() {
  yield takeEvery(GET_DASHBOARD_DATA, fetchDashboardData);
}

function* getDashboardSaga() {
  yield all([fork(watchDashboardData)]);
}

export default getDashboardSaga;
