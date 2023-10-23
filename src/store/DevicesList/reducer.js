import {
  GET_DEVICES_DATA_SUCCESS,
  GET_DEVICES_DATA_FAIL,
  DELETE_DEVICES_DATA_SUCCESS,
  DELETE_DEVICES_DATA_FAIL,
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
  GET_DEVICE_CUSTUM_GRAPH_LIST_SUCCESS,
  GET_DEVICE_CUSTUM_GRAPH_LIST_FAIL,
  GET_DEVICE_CUSTUM_GRAPH_LIST,
  CREATE_CUSTUM_FIELD_BY_OID_FAIL,
  CREATE_CUSTUM_FIELD_BY_OID_SUCCESS,
  CREATE_CUSTUM_FIELD_BY_OID_INFO,
  GET_OID_LIST_SUCCESS,
  GET_OID_LIST_FAIL,
  GET_OID_LIST,
  DELETE_OID_LIST_SUCCESS,
  DELETE_OID_LIST_FAIL,
  DELETE_OID_LIST,
  SET_DEVICE_POLLING_INTERVAL_FAIL,
  SET_DEVICE_POLLING_INTERVAL_SUCCESS,
  SET_DEVICE_PROCESS_INTERVAL_FAIL,
  SET_DEVICE_PROCESS_INTERVAL_SUCCESS,
  UPDATE_DEVICE_SETTING_SUCCESS,
  UPDATE_DEVICE_SETTING_FAIL,
  UPDATE_DEVICE_SETTING,
  SET_DEVICE_POLLING,
  SET_DEVICE_POLLING_FAIL,
  SET_DEVICE_POLLING_SUCCESS,
  GET_DEVICE_POLLING,
  GET_DEVICE_POLLING_SUCCESS,
  GET_DEVICE_POLLING_FAIL,
  GET_DEVICE_CREDENTIALS,
  GET_DEVICE_CREDENTIALS_SUCCESS,
  GET_DEVICE_CREDENTIALS_FAIL,
  VERIFY_LICENSE,
  VERIFY_LICENSE_FAIL,
  VERIFY_LICENSE_SUCCESS,
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

const INIT_STATE = {
  getDevicesData: [],
  deleteDevicesData: [],
  deviceprocessdata: [],
  devicesystemdata: [],
  devicestatsdata: [],
  setDeviceHistoricalInfo: [],
  DeviceCustumList: [],
  createCustumField: [],
  OidList: [],
  deleteOidList: [],
  DeviceCustumList: [],
  devicePollingInterval: 0,
  deviceProcessInterval: 0,
  deviceSettingInfo: {},
  devicePolling: {},
  deviceCredentials: {},
  LicenseKeyStatus: {},
  rebootDevice: {},
  registerDevice: [],
  syslogDeviceip: [],
};

const DevicesListData = (state = INIT_STATE, action) => {
  // DEVICES LIST VIEW
  switch (action.type) {
    // GET devices data
    case GET_DEVICES_DATA_SUCCESS:
      return {
        ...state,
        getDevicesData: action.payload,
      };

    case GET_DEVICES_DATA_FAIL:
      return {
        ...state,
        getDevicesData: action.payload,
      };

    // DELETE devices data
    case DELETE_DEVICES_DATA_SUCCESS:
      return {
        ...state,
        deleteDevicesData: action.payload,
      };

    case DELETE_DEVICES_DATA_FAIL:
      return {
        ...state,
        deleteDevicesData: action.payload,
      };

    // DELETE devices data
    case UPDATE_DEVICE_SETTING_SUCCESS:
      return {
        ...state,
        deviceSettingInfo: action.payload,
      };

    case UPDATE_DEVICE_SETTING_FAIL:
      return {
        ...state,
        deviceSettingInfo: action.payload,
      };

    case UPDATE_DEVICE_SETTING:
      return {
        ...state,
        deviceSettingInfo: action.payload,
      };

    // get device process data
    case GET_DEVICE_PROCESS_INFO_SUCCESS:
      return {
        ...state,
        deviceprocessdata: action.payload,
      };

    case GET_DEVICE_PROCESS_INFO_FAIL:
      return {
        ...state,
        deviceprocessdata: action.payload,
      };

    // get device system data
    case GET_DEVICE_SYSTEM_INFO_SUCCESS:
      return {
        ...state,
        devicesystemdata: action.payload,
      };

    case GET_DEVICE_SYSTEM_INFO_FAIL:
      return {
        ...state,
        devicesystemdata: action.payload,
      };

    // get device stats data
    case GET_DEVICE_STATS_INFO_SUCCESS:
      return {
        ...state,
        devicestatsdata: action.payload,
      };

    case GET_DEVICE_STATS_INFO_FAIL:
      return {
        ...state,
        devicestatsdata: action.payload,
      };

    // delete device stats data
    case DELETE_DEVICE_STATS_INFO_SUCCESS:
      return {
        ...state,
        devicestatsdata: action.payload,
      };

    case DELETE_DEVICE_STATS_INFO_FAIL:
      return {
        ...state,
        devicestatsdata: action.payload,
      };  

    // Set device Historical Info
    case SET_DEVICE_HISTORICAL_INFO_SUCCESS:
      return {
        ...state,
        setDeviceHistoricalInfo: action.payload,
      };

    case SET_DEVICE_HISTORICAL_INFO_FAIL:
      return {
        ...state,
        setDeviceHistoricalInfo: action.payload,
      };

    // get device stats data
    case GET_DEVICE_CUSTUM_GRAPH_LIST_SUCCESS:
      return {
        ...state,
        DeviceCustumList: action.payload,
      };

    case GET_DEVICE_CUSTUM_GRAPH_LIST_FAIL:
      return {
        ...state,
        DeviceCustumList: action.payload,
      };

    // Create Custum Field by OID   
    case CREATE_CUSTUM_FIELD_BY_OID_SUCCESS:
      return {
        ...state,
        createCustumField: action.payload,
      };

    case CREATE_CUSTUM_FIELD_BY_OID_FAIL:
      return {
        ...state,
        createCustumField: action.payload,
      };

    // get Oid List
    case GET_OID_LIST_SUCCESS:
      return {
        ...state,
        OidList: action.payload,
      };

    case GET_OID_LIST_FAIL:
      return {
        ...state,
        OidList: action.payload,
      };


    // DELETE Oid data
    case DELETE_OID_LIST_SUCCESS:
      return {
        ...state,
        deleteOidList: action.payload,
      };

    case DELETE_OID_LIST_FAIL:
      return {
        ...state,
        deleteOidList: action.payload,
      };





    // Set Device Polling Interval
    case SET_DEVICE_POLLING_INTERVAL_SUCCESS:
      return {
        ...state,
        devicePollingInterval: action.payload,
      };

    case SET_DEVICE_POLLING_INTERVAL_FAIL:
      return {
        ...state,
        devicePollingInterval: action.payload,
      };

    // Set Device Process Interval
    case SET_DEVICE_PROCESS_INTERVAL_SUCCESS:
      return {
        ...state,
        deviceProcessInterval: action.payload,
      };

    case SET_DEVICE_PROCESS_INTERVAL_FAIL:
      return {
        ...state,
        deviceProcessInterval: action.payload,
      };

    // Set Device Polling
    case SET_DEVICE_POLLING_SUCCESS:
      return {
        ...state,
        devicePolling: action.payload,
      };

    case SET_DEVICE_POLLING_FAIL:
      return {
        ...state,
        devicePolling: action.payload,
      };

    // Get Device Polling
    case GET_DEVICE_POLLING_SUCCESS:
      return {
        ...state,
        devicePolling: action.payload,
      };

    case GET_DEVICE_POLLING_FAIL:
      return {
        ...state,
        devicePolling: action.payload,
      };

    // Get Device Credentials
    case GET_DEVICE_CREDENTIALS_SUCCESS:
      return {
        ...state,
        deviceCredentials: action.payload,
      };

    case GET_DEVICE_CREDENTIALS_FAIL:
      return {
        ...state,
        deviceCredentials: action.payload,
      };


    // Verify device License key
    case VERIFY_LICENSE_SUCCESS:
      return {
        ...state,
        LicenseKeyStatus: action.payload,
      };

    case VERIFY_LICENSE_FAIL:
      return {
        ...state,
        LicenseKeyStatus: action.payload,
      };

    // Reboot Device
    case REBOOT_DEVICE_SUCCESS:
      return {
        ...state,
        rebootDevice: action.payload,
      };

    case REBOOT_DEVICE_FAIL:
      return {
        ...state,
        rebootDevice: action.payload,
      };

    // Register Device
    case REGISTER_DEVICE_SUCCESS_ACTION_TYPE:
      return {
        ...state,
        registerDevice: action.payload,
      };

    case REGISTER_DEVICE_FAIL_ACTION_TYPE:
      return {
        ...state,
        registerDevice: action.payload,
      };

    //Syslog Device IP
    case SYSLOG_DEVICE_SUCCESS_ACTION_TYPE:
      return {
        ...state,
        syslogDeviceip: action.payload,
      };

    case SYSLOG_DEVICE_FAIL_ACTION_TYPE:
      return {
        ...state,
        syslogDeviceip: action.payload,
      };

    default:
      return state;
  }
};

export default DevicesListData;
