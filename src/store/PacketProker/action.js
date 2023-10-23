import {
  // Get map config data
  GET_MAP_CONFIG_DATA,
  GET_MAP_CONFIG_DATA_SUCCESS,
  GET_MAP_CONFIG_DATA_FAIL,
  // Set map config data
  SET_MAP_CONFIG_DATA_SUCCESS,
  SET_MAP_CONFIG_DATA_FAIL,
  SET_MAP_CONFIG_DATA,

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
  GET_MAP_DATA,
  //POST
  SET_MAP_DATA_SUCCESS,
  SET_MAP_DATA_FAIL,
  SET_MAP_DATA,
  //PUT
  UPDATE_MAP_DATA_SUCCESS,
  UPDATE_MAP_DATA_FAIL,
  UPDATE_MAP_DATA,
  //DELETE
  DELETE_MAP_DATA_SUCCESS,
  DELETE_MAP_DATA_FAIL,
  DELETE_MAP_DATA,

  // RULES
  //GET
  GET_RULE_DATA_SUCCESS,
  GET_RULE_DATA_FAIL,
  GET_RULE_DATA,
  GET_ONE_RULE_DATA_SUCCESS,
  GET_ONE_RULE_DATA_FAIL,
  GET_ONE_RULE_DATA,
  //POST
  SET_RULE_DATA_SUCCESS,
  SET_RULE_DATA_FAIL,
  SET_RULE_DATA,
  //PUT
  UPDATE_RULE_DATA_SUCCESS,
  UPDATE_RULE_DATA_FAIL,
  UPDATE_RULE_DATA,
  //DELETE
  DELETE_RULE_DATA_SUCCESS,
  DELETE_RULE_DATA_FAIL,
  DELETE_RULE_DATA,

  // PORTCHANNEL
  //GET
  GET_PORTCHANNEL_DATA_SUCCESS,
  GET_PORTCHANNEL_DATA_FAIL,
  GET_PORTCHANNEL_DATA,
  //POST
  SET_PORTCHANNEL_DATA_SUCCESS,
  SET_PORTCHANNEL_DATA_FAIL,
  SET_PORTCHANNEL_DATA,
  //PUT
  UPDATE_PORTCHANNEL_DATA_SUCCESS,
  UPDATE_PORTCHANNEL_DATA_FAIL,
  UPDATE_PORTCHANNEL_DATA,
  //DELETE
  DELETE_PORTCHANNEL_DATA_SUCCESS,
  DELETE_PORTCHANNEL_DATA_FAIL,
  DELETE_PORTCHANNEL,
  DELETE_PORTCHANNEL_ALL_MEMBERS,
  DELETE_PORTCHANNEL_ALL_MEMBERS_SUCCESS,
  DELETE_PORTCHANNEL_ALL_MEMBERS_FAIL,
  DELETE_PORTCHANNEL_PARTICULAR_MEMBERS,
  DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_FAIL,
  DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_SUCCESS,

  // INTERFACE COUNTER
  //GET
  GET_INTERFACE_COUNT_SUCCESS,
  GET_INTERFACE_COUNT_FAIL,
  GET_INTERFACE_COUNT,

  // DPBSTAT
  //GET
  GET_DPBSTAT_SUCCESS,
  GET_DPBSTAT_FAIL,
  GET_DPBSTAT,
} from "./actionTypes";

export const getMapConfigSuccess = (data) => ({
  type: GET_MAP_CONFIG_DATA_SUCCESS,
  payload: data,
});

export const getMapConfigFail = (error) => ({
  type: GET_MAP_CONFIG_DATA_FAIL,
  payload: error,
});

export const getMapConfigData = () => ({
  type: GET_MAP_CONFIG_DATA,
});

// Set Map configuration into database
export const setMapConfigSuccess = (data) => ({
  type: SET_MAP_CONFIG_DATA_SUCCESS,
  payload: data,
});

export const setMapConfigFail = (error) => ({
  type: SET_MAP_CONFIG_DATA_FAIL,
  payload: error,
});

