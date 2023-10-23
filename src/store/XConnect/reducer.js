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

const INIT_STATE = {
  mapDataList: [],
  coOrdinateDataSet: [],
  addMapData: [],
  getRule_red: [],
  getOneRule_red: [],
  setRule_red: [],
  delRule_red: [],
  error: {},
};

const XConnect_Reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Get interface
    case GET_INTERFACES_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        coOrdinateDataSet: action.payload,
      };

    case GET_INTERFACES_CONFIG_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Set interface
    case SET_INTERFACES_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        addMapData: action.payload,
      };

    case SET_INTERFACES_CONFIG_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Get x-connect
    case GET_X_CONNECT_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        mapDataList: action.payload,
      };

    case GET_X_CONNECT_CONFIG_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Set x-connect
    case SET_X_CONNECT_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        addMapData: action.payload,
      };

    case SET_X_CONNECT_CONFIG_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Delete x-connect
    case DELETE_X_CONNECT_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        addMapData: action.payload,
      };

    case DELETE_X_CONNECT_CONFIG_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default XConnect_Reducer;