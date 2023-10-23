import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import {
  GET_INTERFACE_DATA,
  UPDATE_INTERFACE_CONFIG_DATA,
  GET_INTERFACE_CONFIG_DATA,
  OCNOS_ISIS_GET_ACTION_TYPE
} from "./actionTypes";
import {
  getInterfaceDataSuccess,
  getInterfaceDataFail,
  updateInterfaceConfigDataSuccess,
  updateInterfaceConfigDataFail,
  getInterfaceConfigDataFail,
  getInterfaceConfigDataSuccess,
  getISISDataSuccess,
  getISISDataFail
} from "./action";

import {
  getInterfacesData,
  updateInteterfacesData,
  getInterfaceConfigData,
  getISISDataHelper
} from "../../helpers/backend_helper";

// INTERFACES LIST

function* fetchInterfaceDataById(deviceId) {
  try {
    const response = yield call(getInterfacesData, deviceId.payload);
    yield put(getInterfaceDataSuccess(response));
  } catch (error) {
    yield put(getInterfaceDataFail(error));
  }
}

export function* watchInterfaceData() {
  yield takeEvery(GET_INTERFACE_DATA, fetchInterfaceDataById);
}

function* updateInterfaceConfigData(interfaceConfigData) {
  try {
    const response = yield call(
      updateInteterfacesData,
      interfaceConfigData.payload
    );
    yield put(updateInterfaceConfigDataSuccess(response));
    if (response.statusCode == 200)
      toast.success("Successfully applied interface configuration");
    else
      toast.error("Failed to update interface config data", {
        position: toast.POSITION.TOP_RIGHT,
      });
  } catch (error) {
    yield put(updateInterfaceConfigDataFail(error));
    toast.error("Failed to update interface config data", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function* watchInterfaceConfigData() {
  yield takeEvery(UPDATE_INTERFACE_CONFIG_DATA, updateInterfaceConfigData);
}

function* getInterfaceConfigDatum(interfaceConfigData) {
  try {
    const response = yield call(
      getInterfaceConfigData,
      interfaceConfigData.payload
    );
    yield put(getInterfaceConfigDataSuccess(response));
  } catch (error) {
    yield put(getInterfaceConfigDataFail(error));
  }
}

export function* watchGetInterfaceConfigData() {
  yield takeEvery(GET_INTERFACE_CONFIG_DATA, getInterfaceConfigDatum);
}

function* GetISISData(deviceId) {
  try {
    console.log(deviceId);
    const response = yield call(getISISDataHelper, deviceId.payload);
    console.log(response);
    yield put(getISISDataSuccess(response));
  } catch (error) {
    yield put(getISISDataFail(error));
  }
}

export function* watchISISData() {
  yield takeEvery(OCNOS_ISIS_GET_ACTION_TYPE, GetISISData);
}
function* getInterfaceSaga() {
  yield all([fork(watchInterfaceData)]);
  yield all([fork(watchInterfaceConfigData)]);
  yield all([fork(watchGetInterfaceConfigData)]);
  yield all([fork(watchISISData)]);

}

export default getInterfaceSaga;
