import {
GET_OPTICAL_MONITOR_DATA_FAIL,
GET_OPTICAL_MONITOR_DATA_SUCCESS,
GET_OPTICAL_MONITOR_DATA
} from './actionTypes'

export const getOpticalMonitorDataSuccess = data => ({
  type:GET_OPTICAL_MONITOR_DATA_SUCCESS,
  payload:data,
})
export const getOpticalMonitorDataFail = error => ({
  type:GET_OPTICAL_MONITOR_DATA_FAIL,
  payload:error,
})
export const getOpticalMonitorData = (deviceId,filterBy) =>{
  return {
  type: GET_OPTICAL_MONITOR_DATA,
  payload: {deviceId , filterBy}
};
};



