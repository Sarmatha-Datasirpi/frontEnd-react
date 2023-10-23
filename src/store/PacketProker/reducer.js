import {
  // Get Map config
  GET_MAP_CONFIG_DATA_SUCCESS,
  GET_MAP_CONFIG_DATA_FAIL,
  // Set Map config
  SET_MAP_CONFIG_DATA_SUCCESS,
  SET_MAP_CONFIG_DATA_FAIL,

  // Packet Broker Interfaces

  // GET
  GET_PACKET_BROKER_INTERFACES_DATA,
  GET_PACKET_BROKER_INTERFACES_DATA_FAIL,
  GET_PACKET_BROKER_INTERFACES_DATA_SUCCESS,

  // SET
  SET_PACKET_BROKER_INTERFACES_DATA,
  SET_PACKET_BROKER_INTERFACES_DATA_FAIL,
  SET_PACKET_BROKER_INTERFACES_DATA_SUCCESS,

  // MAP
  //GET
  GET_MAP_DATA_SUCCESS,
  GET_MAP_DATA_FAIL,
  //POST
  SET_MAP_DATA_SUCCESS,
  SET_MAP_DATA_FAIL,
  //PUT
  UPDATE_MAP_DATA_SUCCESS,
  UPDATE_MAP_DATA_FAIL,
  //DELETE
  DELETE_MAP_DATA_SUCCESS,
  DELETE_MAP_DATA_FAIL,

  // RULES
  //GET
  GET_RULE_DATA_SUCCESS,
  GET_RULE_DATA_FAIL,
  GET_ONE_RULE_DATA_SUCCESS,
  GET_ONE_RULE_DATA_FAIL,
  //POST
  SET_RULE_DATA_SUCCESS,
  SET_RULE_DATA_FAIL,
  //PUT
  UPDATE_RULE_DATA_SUCCESS,
  UPDATE_RULE_DATA_FAIL,
  //DELETE
  DELETE_RULE_DATA_SUCCESS,
  DELETE_RULE_DATA_FAIL,

  // PORTCHANNEL
  //GET
  GET_PORTCHANNEL_DATA_SUCCESS,
  GET_PORTCHANNEL_DATA_FAIL,
  //POST
  SET_PORTCHANNEL_DATA_SUCCESS,
  SET_PORTCHANNEL_DATA_FAIL,
  //PUT
  UPDATE_PORTCHANNEL_DATA_SUCCESS,
  UPDATE_PORTCHANNEL_DATA_FAIL,
  DELETE_PORTCHANNEL_ALL_MEMBERS_SUCCESS,
  DELETE_PORTCHANNEL_ALL_MEMBERS_FAIL,
  DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_SUCCESS,
  DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_FAIL,
  //DELETE
  DELETE_PORTCHANNEL_DATA_SUCCESS,
  DELETE_PORTCHANNEL_DATA_FAIL,

  // INTERFACE COUNTER
  //GET
  GET_INTERFACE_COUNT_SUCCESS,
  GET_INTERFACE_COUNT_FAIL,

  // DPBSTAT
  //GET
  GET_DPBSTAT_SUCCESS,
  GET_DPBSTAT_FAIL,
  
} from "./actionTypes";

const INIT_STATE = {
  mapDataList: [],
  addMapData: [],
  mapCreationResponse: {},
  getRule_red: [],
  getOneRule_red: [],
  setRule_red: [],
  delRule_red: [],
  setPortChannel:[],
  getPortchannel:[],
  deletePortchannel:[],
  updateportchannel:[],
  deleteAllPortchannelMembers:[],
  deleteParticularPortchannelMembers:[],
  error: {},
  coOrdinateDataSet: [],
};

const PacketProker_reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MAP_DATA_SUCCESS:
      return {
        ...state,
        mapDataList: action.payload,
      };

    case GET_MAP_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    // Set map

    case SET_MAP_DATA_SUCCESS:
      return {
        ...state,
        mapCreationResponse: action.payload,
      };

    case SET_MAP_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    // Get Rule
    case GET_RULE_DATA_SUCCESS:
      return {
        ...state,
        getRule_red: action.payload,
      };

    case GET_RULE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    // Get One Rule

    case GET_ONE_RULE_DATA_SUCCESS:
      return {
        ...state,
        getOneRule_red: action.payload,
      };

    case GET_ONE_RULE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    // Set Rule
    case SET_RULE_DATA_SUCCESS:
      return {
        ...state,
        setRule_red: action.payload,
      };

    case SET_RULE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_RULE_DATA_SUCCESS:
      return {
        ...state,
        delRule_red: action.payload,
      };

    case DELETE_RULE_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

      // Get interface
    case GET_PACKET_BROKER_INTERFACES_DATA_SUCCESS:
      return {
        ...state,
        coOrdinateDataSet: action.payload,
      };

    case GET_PACKET_BROKER_INTERFACES_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Set interface
    case SET_PACKET_BROKER_INTERFACES_DATA_SUCCESS:
      return {
        ...state,
        addMapData: action.payload,
      };

    case SET_PACKET_BROKER_INTERFACES_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      
      //set PortChannel
    case SET_PORTCHANNEL_DATA_SUCCESS:
      return {
        ...state,
        setPortChannel: action.payload,
      };
    case SET_PORTCHANNEL_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    //Get portchannel
    case GET_PORTCHANNEL_DATA_SUCCESS:
      return {
        ...state,
        getPortchannel: action.payload,
      };

    case GET_PORTCHANNEL_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

      //delete portchannel
    case DELETE_PORTCHANNEL_DATA_SUCCESS:
      return {
        ...state,
        deletePortchannel: action.payload
      };
    case DELETE_PORTCHANNEL_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      //delete portchannel all members 
    case DELETE_PORTCHANNEL_ALL_MEMBERS_SUCCESS:
      return {
        ...state,
        deleteAllPortchannelMembers: action.payload,
      };
    case DELETE_PORTCHANNEL_ALL_MEMBERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_SUCCESS:
      return {
        ...state,
        deleteParticularPortchannelMembers:action.payload,
      }
    case DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    //updating portchannel
    case UPDATE_PORTCHANNEL_DATA_SUCCESS:
      return {
        ...state,
        updateportchannel: action.payload
      };
    case UPDATE_PORTCHANNEL_DATA_FAIL:
      return {
        ...state,
        error:action.payload,
      };
    default:
      return state;
  }
};

export default PacketProker_reducer;
