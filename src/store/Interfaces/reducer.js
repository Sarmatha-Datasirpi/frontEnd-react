import {
  GET_INTERFACE_DATA_SUCCESS,
  GET_INTERFACE_DATA_FAIL,
  UPDATE_INTERFACE_CONFIG_DATA_FAIL,
  UPDATE_INTERFACE_CONFIG_DATA_SUCCESS,
  GET_INTERFACE_CONFIG_DATA_FAIL,
  GET_INTERFACE_CONFIG_DATA_SUCCESS,
  OCNOS_ISIS_GET_FAIL_ACTION_TYPE,
  OCNOS_ISIS_GET_SUCCESS_ACTION_TYPE
} from "./actionTypes";

const INIT_STATE = {
  interfaceData: [],
  interfaceConfigData: {},
  isisDataGetState: [],
};

const Interface_reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INTERFACE_DATA_SUCCESS:
      return {
        ...state,
        interfaceData: action.payload,
      };
    case GET_INTERFACE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_INTERFACE_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        interfaceConfigData: action.payload,
      };
    case UPDATE_INTERFACE_CONFIG_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_INTERFACE_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        interfaceConfigData: action.payload,
      };
    case GET_INTERFACE_CONFIG_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case OCNOS_ISIS_GET_SUCCESS_ACTION_TYPE:
      return {
        ...state,
        isisDataGetState: action.payload,
      };
    case OCNOS_ISIS_GET_FAIL_ACTION_TYPE:
      return {
        ...state,
        error: action.payload,
      };


    default:
      return state;
  }

};

export default Interface_reducer;
