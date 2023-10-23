import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  GET_DEVICES_DATA,
  DELETE_DEVICES_DATA,
  GET_DEVICE_PROCESS_INFO,
  GET_DEVICE_SYSTEM_INFO,
  GET_DEVICE_STATS_INFO,
  DELETE_DEVICE_STATS_INFO,
  SET_DEVICE_HISTORICAL_INFO,
  GET_DEVICE_CUSTUM_GRAPH_LIST,
  CREATE_CUSTUM_FIELD_BY_OID_INFO,
  GET_OID_LIST,
  DELETE_OID_LIST,
  SET_DEVICE_POLLING_INTERVAL,
  SET_DEVICE_PROCESS_INTERVAL,
  UPDATE_DEVICE_SETTING,
  SET_DEVICE_POLLING,
  GET_DEVICE_POLLING,
  GET_DEVICE_CREDENTIALS,
  VERIFY_LICENSE,
  REBOOT_DEVICE,
  REGISTER_DEVICE_ACTION_TYPE,
  SYSLOG_DEVICE_ACTION_TYPE
} from "./actionTypes";
import {
  getDevicesDataSuccess,
  getDevicesDataFail,
  deleteDevicesDataSuccess,
  deleteDevicesDataFail,
  getDeviceProcessInfoSuccess,
  getDeviceProcessInfoFail,
  getDeviceSystemInfoSuccess,
  getDeviceSystemInfoFail,
  getDeviceStatsInfoSuccess,
  getDeviceStatsInfoFail,
  deleteDeviceStatsInfoSuccess,
  deleteDeviceStatsInfoFail,
  setDeviceHistoricalInfoSuccess,
  setDeviceHistoricalInfoFail,
  getDeviceCustumGraphListSuccess,
  getDeviceCustumGraphListFail,
  createCustumFieldSuccess,
  createCustumFieldFail,
  getOidListSuccess,
  getOidListFail,
  deleteOidListDataSuccess,
  deleteOidListDataFail,

  setDevicePollingIntervalSuccess,
  setDevicePollingIntervalFail,
  setDeviceProcessIntervalFail,
  setDeviceProcessIntervalSuccess,
  updateDeviceSettingSuccess,
  updateDeviceSettingFail,
  setDevicePollingFail,
  setDevicePollingSuccess,
  getDevicePollingSuccess,
  getDevicePollingFail,
  getDeviceCredentialsSuccess,
  getDeviceCredentialsFail,
  verifyLicenseKeySuccess,
  verifyLicenseKeyFail,
  rebootDeviceSuccess,
  rebootDeviceFail,
  registerDeviceSuccessaction,
  registerDeviceFailaction,
  syslogDeviceSuccessaction,
  syslogDeviceFailaction
} from "./action";

import {
  getDevicesData,
  deleteDevicesData,
  getDeviceProcessInfo,
  getDeviceSystemInfo,
  getDeviceStatsInfo,
  deleteDeviceStatsInfo,
  setDeviceHistoricalInfo,
  getDeviceCustumGraphList,
  CreateCustumField,
  getOidList,
  deleteOidList,
  setDevicePollingInterval,
  setDeviceProcessInterval,
  updateDeviceSetting,
  setDevicePolling,
  getDevicePolling,
  getDeviceCredentials,
  verifyLicenseKey,
  rebootDevice,
  RegisterDeviceHelper,
  SyslogDeviceMgmtIPHelper
} from "../../helpers/backend_helper";

// TOPOLOGY VIEWER CONFIGURATION

function* fetchDevicesData() {
  try {
    const response = yield call(getDevicesData);
    yield put(getDevicesDataSuccess(response));
  } catch (error) {
    yield put(getDevicesDataFail(error));
  }
}

export function* watchDevicesData() {
  yield takeEvery(GET_DEVICES_DATA, fetchDevicesData);
}

function* removeDevicesData(deviceIds) {
  try {
    const response = yield call(deleteDevicesData(deviceIds));
    yield put(deleteDevicesDataSuccess(response));
  } catch (error) {
    yield put(deleteDevicesDataFail(error));
  }
}

export function* watchDeleteDevicesData() {
  yield takeEvery(DELETE_DEVICES_DATA, removeDevicesData);
}

function* updateDeviceSettingInfo(deviceInfo) {
  try {
    const response = yield call(updateDeviceSetting(deviceInfo.payload));
    yield put(updateDeviceSettingSuccess(response));
  } catch (error) {
    yield put(updateDeviceSettingFail(error));
  }
}

export function* watchDeviceSettingInfo() {
  yield takeEvery(UPDATE_DEVICE_SETTING, updateDeviceSettingInfo);
}

