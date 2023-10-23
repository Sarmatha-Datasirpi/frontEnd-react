import {
  // Get interface config data
  GET_INTERFACES_CONFIG_DATA,
  GET_INTERFACES_CONFIG_DATA_FAIL,
  GET_INTERFACES_CONFIG_DATA_SUCCESS,
  // Set interface config data
  SET_INTERFACES_CONFIG_DATA,
  SET_INTERFACES_CONFIG_DATA_FAIL,
  SET_INTERFACES_CONFIG_DATA_SUCCESS,
  // Get x-connect config data
  GET_X_CONNECT_CONFIG_DATA,
  GET_X_CONNECT_CONFIG_DATA_FAIL,
  GET_X_CONNECT_CONFIG_DATA_SUCCESS,
  // Set x-connect config data
  SET_X_CONNECT_CONFIG_DATA,
  SET_X_CONNECT_CONFIG_DATA_FAIL,
  SET_X_CONNECT_CONFIG_DATA_SUCCESS,
  // Delete x-connect config data
  DELETE_X_CONNECT_CONFIG_DATA,
  DELETE_X_CONNECT_CONFIG_DATA_FAIL,
  DELETE_X_CONNECT_CONFIG_DATA_SUCCESS,
} from "./actionTypes";

// Get Interface configuration from database
export const getInterfaceConfigSuccess = (data) => ({
  type: GET_INTERFACES_CONFIG_DATA_SUCCESS,
  payload: data,
});

export const getInterfaceConfigFail = (error) => ({
  type: GET_INTERFACES_CONFIG_DATA_FAIL,
  payload: error,
});

export const getInterfaceConfigData = (deviceId) => ({
  type: GET_INTERFACES_CONFIG_DATA,
  payload: deviceId
});

// Set Interface configuration into database
export const setInterfaceConfigSuccess = (data) => ({
  type: SET_INTERFACES_CONFIG_DATA_SUCCESS,
  payload: data,
});

export const setInterfaceConfigFail = (error) => ({
  type: SET_INTERFACES_CONFIG_DATA_FAIL,
  payload: error,
});

export const setInterfaceConfigData = (interfaceData) => {
  return {
    type: SET_INTERFACES_CONFIG_DATA,
    payload: interfaceData,
  };
};

// Get X-connect configuration from database
export const getXConnectConfigSuccess = (data) => ({
  type: GET_X_CONNECT_CONFIG_DATA_SUCCESS,
  payload: data,
});

export const getXConnectConfigFail = (error) => ({
  type: GET_X_CONNECT_CONFIG_DATA_FAIL,
  payload: error,
});

export const getXConnectConfigData = () => ({
  type: GET_X_CONNECT_CONFIG_DATA
});

// Set Interface configuration into database
export const setXConnectConfigSuccess = (data) => ({
  type: SET_X_CONNECT_CONFIG_DATA_SUCCESS,
  payload: data,
});

export const setXConnectConfigFail = (error) => ({
  type: SET_X_CONNECT_CONFIG_DATA_FAIL,
  payload: error,
});

export const setXConnectConfigData = (xConnectData) => {
  return {
    type: SET_X_CONNECT_CONFIG_DATA,
    payload: xConnectData,
  };
};

// Delete Interface configuration into database
export const deleteXConnectConfigSuccess = (data) => ({
  type: DELETE_X_CONNECT_CONFIG_DATA_SUCCESS,
  payload: data,
});

export const deleteXConnectConfigFail = (error) => ({
  type: DELETE_X_CONNECT_CONFIG_DATA_FAIL,
  payload: error,
});

export const deleteXConnectConfigData = (xConnectData) => {
  return {
    type: DELETE_X_CONNECT_CONFIG_DATA,
    payload: xConnectData,
  };
};