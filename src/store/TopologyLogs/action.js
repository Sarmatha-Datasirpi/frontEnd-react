import {
  GET_ALARMS_DATA_SUCCESS,
  GET_ALARMS_DATA_FAIL,
  GET_ALARMS_DATA,
  GET_SYSLOG_DATA,
  GET_SYSLOG_DATA_FAIL,
  GET_SYSLOG_DATA_SUCCESS,
  GET_ALARMS_EVENT_DATA_ACTION,
  GET_ALARMS_EVENT_DATA_ACTION_SUCCESS,
  GET_ALARMS_EVENT_DATA_ACTION_FAIL,
  POST_ALARM_EVENTS_DATA,
  POST_ALARM_EVENTS_DATA_FAIL,
  POST_ALARM_EVENTS_DATA_SUCCESS,
  POST_ALARM_EVENTS_DEVICE_DATA,
  POST_ALARM_EVENTS_DEVICE_DATA_FAIL,
  POST_ALARM_EVENTS_DEVICE_DATA_SUCCESS,
  POST_LOGS_DATA_ACTION_TYPE,
  POST_LOGS_DATA_ACTION_TYPE_FAIL,
  POST_LOGS_DATA_ACTION_TYPE_SUCCESS,
  POST_ALARM_EVENTS_LATEST5_DATA,
  POST_ALARM_EVENTS_LATEST5_DATA_FAIL,
  POST_ALARM_EVENTS_LATEST5_DATA_SUCCESS,
  DELETE_ALL_DEVICES_ALARMS_EVENTS,
  DELETE_ALL_DEVICES_ALARMS_EVENTS_FAIL,
  DELETE_ALL_DEVICES_ALARMS_EVENTS_SUCCESS,
  DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS,
  DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_SUCCESS,
  DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_FAIL,
  DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS,
  DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_SUCCESS,
  DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_FAIL
} from "./actionTypes";

// ALARAMS
export const getAlarmsDataSuccess = (data) => ({
  type: GET_ALARMS_DATA_SUCCESS,
  payload: data,
});

export const getAlarmsDataFail = (error) => ({
  type: GET_ALARMS_DATA_FAIL,
  payload: error,
});

export const getAlarmsData = () => {
  return {
    type: GET_ALARMS_DATA,
  }
}

//SYSLOGS
export const getsyslogdatasuccess = (data) => ({
  type: GET_SYSLOG_DATA_SUCCESS,
  payload: data,
});

export const getsyslogdatafail = (error) => ({
  type: GET_SYSLOG_DATA_FAIL,
  payload: error,
});

export const getsyslogData = () => {
  return {
    type: GET_SYSLOG_DATA,
  }
}

//DEVICE LOGS
export const postLogsDataSuccess = (data) => ({

  type: POST_LOGS_DATA_ACTION_TYPE_SUCCESS,
  payload: data,
});

export const postLogsDataFail = (error) => ({
  type: POST_LOGS_DATA_ACTION_TYPE_FAIL,
  payload: error,
});

export const postLogsData = (pageNo) => {
  return {
    type: POST_LOGS_DATA_ACTION_TYPE,
    payload: pageNo,
  }
};

//DEVICE ALARMS 
export const getAlarmsEventDataSuccess = (data) => ({
  type: GET_ALARMS_EVENT_DATA_ACTION_SUCCESS,
  payload: data,
});

export const getAlarmsEventDataFail = (error) => ({
  type: GET_ALARMS_EVENT_DATA_ACTION_FAIL,
  payload: error,
});

export const getAlarmsEventData = () => {
  return {
    type: GET_ALARMS_EVENT_DATA_ACTION,
  }
}
export const postalarmeventdatasuccess = (data) => ({

  type: POST_ALARM_EVENTS_DATA_SUCCESS,
  payload: data,
});

export const postalarmeventdatafail = (error) => ({
  type: POST_ALARM_EVENTS_DATA_FAIL,
  payload: error,
});

export const postalarmeventdata = (pageNo) => {
  return {
    type: POST_ALARM_EVENTS_DATA,
    payload: pageNo,
  }
};


export const postdevicealarmeventdatasuccess = (data) => ({
  type: POST_ALARM_EVENTS_DEVICE_DATA_SUCCESS,
  payload: data,
});

export const postdevicealarmeventdatafail = (error) => ({
  type: POST_ALARM_EVENTS_DEVICE_DATA_FAIL,
  payload: error,
});

export const postdevicealarmeventdata = (pageNo) => {
  return {
    type: POST_ALARM_EVENTS_DEVICE_DATA,
    payload: pageNo,
  }
};
export const postlatestalarmeventdatasuccess = (data) => ({
  type: POST_ALARM_EVENTS_LATEST5_DATA_SUCCESS,
  payload: data,
});

export const postlatestalarmeventdatafail = (error) => ({
  type: POST_ALARM_EVENTS_LATEST5_DATA_FAIL,
  payload: error,
});

export const postlatestalarmeventdata = (pageNo) => {
  return {
    type: POST_ALARM_EVENTS_LATEST5_DATA,
    payload: pageNo,
  }
};
export const deletealldevicesalarmsevents = () => {
  return {
    type: DELETE_ALL_DEVICES_ALARMS_EVENTS,
  }
};

export const deletealldevicesalarmseventsfail = (error) => ({
  type: DELETE_ALL_DEVICES_ALARMS_EVENTS_FAIL,
  payload: error,
});

export const deletealldevicesalarmseventssuccess = (data) => ({
  type: DELETE_ALL_DEVICES_ALARMS_EVENTS_SUCCESS,
  payload: data,
});
export const deleteparticulardevicesalarmsevents = (pageNo) => {
  return {
    type: DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS,
    payload: pageNo,
  }
};

export const deleteparticulardevicesalarmseventsfail = (error) => ({
  type: DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_FAIL,
  payload: error,
});

export const deleteparticulardevicesalarmseventssuccess = (data) => ({
  type: DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_SUCCESS,
  payload: data,
});
export const deleteparticulardeviceallalarmsevents = (pageNo) => {
  return {
    type: DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS,
    payload: pageNo,
  }
};

export const deleteparticulardeviceallalarmseventsfail = (error) => ({
  type: DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_FAIL,
  payload: error,
});

export const deleteparticulardeviceallalarmseventssuccess = (data) => ({
  type: DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_SUCCESS,
  payload: data,
});

