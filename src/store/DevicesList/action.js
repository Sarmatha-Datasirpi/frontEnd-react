import {
  GET_DEVICES_DATA_SUCCESS,
  GET_DEVICES_DATA_FAIL,
  GET_DEVICES_DATA,
  DELETE_DEVICES_DATA_SUCCESS,
  DELETE_DEVICES_DATA_FAIL,
  DELETE_DEVICES_DATA,
  GET_DEVICE_PROCESS_INFO_SUCCESS,
  GET_DEVICE_PROCESS_INFO_FAIL,
  GET_DEVICE_PROCESS_INFO,
  GET_DEVICE_SYSTEM_INFO_SUCCESS,
  GET_DEVICE_SYSTEM_INFO_FAIL,
  GET_DEVICE_SYSTEM_INFO,
  GET_DEVICE_STATS_INFO_SUCCESS,
  GET_DEVICE_STATS_INFO_FAIL,
  GET_DEVICE_STATS_INFO,
  DELETE_DEVICE_STATS_INFO_SUCCESS,
  DELETE_DEVICE_STATS_INFO_FAIL,
  DELETE_DEVICE_STATS_INFO,
  SET_DEVICE_HISTORICAL_INFO_SUCCESS,
  SET_DEVICE_HISTORICAL_INFO_FAIL,
  SET_DEVICE_HISTORICAL_INFO,
  GET_DEVICE_CUSTUM_GRAPH_LIST,
  GET_DEVICE_CUSTUM_GRAPH_LIST_FAIL,
  GET_DEVICE_CUSTUM_GRAPH_LIST_SUCCESS,
  CREATE_CUSTUM_FIELD_BY_OID_SUCCESS,
  CREATE_CUSTUM_FIELD_BY_OID_FAIL,
  CREATE_CUSTUM_FIELD_BY_OID_INFO,
  GET_OID_LIST_SUCCESS,
  GET_OID_LIST_FAIL,
  GET_OID_LIST,
  DELETE_OID_LIST_SUCCESS,
  DELETE_OID_LIST_FAIL,
  DELETE_OID_LIST,
  SET_DEVICE_POLLING_INTERVAL_SUCCESS,
  SET_DEVICE_POLLING_INTERVAL_FAIL,
  SET_DEVICE_POLLING_INTERVAL,
  SET_DEVICE_PROCESS_INTERVAL_SUCCESS,
  SET_DEVICE_PROCESS_INTERVAL_FAIL,
  SET_DEVICE_PROCESS_INTERVAL,
  UPDATE_DEVICE_SETTING,
  UPDATE_DEVICE_SETTING_SUCCESS,
  UPDATE_DEVICE_SETTING_FAIL,
  SET_DEVICE_POLLING,
  SET_DEVICE_POLLING_SUCCESS,
  SET_DEVICE_POLLING_FAIL,
  GET_DEVICE_POLLING,
  GET_DEVICE_POLLING_SUCCESS,
  GET_DEVICE_POLLING_FAIL,
  GET_DEVICE_CREDENTIALS,
  GET_DEVICE_CREDENTIALS_SUCCESS,
  GET_DEVICE_CREDENTIALS_FAIL,
  VERIFY_LICENSE,
  VERIFY_LICENSE_SUCCESS,
  VERIFY_LICENSE_FAIL,
  REBOOT_DEVICE,
  REBOOT_DEVICE_FAIL,
  REBOOT_DEVICE_SUCCESS,
  REGISTER_DEVICE_ACTION_TYPE,
  REGISTER_DEVICE_FAIL_ACTION_TYPE,
  REGISTER_DEVICE_SUCCESS_ACTION_TYPE,
  SYSLOG_DEVICE_ACTION_TYPE,
  SYSLOG_DEVICE_FAIL_ACTION_TYPE,
  SYSLOG_DEVICE_SUCCESS_ACTION_TYPE
} from "./actionTypes";

// GET

// DEVICES LIST
export const getDevicesDataSuccess = (data) => ({
  type: GET_DEVICES_DATA_SUCCESS,
  payload: data,
});

export const getDevicesDataFail = (error) => ({
  type: GET_DEVICES_DATA_FAIL,
  payload: error,
});

export const getDevicesData = () => {
  return {
    type: GET_DEVICES_DATA,
  };
};

// DELETE

// DEVICES LIST
export const deleteDevicesDataSuccess = (deviceIds) => ({
  type: DELETE_DEVICES_DATA_SUCCESS,
  payload: deviceIds,
});

export const deleteDevicesDataFail = (error) => ({
  type: DELETE_DEVICES_DATA_FAIL,
  payload: error,
});

