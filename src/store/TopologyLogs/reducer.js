import {
  GET_ALARMS_DATA_SUCCESS,
  GET_ALARMS_DATA_FAIL,
  GET_SYSLOG_DATA_FAIL,
  GET_SYSLOG_DATA_SUCCESS,
  POST_ALARM_EVENTS_DATA_FAIL,
  POST_ALARM_EVENTS_DATA_SUCCESS,
  POST_ALARM_EVENTS_DEVICE_DATA_FAIL,
  POST_ALARM_EVENTS_DEVICE_DATA_SUCCESS,
  POST_LOGS_DATA_ACTION_TYPE_FAIL,
  POST_LOGS_DATA_ACTION_TYPE_SUCCESS,
  POST_ALARM_EVENTS_LATEST5_DATA_FAIL,
  POST_ALARM_EVENTS_LATEST5_DATA_SUCCESS,
  DELETE_ALL_DEVICES_ALARMS_EVENTS_SUCCESS,
  DELETE_ALL_DEVICES_ALARMS_EVENTS_FAIL,
  DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_FAIL,
  DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_SUCCESS,
  DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_FAIL,
  DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_SUCCESS,
  GET_ALARMS_EVENT_DATA_ACTION_SUCCESS,
  GET_ALARMS_EVENT_DATA_ACTION_FAIL
} from "./actionTypes";

const INIT_STATE = {
  getAlarmsData: [],
  getSysLogData: [],
  getAlarmsEventsData: [],
  deleteAlarmsEventsData: [],
  deleteParticularAlarmData: [],
  deleteParticulardeviceallAlarmData: [],
  deleteAllDevicesAlarmsEventsData: [],
  postalarmsdata: [],
  postdevicealarmsdata: [],
  postlatestalarmsdata: [],
  postlogsdata: [],
};

const TopologyLogsData = (state = INIT_STATE, action) => {
  // TOPOLOGY LOGS
  switch (action.type) {
    // POST ALARMS DATA 
    case POST_LOGS_DATA_ACTION_TYPE_SUCCESS:
      return {
        ...state,
        postlogsdata: action.payload,
      };

    case POST_LOGS_DATA_ACTION_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // GET alarms data
    case GET_ALARMS_DATA_SUCCESS:
      return {
        ...state,
        getAlarmsData: action.payload,
      };

    case GET_ALARMS_DATA_FAIL:
      return {
        ...state,
        getAlarmsData: action.payload,
      };

    case GET_SYSLOG_DATA_SUCCESS:
      return {
        ...state,
        getSysLogData: action.payload,
      };

    case GET_SYSLOG_DATA_FAIL:
      return {
        ...state,
        getSysLogData: action.payload,
      };

    case GET_ALARMS_EVENT_DATA_ACTION_SUCCESS:
      return {
        ...state,
        getAlarmsEventsData: action.payload
      }

    case GET_ALARMS_EVENT_DATA_ACTION_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case POST_ALARM_EVENTS_DATA_SUCCESS:
      return {
        ...state,
        postalarmsdata: action.payload,
      };

    case POST_ALARM_EVENTS_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case POST_ALARM_EVENTS_DEVICE_DATA_SUCCESS:
      return {
        ...state,
        postdevicealarmsdata: action.payload,
      };

    case POST_ALARM_EVENTS_DEVICE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };


    case POST_ALARM_EVENTS_LATEST5_DATA_SUCCESS:
      return {
        ...state,
        postlatestalarmsdata: action.payload,
      };

    case POST_ALARM_EVENTS_LATEST5_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ALL_DEVICES_ALARMS_EVENTS_SUCCESS:
      return {
        ...state,
        deleteAllDevicesAlarmsEventsData: action.payload
      }
    case DELETE_ALL_DEVICES_ALARMS_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_PARTICULAR_DEVICES_ALARMS_EVENTS_SUCCESS:
      return {
        ...state,
        deleteParticularAlarmData: action.payload
      }
    case DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_PARTICULAR_DEVICES_ALL_ALARMS_EVENTS_SUCCESS:
      return {
        ...state,
        deleteParticulardeviceallAlarmData: action.payload
      }
    default:
      return state;
  }
};

export default TopologyLogsData;