export const setMapConfigData = (mapdata) => ({
  type: SET_MAP_CONFIG_DATA,
  payload: mapdata,
});

// Packet Broker Interfaces

// Get Interface configuration from database
export const getInterfacesDataSuccess = (data) => ({
  type: GET_PACKET_BROKER_INTERFACES_DATA_SUCCESS,
  payload: data,
});

export const getInterfacesDataFail = (error) => ({
  type: GET_PACKET_BROKER_INTERFACES_DATA_FAIL,
  payload: error,
});

export const getInterfacesData = (deviceId) => ({
  type: GET_PACKET_BROKER_INTERFACES_DATA,
  payload: deviceId,
});

// Set Interface configuration into database
export const setInterfacesDataSuccess = (data) => ({
  type: SET_PACKET_BROKER_INTERFACES_DATA_SUCCESS,
  payload: data,
});

export const setInterfacesDataFail = (error) => ({
  type: SET_PACKET_BROKER_INTERFACES_DATA_FAIL,
  payload: error,
});

export const setInterfacesData = (interfaceData) => {
  return {
    type: SET_PACKET_BROKER_INTERFACES_DATA,
    payload: interfaceData,
  };
};

// SET

// Map
//Get
export const getMapSuccess = (data) => ({
  type: GET_MAP_DATA_SUCCESS,
  payload: data,
});

export const getMapFail = (error) => ({
  type: GET_MAP_DATA_FAIL,
  payload: error,
});

export const getMapData = () => ({
  type: GET_MAP_DATA,
});
//POST
export const setMapSuccess = (data) => ({
  type: SET_MAP_DATA_SUCCESS,
  payload: data,
});

export const setMapFail = (error) => ({
  type: SET_MAP_DATA_FAIL,
  payload: error,
});

export const setMapData = (data) => ({
  type: SET_MAP_DATA,
  payload: { data },
});
//PUT
export const putMapSuccess = (data) => ({
  type: UPDATE_MAP_DATA_SUCCESS,
  payload: data,
});

export const putMapFail = (error) => ({
  type: UPDATE_MAP_DATA_FAIL,
  payload: error,
});

export const putMapData = (mapdata) => ({
  type: UPDATE_MAP_DATA,
  payload: mapdata,
});
//DELETE
export const deleteMapSuccess = (data) => ({
  type: DELETE_MAP_DATA_SUCCESS,
  payload: data,
});

export const deleteMapFail = (error) => ({
  type: DELETE_MAP_DATA_FAIL,
  payload: error,
});

export const deleteMapData = (mid) => ({
  type: DELETE_MAP_DATA,
  payload: mid,
});

// RULES
//Get
export const getRuleSuccess = (data) => ({
  type: GET_RULE_DATA_SUCCESS,
  payload: data,
});

export const getRuleFail = (error) => ({
  type: GET_RULE_DATA_FAIL,
  payload: error,
});

export const getRuleData = (mid) => ({
  type: GET_RULE_DATA,
  payload: mid,
});

// Get one rule
export const getOneRuleSuccess = (data) => ({
  type: GET_ONE_RULE_DATA_SUCCESS,
  payload: data,
});

export const getOneRuleFail = (error) => ({
  type: GET_ONE_RULE_DATA_FAIL,
  payload: error,
});

export const getOneRuleData = (data) => ({
  type: GET_ONE_RULE_DATA,
  payload: { data },
});

//POST
export const setRuleSuccess = (data) => ({
  type: SET_RULE_DATA_SUCCESS,
  payload: data,
});

export const setRuleFail = (error) => ({
  type: SET_RULE_DATA_FAIL,
  payload: error,
});

export const setRuleData = (data) => ({
  type: SET_RULE_DATA,
  payload: { data },
});
//PUT
export const putRuleSuccess = (data) => ({
  type: UPDATE_RULE_DATA_SUCCESS,
  payload: data,
});

export const putRuleFail = (error) => ({
  type: UPDATE_RULE_DATA_FAIL,
  payload: error,
});