function* getDeviceProcess({ payload: { deviceid, filterby } }) {
  try {
    const response = yield call(getDeviceProcessInfo, deviceid, filterby);
    yield put(getDeviceProcessInfoSuccess(response));
  } catch (error) {
    yield put(getDeviceProcessInfoFail(error));
  }
}

export function* watchgetDeviceProcess() {
  yield takeEvery(GET_DEVICE_PROCESS_INFO, getDeviceProcess);
}

function* getDeviceSystem({ payload: deviceid }) {
  try {
    const response = yield call(getDeviceSystemInfo, deviceid);
    yield put(getDeviceSystemInfoSuccess(response));
  } catch (error) {
    yield put(getDeviceSystemInfoFail(error));
  }
}

export function* watchgetDeviceSystem() {
  yield takeEvery(GET_DEVICE_SYSTEM_INFO, getDeviceSystem);
}

function* getDeviceStats({ payload: deviceid }) {
  try {
    const response = yield call(getDeviceStatsInfo, deviceid);
    yield put(getDeviceStatsInfoSuccess(response));
  } catch (error) {
    yield put(getDeviceStatsInfoFail(error));
  }
}

function* deleteDeviceStats({ payload: deviceid }) {
  try {
    const response = yield call(deleteDeviceStatsInfo, deviceid);
    yield put(deleteDeviceStatsInfoSuccess(response));
  } catch (error) {
    yield put(deleteDeviceStatsInfoFail(error));
  }
}

export function* watchdeleteDeviceStats() {
  yield takeEvery(DELETE_DEVICE_STATS_INFO, deleteDeviceStats);
}

export function* watchgetDeviceStats() {
  yield takeEvery(GET_DEVICE_STATS_INFO, getDeviceStats);
}


function* setDeviceHistorical({ payload: data }) {
  try {
    const response = yield call(setDeviceHistoricalInfo, data);
    yield put(setDeviceHistoricalInfoSuccess(response));
  } catch (error) {
    yield put(setDeviceHistoricalInfoFail(error));
  }
}

export function* watchsetDeviceHistoricalInfo() {
  yield takeEvery(SET_DEVICE_HISTORICAL_INFO, setDeviceHistorical);
}


function* getDeviceCustumGraphData({ payload: deviceid }) {
  try {
    const response = yield call(getDeviceCustumGraphList, deviceid);
    yield put(getDeviceCustumGraphListSuccess(response));
  } catch (error) {
    yield put(getDeviceCustumGraphListFail(error));
  }
}

export function* watchgetDeviceCustumGraphList() {
  yield takeEvery(GET_DEVICE_CUSTUM_GRAPH_LIST, getDeviceCustumGraphData);
}


function* createCustumFieldByOID({ payload: data }) {
  try {
    const response = yield call(CreateCustumField, data);
    yield put(createCustumFieldSuccess(response));
  } catch (error) {
    yield put(createCustumFieldFail(error));
  }
}

export function* watchcreateCustumFieldByOID() {
  yield takeEvery(CREATE_CUSTUM_FIELD_BY_OID_INFO, createCustumFieldByOID);
}

function* getOidListData({ payload: deviceid }) {
  try {
    const response = yield call(getOidList, deviceid);
    yield put(getOidListSuccess(response));
  } catch (error) {
    yield put(getOidListFail(error));
  }
}

export function* watchgetOidList() {
  yield takeEvery(GET_OID_LIST, getOidListData);
}

function* removeOidData(data) {
  try {
    const response = yield call(deleteOidList(data.payload));
    yield put(deleteOidListDataSuccess(response));
  } catch (error) {
    yield put(deleteOidListDataFail(error));
  }
}

export function* watchDeleteOidData() {
  yield takeEvery(DELETE_OID_LIST, removeOidData);
}


// set polling interval 

function* setDevicePollingIntervalData({ payload: data }) {
  try {
    const response = yield call(setDevicePollingInterval, data);
    yield put(setDevicePollingIntervalSuccess(response));
  } catch (error) {
    yield put(setDevicePollingIntervalFail(error));
  }
}

export function* watchSetDevicePollingInterval() {
  yield takeEvery(SET_DEVICE_POLLING_INTERVAL, setDevicePollingIntervalData);
}

// set process interval 

function* setDeviceProcessIntervalData({ payload: data }) {
  try {
    const response = yield call(setDeviceProcessInterval, data);
    yield put(setDeviceProcessIntervalSuccess(response));
  } catch (error) {
    yield put(setDeviceProcessIntervalFail(error));
  }
}

export function* watchSetDeviceProcessInterval() {
  yield takeEvery(SET_DEVICE_PROCESS_INTERVAL, setDeviceProcessIntervalData);
}

