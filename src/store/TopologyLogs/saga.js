import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DELETE_ALL_DEVICES_ALARMS_EVENTS, GET_ALARMS_DATA, GET_SYSLOG_DATA, POST_ALARM_EVENTS_DATA, POST_ALARM_EVENTS_DEVICE_DATA, POST_ALARM_EVENTS_LATEST5_DATA, POST_LOGS_DATA_ACTION_TYPE, GET_ALARMS_EVENT_DATA_ACTION, DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS, DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS } from "./actionTypes";
import { getAlarmsDataSuccess, getAlarmsDataFail, getsyslogdatasuccess, getsyslogdatafail, deletealldevicesalarmseventsfail, deletealldevicesalarmseventssuccess, postalarmeventdatafail, postalarmeventdatasuccess, postdevicealarmeventdatafail, postdevicealarmeventdatasuccess, getAlarmsEventDataSuccess, getAlarmsEventDataFail, postlatestalarmeventdatasuccess, postlatestalarmeventdatafail, deleteparticulardevicesalarmseventssuccess, deleteparticulardevicesalarmseventsfail, deleteparticulardeviceallalarmseventsfail, deleteparticulardeviceallalarmseventssuccess, postLogsDataSuccess, postLogsDataFail } from "./action";

import { getAlarmsData, getSysLogData, PostAlarmEventsHeper, DeleteAllDeviceAlarmsHelper, PostDeviceAlarmEventsHeper, getAlarmsEventsDataHelper, PostLatestAlarmEventsHeper, DeleteParticularAlarmsHelper, DeleteParticularDeviceAllAlarmsHelper, PostDeviceLogsHeper } from "../../helpers/backend_helper";

// TOPOLOGY LOGS CONFIGURATION

function* fetchAlarmsData() {
  try {
    const response = yield call(getAlarmsData);
    yield put(getAlarmsDataSuccess(response));
  } catch (error) {
    yield put(getAlarmsDataFail(error));
  }
}

function* fetchSysLogData() {
  try {
    const response = yield call(getSysLogData);

    yield put(getsyslogdatasuccess(response));
  } catch (error) {
    yield put(getsyslogdatafail(error));
  }
}


function* getalarmeventData() {
  try {
    const response = yield call(getAlarmsEventsDataHelper);

    yield put(getAlarmsEventDataSuccess(response));
  } catch (error) {
    yield put(getAlarmsEventDataFail(error));
  }
}


function* PostAlarmSaga(pageNo) {
  try {
    const response = yield call(PostAlarmEventsHeper, pageNo);
    yield put(postalarmeventdatasuccess(response));
  } catch (error) {
    yield put(postalarmeventdatafail(error));
  }
}

function* PostDeviceAlarmSaga(pageNo) {
  try {
    const response = yield call(PostDeviceAlarmEventsHeper, pageNo);
    yield put(postdevicealarmeventdatasuccess(response));
  } catch (error) {
    yield put(postdevicealarmeventdatafail(error));
  }
}
function* PostDeviceLogsSaga(pageNo) {
  try {
    const response = yield call(PostDeviceLogsHeper, pageNo);
    yield put(postLogsDataSuccess(response));
  } catch (error) {
    yield put(postLogsDataFail(error));
  }
}

function* PostLatestAlarmSaga(pageNo) {
  try {
    const response = yield call(PostLatestAlarmEventsHeper, pageNo);
    yield put(postlatestalarmeventdatasuccess(response));
  } catch (error) {
    yield put(postlatestalarmeventdatafail(error));
  }
}

function* DeleteAllDevicesAlarmsEventsSaga() {
  try {
    const response = yield call(DeleteAllDeviceAlarmsHelper);
    yield put(deletealldevicesalarmseventssuccess(response));
  } catch (error) {
    yield put(deletealldevicesalarmseventsfail(error));
  }
}

function* DeleteParticularAlarmsEventsSaga(pageNo) {
  try {
    const response = yield call(DeleteParticularAlarmsHelper, pageNo.payload);

    if (response.success) {
      yield put(deleteparticulardevicesalarmseventssuccess(response.data));
    } else {
      yield put(deleteparticulardevicesalarmseventsfail(response.error));
    }
  } catch (error) {
    yield put(deleteparticulardevicesalarmseventsfail(error));
  }
}

function* DeleteParticularDeviceAllAlarmsEventsSaga(pageNo) {
  try {
    const response = yield call(DeleteParticularDeviceAllAlarmsHelper, pageNo);
    yield put(deleteparticulardeviceallalarmseventssuccess(response));
  } catch (error) {
    yield put(deleteparticulardeviceallalarmseventsfail(error));
  }
}

export function* watchAlarmsData() {
  yield takeEvery(GET_ALARMS_DATA, fetchAlarmsData);
}

export function* watchSysLogData() {
  yield takeEvery(GET_SYSLOG_DATA, fetchSysLogData);
}

export function* watchalarmeventData() {
  yield takeEvery(GET_ALARMS_EVENT_DATA_ACTION, getalarmeventData);
}

export function* watchpostalarmseventdata() {
  yield takeEvery(POST_ALARM_EVENTS_DATA, PostAlarmSaga)
}

export function* watchpostdevicealarmseventdata() {
  yield takeEvery(POST_ALARM_EVENTS_DEVICE_DATA, PostDeviceAlarmSaga)
}

export function* watchpostdeviceLogsdata() {
  yield takeEvery(POST_LOGS_DATA_ACTION_TYPE, PostDeviceLogsSaga)
}

export function* watchpostlatestalarmseventdata() {
  yield takeEvery(POST_ALARM_EVENTS_LATEST5_DATA, PostLatestAlarmSaga)
}

export function* watchdeleteAllDevicesAllAlarmsEvents() {
  yield takeEvery(DELETE_ALL_DEVICES_ALARMS_EVENTS, DeleteAllDevicesAlarmsEventsSaga);
}

export function* watchdeleteParticularAlarmsEvents() {
  yield takeEvery(DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS, DeleteParticularAlarmsEventsSaga);
}

export function* watchdeleteAllDevicesParticularAlarmsEvents() {
  yield takeEvery(DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS, DeleteParticularDeviceAllAlarmsEventsSaga);
}

function* getAlarmSaga() {
  yield all([fork(watchAlarmsData)]);
  yield all([fork(watchSysLogData)]);
  yield all([fork(watchpostdevicealarmseventdata)]);
  yield all([fork(watchpostalarmseventdata)]);
  yield all([fork(watchpostdeviceLogsdata)]);
  yield all([fork(watchdeleteAllDevicesAllAlarmsEvents)]);
  yield all([fork(watchdeleteParticularAlarmsEvents)]);
  yield all([fork(watchdeleteAllDevicesParticularAlarmsEvents)]);
  yield all([fork(watchpostlatestalarmseventdata)]);
}

export default getAlarmSaga;