export const deleteDevicesData = (deviceIds) => {
  return {
    type: DELETE_DEVICES_DATA,
    payload: deviceIds,
  };
};

// UPDATE DEVICE SETTING
// PUT
export const updateDeviceSettingSuccess = (deviceSettingInfo) => ({
  type: UPDATE_DEVICE_SETTING_SUCCESS,
  payload: deviceSettingInfo,
});

export const updateDeviceSettingFail = (error) => ({
  type: UPDATE_DEVICE_SETTING_FAIL,
  payload: error,
});

export const updateDeviceSetting = (deviceSettingInfo) => {
  return {
    type: UPDATE_DEVICE_SETTING,
    payload: deviceSettingInfo,
  };
};

// Get Device Process Info

export const getDeviceProcessInfoSuccess = (data) => ({
  type: GET_DEVICE_PROCESS_INFO_SUCCESS,
  payload: data,
});

export const getDeviceProcessInfoFail = (error) => ({
  type: GET_DEVICE_PROCESS_INFO_FAIL,
  payload: error,
});

export const getDeviceProcessInfoAction = (deviceid, filterby) => {
  return {
    type: GET_DEVICE_PROCESS_INFO,
    payload: { deviceid, filterby },
  };
};

// Get Device System Info

export const getDeviceSystemInfoSuccess = (data) => ({
  type: GET_DEVICE_SYSTEM_INFO_SUCCESS,
  payload: data,
});

export const getDeviceSystemInfoFail = (error) => ({
  type: GET_DEVICE_SYSTEM_INFO_FAIL,
  payload: error,
});

export const getDeviceSystemInfoAction = (deviceid) => {
  return {
    type: GET_DEVICE_SYSTEM_INFO,
    payload: deviceid,
  };
};

// Get Device Stats Info

export const getDeviceStatsInfoSuccess = (data) => ({
  type: GET_DEVICE_STATS_INFO_SUCCESS,
  payload: data,
});

export const getDeviceStatsInfoFail = (error) => ({
  type: GET_DEVICE_STATS_INFO_FAIL,
  payload: error,
});

export const getDeviceStatsInfoAction = (deviceid) => {
  return {
    type: GET_DEVICE_STATS_INFO,
    payload: deviceid,
  };
};

// Delete Device Stats Info

export const deleteDeviceStatsInfoSuccess = (data) => ({
  type: DELETE_DEVICE_STATS_INFO_SUCCESS,
  payload: data,
});

export const deleteDeviceStatsInfoFail = (error) => ({
  type: DELETE_DEVICE_STATS_INFO_FAIL,
  payload: error,
});

export const deleteDeviceStatsInfoAction = (deviceid) => {
  return {
    type: DELETE_DEVICE_STATS_INFO,
    payload: deviceid,
  };
};

// Set Device Historical Info

export const setDeviceHistoricalInfoSuccess = (data) => ({
  type: SET_DEVICE_HISTORICAL_INFO_SUCCESS,
  payload: data,
});

export const setDeviceHistoricalInfoFail = (error) => ({
  type: SET_DEVICE_HISTORICAL_INFO_FAIL,
  payload: error,
});

export const setDeviceHistoricalInfo = (data) => {
  return {
    type: SET_DEVICE_HISTORICAL_INFO,
    payload: data,
  };
};

// DEVICE Custum Graph List
export const getDeviceCustumGraphListSuccess = (data) => ({
  type: GET_DEVICE_CUSTUM_GRAPH_LIST_SUCCESS,
  payload: data,
});

export const getDeviceCustumGraphListFail = (error) => ({
  type: GET_DEVICE_CUSTUM_GRAPH_LIST_FAIL,
  payload: error,
});

export const getDeviceCustumGraphList = (deviceId) => {
  return {
    type: GET_DEVICE_CUSTUM_GRAPH_LIST,
    payload: deviceId,
  };
};

// Set Device Polling Interval

export const setDevicePollingIntervalSuccess = (data) => ({
  type: SET_DEVICE_POLLING_INTERVAL_SUCCESS,
  payload: data,
});

export const setDevicePollingIntervalFail = (error) => ({
  type: SET_DEVICE_POLLING_INTERVAL_FAIL,
  payload: error,
});

export const setDevicePollingInterval = (data) => {
  return {
    type: SET_DEVICE_POLLING_INTERVAL,
    payload: data,
  };
};

// Set Device Process Interval

export const setDeviceProcessIntervalSuccess = (data) => ({
  type: SET_DEVICE_PROCESS_INTERVAL_SUCCESS,
  payload: data,
});

export const setDeviceProcessIntervalFail = (error) => ({
  type: SET_DEVICE_PROCESS_INTERVAL_FAIL,
  payload: error,
});