// SET Device Polling 

function* setDevicePollingData({ payload: data }) {
  try {
    const response = yield call(setDevicePolling, data);
    yield put(setDevicePollingSuccess(response));
  } catch (error) {
    yield put(setDevicePollingFail(error));
  }
}

export function* watchSetDevicePolling() {
  yield takeEvery(SET_DEVICE_POLLING, setDevicePollingData);
}

// GET Device Polling 

function* getDevicePollingData({ payload: data }) {
  try {
    const response = yield call(getDevicePolling, data);
    yield put(getDevicePollingSuccess(response));
  } catch (error) {
    yield put(getDevicePollingFail(error));
  }
}

export function* watchGetDevicePolling() {
  yield takeEvery(GET_DEVICE_POLLING, getDevicePollingData);
}

// GET Device Credentials 

function* getDeviceCredentialsData({ payload: data }) {
  try {
    const response = yield call(getDeviceCredentials, data);
    yield put(getDeviceCredentialsSuccess(response));
  } catch (error) {
    yield put(getDeviceCredentialsFail(error));
  }
}

export function* watchGetDeviceCredentials() {
  yield takeEvery(GET_DEVICE_CREDENTIALS, getDeviceCredentialsData);
}


function* verifyDeviceLicenseKey({ payload: data }) {
  try {
    const response = yield call(verifyLicenseKey, data);
    yield put(verifyLicenseKeySuccess(response));
  } catch (error) {
    yield put(verifyLicenseKeyFail(error));
  }
}

export function* watchverifyLicenseKey() {
  yield takeEvery(VERIFY_LICENSE, verifyDeviceLicenseKey);
}


function* rebootDeviceData({ payload: data }) {
  try {
    const response = yield call(rebootDevice, data);
    yield put(rebootDeviceSuccess(response));
  } catch (error) {
    yield put(rebootDeviceFail(error));
  }
}

export function* watchDeviceReboot() {
  yield takeEvery(REBOOT_DEVICE, rebootDeviceData);
}

// function* RegisterDeviceSaga({ payload: data }) {
//   try {
//     const response = yield call(RegisterDeviceHelper, data);
//     yield put(registerDeviceSuccessaction(response));
//   } catch (error) {
//     yield put(registerDeviceFailaction(error));
//   }
// }

// export function* watchDeviceRegisterDevice() {
//   yield takeEvery(REGISTER_DEVICE_ACTION_TYPE, RegisterDeviceSaga);
// }


function* RegisterDeviceSaga(deviceIds) {
  try {
    const response = yield call(RegisterDeviceHelper(deviceIds));
    yield put(registerDeviceSuccessaction(response));
  } catch (error) {
    yield put(registerDeviceFailaction(error));
  }
}

export function* watchDeviceRegisterDevice() {
  yield takeEvery(REGISTER_DEVICE_ACTION_TYPE, RegisterDeviceSaga);
}

function* Syslog_Device_MGMT_IPSaga(server_ips) {
  try {
    const response = yield call(SyslogDeviceMgmtIPHelper(server_ips));
    yield put(syslogDeviceSuccessaction(response));
  } catch (error) {
    yield put(syslogDeviceFailaction(error));
  }
}

export function* watchSyslogDevice() {
  yield takeEvery(SYSLOG_DEVICE_ACTION_TYPE, Syslog_Device_MGMT_IPSaga);
}

function* getDevicesSaga() {
  yield all([fork(watchDevicesData)]);
  yield all([fork(watchDeleteDevicesData)]);
  yield all([fork(watchgetDeviceProcess)]);
  yield all([fork(watchgetDeviceSystem)]);
  yield all([fork(watchgetDeviceStats)]);
  yield all([fork(watchdeleteDeviceStats)]);
  yield all([fork(watchsetDeviceHistoricalInfo)]);
  yield all([fork(watchgetDeviceCustumGraphList)]);
  yield all([fork(watchcreateCustumFieldByOID)]);
  yield all([fork(watchgetOidList)]);
  yield all([fork(watchDeleteOidData)]);
  yield all([fork(watchSetDevicePollingInterval)]);
  yield all([fork(watchSetDeviceProcessInterval)]);
  yield all([fork(watchDeviceSettingInfo)]);
  yield all([fork(watchSetDevicePolling)]);
  yield all([fork(watchGetDevicePolling)]);
  yield all([fork(watchGetDeviceCredentials)]);
  yield all([fork(watchverifyLicenseKey)]);
  yield all([fork(watchDeviceReboot)]);
  yield all([fork(watchDeviceRegisterDevice)]);
  yield all([fork(watchSyslogDevice)]);
}

export default getDevicesSaga;
