import {
  GET_INTERFACE_DATA_SUCCESS,
  GET_INTERFACE_DATA_FAIL,
  GET_INTERFACE_DATA,
  UPDATE_INTERFACE_CONFIG_DATA,
  UPDATE_INTERFACE_CONFIG_DATA_FAIL,
  UPDATE_INTERFACE_CONFIG_DATA_SUCCESS,
  GET_INTERFACE_CONFIG_DATA,
  GET_INTERFACE_CONFIG_DATA_SUCCESS,
  GET_INTERFACE_CONFIG_DATA_FAIL,
  OCNOS_ISIS_GET_ACTION_TYPE,
  OCNOS_ISIS_GET_FAIL_ACTION_TYPE,
  OCNOS_ISIS_GET_SUCCESS_ACTION_TYPE
} from './actionTypes'

export const getInterfaceDataSuccess = data => ({
  type: GET_INTERFACE_DATA_SUCCESS,
  payload: data,
})
export const getInterfaceDataFail = error => ({
  type: GET_INTERFACE_DATA_FAIL,
  payload: error,
})
export const getInterfaceData = (deviceId) => ({
  type: GET_INTERFACE_DATA,
  payload: deviceId
})


export const updateInterfaceConfigDataSuccess = data => ({
  type: UPDATE_INTERFACE_CONFIG_DATA_SUCCESS,
  payload: data,
})
export const updateInterfaceConfigDataFail = error => ({
  type: UPDATE_INTERFACE_CONFIG_DATA_FAIL,
  payload: error,
})
export const updateInterfaceConfigData = (interfaceConfigData) => ({
  type: UPDATE_INTERFACE_CONFIG_DATA,
  payload: interfaceConfigData
})

export const getInterfaceConfigDataSuccess = data => ({
  type: GET_INTERFACE_CONFIG_DATA_SUCCESS,
  payload: data,
})
export const getInterfaceConfigDataFail = error => ({
  type: GET_INTERFACE_CONFIG_DATA_FAIL,
  payload: error,
})
export const getInterfaceConfigDatas = (interfaceConfigData) => ({
  type: GET_INTERFACE_CONFIG_DATA,
  payload: interfaceConfigData
})

//OCNOS NOS ISIS
export const getISISDataSuccess = data => ({
  type: OCNOS_ISIS_GET_SUCCESS_ACTION_TYPE,
  payload: data,
})
export const getISISDataFail = error => ({
  type: OCNOS_ISIS_GET_FAIL_ACTION_TYPE,
  payload: error,
})
export const getISISData = (deviceId) => ({
  type: OCNOS_ISIS_GET_ACTION_TYPE,
  payload: deviceId
})
