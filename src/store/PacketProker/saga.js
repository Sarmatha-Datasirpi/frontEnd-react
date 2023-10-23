import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// Login Redux States
import {
  GET_MAP_CONFIG_DATA,
  SET_MAP_CONFIG_DATA,
  GET_MAP_DATA,
  SET_MAP_DATA,
  UPDATE_MAP_DATA,
  DELETE_MAP_DATA,
  GET_RULE_DATA,
  GET_ONE_RULE_DATA,
  SET_RULE_DATA,
  UPDATE_RULE_DATA,
  DELETE_RULE_DATA,
  GET_PORTCHANNEL_DATA,
  SET_PORTCHANNEL_DATA,
  UPDATE_PORTCHANNEL_DATA,
  DELETE_PORTCHANNEL,
  DELETE_PORTCHANNEL_ALL_MEMBERS,
  DELETE_PORTCHANNEL_PARTICULAR_MEMBERS,
  GET_INTERFACE_COUNT,
  GET_DPBSTAT,
  // Packet Broker Interfaces

  // GET
  GET_PACKET_BROKER_INTERFACES_DATA,
  GET_PACKET_BROKER_INTERFACES_DATA_FAIL,
  GET_PACKET_BROKER_INTERFACES_DATA_SUCCESS,

  // SET
  SET_PACKET_BROKER_INTERFACES_DATA,
  SET_PACKET_BROKER_INTERFACES_DATA_FAIL,
  SET_PACKET_BROKER_INTERFACES_DATA_SUCCESS,
} from "./actionTypes";
import {
  // Map configuration
  getMapConfigSuccess,
  getMapConfigFail,
  setMapConfigSuccess,
  setMapConfigFail,
  // Interfaces
  getInterfacesData,
  getInterfacesDataSuccess,
  getInterfacesDataFail,
  setInterfacesData,
  setInterfacesDataSuccess,
  setInterfacesDataFail,

  // Map
  getMapSuccess,
  getMapFail,
  setMapSuccess,
  setMapFail,
  putMapSuccess,
  putMapFail,
  deleteMapSuccess,
  deleteMapFail,
  // Rule
  getRuleSuccess,
  getRuleFail,
  getOneRuleSuccess,
  getOneRuleFail,
  setRuleSuccess,
  setRuleFail,
  putRuleSuccess,
  putRuleFail,
  deleteRuleSuccess,
  deleteRuleFail,
  // Portchannel
  getPortchannelSuccess,
  getPortchannelFail,
  setPortchannelSuccess,
  setPortchannelFail,
  putPortchannelSuccess,
  putPortchannelFail,
  deletePortchannelSuccess,
  deletePortchannelFail,
  deletePortchannelAllMembersSuccess,
  deletePortchannelAllMembersFail,
  deletePortchannelParticularMembersSuccess,
  deletePortchannelParticularMembersFail,
  // Interfaces
  getInterfacecountSuccess,
  getInterfacecountFail,
  // DPBSTAT
  getDPBSTATSuccess,
  getDPBSTATFail,
} from "./action";

import {
  getMapConfigData,
  setMapConfigData,
  getPacketBrokerInterfacesData,
  setPacketBrokerInterfacesData,
  getMapDataList,
  setMapData,
  putMapData,
  deleteMapData,
  getRuleData,
  getOneRuleData,
  setRuleData,
  putRuleData,
  deleteRuleData,
  getPortchannelData,
  setPortchannelData,
  putPortchannelData,
  deletePortchannelData,
  deletePortchannelallmembers,
  deletePortchannelParticularMembersData,
  getInterfacecountData,
  getDPBSTATData,
} from "../../helpers/backend_helper";

// Map configuration

function* fetchMapData() {
  try {
    const response = yield call(getMapConfigData);
    yield put(getMapConfigSuccess(response));
  } catch (error) {
    yield put(getMapConfigFail(error));
  }
}
function* onSetMapConfigData({ payload: data }) {
  try {
    const response = yield call(setMapConfigData, data);
    yield put(setMapConfigSuccess(response));
    // toast.success("Successfully applied packet broker configuration");
  } catch (error) {
    yield put(setMapConfigFail(error));
    // toast.error("Failed to apply packet broker configuration");
  }
}
export function* watchFetchMapData() {
  yield takeEvery(GET_MAP_CONFIG_DATA, fetchMapData);
}
export function* watchSetMapConfigData() {
  yield takeEvery(SET_MAP_CONFIG_DATA, onSetMapConfigData);
}

// Interface configuration