export const setDeviceProcessInterval = (data) => {
  return {
    type: SET_DEVICE_PROCESS_INTERVAL,
    payload: data,
  };
};

// Set Device Polling

export const setDevicePollingSuccess = (data) => ({
  type: SET_DEVICE_POLLING_SUCCESS,
  payload: data,
});

export const setDevicePollingFail = (error) => ({
  type: SET_DEVICE_POLLING_FAIL,
  payload: error,
});

export const setDevicePolling = (data) => {
  return {
    type: SET_DEVICE_POLLING,
    payload: data,
  };
};

// Get Device Polling

export const getDevicePollingSuccess = (data) => ({
  type: GET_DEVICE_POLLING_SUCCESS,
  payload: data,
});

export const getDevicePollingFail = (error) => ({
  type: GET_DEVICE_POLLING_FAIL,
  payload: error,
});

export const getDevicePolling = (data) => {
  return {
    type: GET_DEVICE_POLLING,
    payload: data,
  };
};

// Get Device Credentials

export const getDeviceCredentialsSuccess = (data) => ({
  type: GET_DEVICE_CREDENTIALS_SUCCESS,
  payload: data,
});

export const getDeviceCredentialsFail = (error) => ({
  type: GET_DEVICE_CREDENTIALS_FAIL,
  payload: error,
});

export const getDeviceCredentials = (data) => {
  return {
    type: GET_DEVICE_CREDENTIALS,
    payload: data,
  };
};

// Set Device Custum  Name and OID

export const createCustumFieldSuccess = (data) => ({
  type: CREATE_CUSTUM_FIELD_BY_OID_SUCCESS,
  payload: data,
});

export const createCustumFieldFail = (error) => ({
  type: CREATE_CUSTUM_FIELD_BY_OID_FAIL,
  payload: error,
});

export const createCustumField = (data) => {
  return {
    type: CREATE_CUSTUM_FIELD_BY_OID_INFO,
    payload: data,
  };
};



// Get OID list

export const getOidListSuccess = (data) => ({
  type: GET_OID_LIST_SUCCESS,
  payload: data,
});

export const getOidListFail = (error) => ({
  type: GET_OID_LIST_FAIL,
  payload: error,
});

export const getOidList = (deviceid) => {
  return {
    type: GET_OID_LIST,
    payload: deviceid,
  };
};

// Delete Oid LIST
export const deleteOidListDataSuccess = (data) => ({
  type: DELETE_OID_LIST_SUCCESS,
  payload: data,
});

export const deleteOidListDataFail = (error) => ({
  type: DELETE_OID_LIST_FAIL,
  payload: error,
});

export const deleteOidListData = (data) => {
  return {
    type: DELETE_OID_LIST,
    payload: data,
  };
};

// Verifyu Device License Key

export const verifyLicenseKeySuccess = (data) => ({
  type: VERIFY_LICENSE_SUCCESS,
  payload: data,
});

export const verifyLicenseKeyFail = (error) => ({
  type: VERIFY_LICENSE_FAIL,
  payload: error,
});

export const verifyLicenseKeyAction = (data) => {
  return {
    type: VERIFY_LICENSE,
    payload: data,
  };
};

// Reboot Device

export const rebootDeviceSuccess = (data) => ({
  type: REBOOT_DEVICE_SUCCESS,
  payload: data,
});

export const rebootDeviceFail = (error) => ({
  type: REBOOT_DEVICE_FAIL,
  payload: error,
});

export const rebootDevice = (data) => {
  return {
    type: REBOOT_DEVICE,
    payload: data,
  };
};

//Register Device
export const registerDeviceSuccessaction = (osVersions) => ({
  type: REGISTER_DEVICE_SUCCESS_ACTION_TYPE,
  payload: osVersions,
});

export const registerDeviceFailaction = (error) => ({
  type: REGISTER_DEVICE_FAIL_ACTION_TYPE,
  payload: error,
});

export const registerDeviceaction = (osVersions) => {
  return {
    type: REGISTER_DEVICE_ACTION_TYPE,
    payload: osVersions,
  };
};


//Syslog Device
export const syslogDeviceSuccessaction = (server_ips) => ({
  type: SYSLOG_DEVICE_SUCCESS_ACTION_TYPE,
  payload: server_ips,
});

export const syslogDeviceFailaction = (error) => ({
  type: SYSLOG_DEVICE_FAIL_ACTION_TYPE,
  payload: error,
});

export const syslogDeviceaction = (server_ips) => {
  return {
    type: SYSLOG_DEVICE_ACTION_TYPE,
    payload: server_ips,
  };
};