export const putRuleData = (mapdata) => ({
  type: UPDATE_RULE_DATA,
  payload: mapdata,
});
//DELETE
export const deleteRuleSuccess = (data) => ({
  type: DELETE_RULE_DATA_SUCCESS,
  payload: data,
});

export const deleteRuleFail = (error) => ({
  type: DELETE_RULE_DATA_FAIL,
  payload: error,
});

export const deleteRuleData = (data) => ({
  type: DELETE_RULE_DATA,
  payload: { data },
});

// PORTCHANNEL
//Get
export const getPortchannelSuccess = (data) => ({
  type: GET_PORTCHANNEL_DATA_SUCCESS,
  payload: data,
});

export const getPortchannelFail = (error) => ({
  type: GET_PORTCHANNEL_DATA_FAIL,
  payload: error,
});

export const getPortchannelData = () => ({
  type: GET_PORTCHANNEL_DATA,
});
//Post 
export const setPortchannelSuccess = (data) => ({
  type: SET_PORTCHANNEL_DATA_SUCCESS,
  payload: data,
});

export const setPortchannelFail = (error) => ({
  type: SET_PORTCHANNEL_DATA_FAIL,
  payload: error,
});

export const setPortchannelData = (portdata) => ({
 // return {
  type: SET_PORTCHANNEL_DATA,
  payload: {portdata}, 
  //};
});

//PUT
export const putPortchannelSuccess = (data) => ({
  type: UPDATE_PORTCHANNEL_DATA_SUCCESS,
  payload: data,
});

export const putPortchannelFail = (error) => ({
  type: UPDATE_PORTCHANNEL_DATA_FAIL,
  payload: error,
});

export const putPortchannelData = (portdata) => ({
  type: UPDATE_PORTCHANNEL_DATA,
  payload: portdata,
});
//DELETE PORTCHANNEL
export const deletePortchannelSuccess = (data) => ({
  type: DELETE_PORTCHANNEL_DATA_SUCCESS,
  payload: data,
});

export const deletePortchannelFail = (error) => ({
  type: DELETE_PORTCHANNEL_DATA_FAIL,
  payload: error,
});

export const deletePortchannelData = (portid) => ({
  // return{
  type: DELETE_PORTCHANNEL,
  payload: portid,
  // };
});


// DELETE ALL MEMBERS
export const deletePortchannelAllMembersSuccess = (data) => ({
  type: DELETE_PORTCHANNEL_ALL_MEMBERS_SUCCESS,
  payload: data,
});

export const deletePortchannelAllMembersFail = (error) => ({
  type: DELETE_PORTCHANNEL_ALL_MEMBERS_FAIL,
  payload: error,
});

export const deletePortchannelAllMembersData = (portid) => ({
  // return{
  type: DELETE_PORTCHANNEL_ALL_MEMBERS,
  payload: portid,
  // };
});


// DELETE PARTICULAR MEMBERS
export const deletePortchannelParticularMembersSuccess = (data) => ({
  type: DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_SUCCESS,
  payload: data,
});

export const deletePortchannelParticularMembersFail = (error) => ({
  type: DELETE_PORTCHANNEL_PARTICULAR_MEMBERS_FAIL,
  payload: error,
});

export const deletePortchannelParticularMembersData = (portid,ports) => ({
  // return{
  type: DELETE_PORTCHANNEL_PARTICULAR_MEMBERS,
  payload: portid,
  // };
});
// INTERFACE COUNTER
//Get
export const getInterfacecountSuccess = (data) => ({
  type: GET_INTERFACE_COUNT_SUCCESS,
  payload: data,
});

export const getInterfacecountFail = (error) => ({
  type: GET_INTERFACE_COUNT_FAIL,
  payload: error,
});

export const getInterfacecountData = () => ({
  type: GET_INTERFACE_COUNT,
});
// DPBSTAT
export const getDPBSTATSuccess = (data) => ({
  type: GET_DPBSTAT_SUCCESS,
  payload: data,
});

export const getDPBSTATFail = (error) => ({
  type: GET_DPBSTAT_FAIL,
  payload: error,
});

export const getDPBSTATData = () => ({
  type: GET_DPBSTAT,
});