function* fetchPacketBrokerInterfaceData(deviceId) {
  try {
    const response = yield call(
      getPacketBrokerInterfacesData,
      deviceId.payload
    );
    yield put(getInterfacesDataSuccess(response));
  } catch (error) {
    yield put(getInterfacesDataFail(error));
  }
}
function* createPacketBrokerInterfaceData({ payload: data }) {
  try {
    const response = yield call(setPacketBrokerInterfacesData, data);
    yield put(setInterfacesDataSuccess(response));
  } catch (error) {
    yield put(setInterfacesDataFail(error));
  }
}
export function* watchFetchPacketBrokerInterfaceData() {
  yield takeEvery(
    GET_PACKET_BROKER_INTERFACES_DATA,
    fetchPacketBrokerInterfaceData
  );
}
export function* watchSetPacketBrokerInterfaceData() {
  yield takeEvery(
    SET_PACKET_BROKER_INTERFACES_DATA,
    createPacketBrokerInterfaceData
  );
}

// Map
function* onGetMap() {
  try {
    const response = yield call(getMapDataList);
    yield put(getMapSuccess(response));
  } catch (error) {
    yield put(getMapFail(error));
  }
}
function* onSetMap({ payload: { data } }) {
  try {
    const response = yield call(setMapData, data);
    yield put(setMapSuccess(response));
    // toast.success("Successful applied packet broker configuration");
    if (response.statusCode === 200)
      toast.success("Successful applied packet broker configuration");
    else toast.error("Failed to apply packet broker configuration");
  } catch (error) {
    yield put(setMapFail(error));
    toast.error("Failed to apply packet broker configuration");
  }
}
function* onPutMap({ payload: data }) {
  try {
    const response = yield call(putMapData, data);
    yield put(putMapSuccess(response));
    toast.success("Successful applied packet broker configuration");
  } catch (error) {
    yield put(putMapFail(error));
    toast.error("Failed to apply packet broker configuration");
  }
}
function* onDeleteMap({ payload: data }) {
  try {
    const response = yield call(deleteMapData, data);
    yield put(deleteMapSuccess(response));
    toast.success("Successful applied packet broker configuration");
  } catch (error) {
    yield put(deleteMapFail(error));
    toast.error("Failed to apply packet broker configuration");
  }
}
export function* watchonGetMap() {
  yield takeEvery(GET_MAP_DATA, onGetMap);
}
export function* watchonSetMap() {
  yield takeEvery(SET_MAP_DATA, onSetMap);
}
export function* watchonPutMap() {
  yield takeEvery(UPDATE_MAP_DATA, onPutMap);
}
export function* watchonDeleteMap() {
  yield takeEvery(DELETE_MAP_DATA, onDeleteMap);
}

// Rules
function* onGetRule({ payload: mid }) {
  try {
    const response = yield call(getRuleData, mid);
    yield put(getRuleSuccess(response));
  } catch (error) {
    yield put(getRuleFail(error));
  }
}

function* onGetOneRule({ payload: { data } }) {
  try {
    const response = yield call(getOneRuleData, data);
    yield put(getOneRuleSuccess(response));
  } catch (error) {
    yield put(getOneRuleFail(error));
  }
}
function* onSetRule({ payload: { data } }) {
  try {
    const response = yield call(setRuleData, data);
    yield put(setRuleSuccess(response));
    if (response.statusCode === 200)
      toast.success("Rule Configuration successful");
    else toast.error("Rule Configuration failed");
  } catch (error) {
    yield put(setRuleFail(error));
    toast.error("Rule Configuration failed");
  }
}
function* onPutRule({ payload: data }) {
  try {
    const response = yield call(putRuleData, data);
    yield put(putRuleSuccess(response));
    toast.success("Successful applied packet broker configuration");
  } catch (error) {
    yield put(putRuleFail(error));
    toast.error("Failed to apply packet broker configuration");
  }
}
function* onDeleteRule({ payload: { data } }) {
  try {
    const response = yield call(deleteRuleData, data);
    yield put(deleteRuleSuccess(response));
    toast.success("Successful applied packet broker configuration");
  } catch (error) {
    yield put(deleteRuleFail(error));
    toast.error("Failed to apply packet broker configuration");
  }
}
export function* watchonGetRule() {
  yield takeEvery(GET_RULE_DATA, onGetRule);
}
export function* watchonGetOneRule() {
  yield takeEvery(GET_ONE_RULE_DATA, onGetOneRule);
}
export function* watchonSetRule() {
  yield takeEvery(SET_RULE_DATA, onSetRule);
}
export function* watchonPutRule() {
  yield takeEvery(UPDATE_RULE_DATA, onPutRule);
}
export function* watchonDeleteRule() {
  yield takeEvery(DELETE_RULE_DATA, onDeleteRule);
}

// Portchannel
function* onGetPortChannel() {
  try {
    const response = yield call(getPortchannelData);
    yield put(getPortchannelSuccess(response));
  } catch (error) {
    yield put(getPortchannelFail(error));
  }
}
function* onSetPortChannel({ payload: { portdata } }) {
  try {
    const response = yield call(setPortchannelData, portdata);
    yield put(setPortchannelSuccess(response));
    toast.success("Portchannel created Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(setPortchannelFail(error));
    toast.error("Portchannel Creation Failed", { autoClose: 3000 });
  }
}
function* onPutPortChannel({ payload: data }) {
  try {
    const response = yield call(putPortchannelData, data);
    yield put(putPortchannelSuccess(response));
    toast.success("Porchannel Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(putPortchannelFail(error));
    toast.error("Porchannel Updation Failed", { autoClose: 3000 });
  }
}
function* onDeletePortChannel({ payload: portid }) {
  try {
    const response = yield call(deletePortchannelData, portid);
    yield put(deletePortchannelSuccess(response));
    toast.success("PortChannel Deletion Successful", { autoClose: 3000 });
  } catch (error) {
    yield put(deletePortchannelFail(error));
    toast.error("PortChannel Deletion Failed", { autoClose: 3000 });
  }
}
function* onDeleteAllPortChannelMembers({ payload: portid }) {
  try {
    const response = yield call(deletePortchannelallmembers, portid);
    yield put(deletePortchannelAllMembersSuccess(response));
    toast.success("All PortChannel Members Have Been Removed Successful", {
      autoClose: 3000,
    });
  } catch (error) {
    yield put(deletePortchannelAllMembersFail(error));
    toast.error("Removing All PortChannel Members Have Been Failed", {
      autoClose: 3000,
    });
  }
}
function* onDeleteParticularPortChannelMembers({ payload: { portid, ports } }) {
  try {
    const response = yield call(
      deletePortchannelParticularMembersData,
      portid,
      ports
    );
    yield put(deletePortchannelParticularMembersSuccess(response));
    toast.success("Removing ", { autoClose: 3000 });
  } catch (error) {
    yield put(deletePortchannelParticularMembersFail(error));
    toast.error("Removing ", { autoClose: 3000 });
  }
}
export function* watchonGetPortChannel() {
  yield takeEvery(GET_PORTCHANNEL_DATA, onGetPortChannel);
}
export function* watchonSetPortChannel() {
  yield takeEvery(SET_PORTCHANNEL_DATA, onSetPortChannel);
}
export function* watchonPutPortChannel() {
  yield takeEvery(UPDATE_PORTCHANNEL_DATA, onPutPortChannel);
}
export function* watchonDeletePortChannel() {
  yield takeEvery(DELETE_PORTCHANNEL, onDeletePortChannel);
}
export function* watchonDeleteAllPortchannelMembers() {
  yield takeEvery(
    DELETE_PORTCHANNEL_ALL_MEMBERS,
    onDeleteAllPortChannelMembers
  );
}
export function* watchonDeleteParticularPortchannelMembers() {
  yield takeEvery(
    DELETE_PORTCHANNEL_PARTICULAR_MEMBERS,
    onDeleteParticularPortChannelMembers
  );
}
// Interface counters
function* onGetInterfaceCounter() {
  try {
    const response = yield call(getInterfacecountData);
    yield put(getInterfacecountSuccess(response));
  } catch (error) {
    yield put(getInterfacecountFail(error));
  }
}
export function* watchonGetInterfaceCounter() {
  yield takeEvery(GET_INTERFACE_COUNT, onGetInterfaceCounter);
}

// DPBSTAT

function* onGetDPBSTAT() {
  try {
    const response = yield call(getDPBSTATData);
    yield put(getDPBSTATSuccess(response));
  } catch (error) {
    yield put(getDPBSTATFail(error));
  }
}
export function* watchonGetDPBSTAT() {
  yield takeEvery(GET_DPBSTAT, onGetDPBSTAT);
}

function* getMapSaga() {
  yield all([fork(watchFetchMapData)]);
  yield all([fork(watchSetMapConfigData)]);
  // Interfaces
  yield all([fork(watchFetchPacketBrokerInterfaceData)]);
  yield all([fork(watchSetPacketBrokerInterfaceData)]);
  // Map
  yield all([fork(watchonGetMap)]);
  yield all([fork(watchonSetMap)]);
  yield all([fork(watchonPutMap)]);
  yield all([fork(watchonDeleteMap)]);
  // Rule
  yield all([fork(watchonGetRule)]);
  yield all([fork(watchonGetOneRule)]);
  yield all([fork(watchonSetRule)]);
  yield all([fork(watchonPutRule)]);
  yield all([fork(watchonDeleteRule)]);
  // Port channel
  yield all([fork(watchonGetPortChannel)]);
  yield all([fork(watchonSetPortChannel)]);
  yield all([fork(watchonPutPortChannel)]);
  yield all([fork(watchonDeletePortChannel)]);
  yield all([fork(watchonDeleteAllPortchannelMembers)]);
  yield all([fork(watchonDeleteParticularPortchannelMembers)]);
  // Interface counters
  yield all([fork(watchonGetInterfaceCounter)]);
  // DPBSTAT
  yield all([fork(watchonGetDPBSTAT)]);
}

export default getMapSaga;
