import {
  GET_NODES_DATA_SUCCESS,
  GET_NODES_DATA_FAIL,
  GET_EDGES_DATA_SUCCESS,
  GET_EDGES_DATA_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  getNodesData: [],
  getEdgesData: [],
};

const TopologyViewerData = (state = INIT_STATE, action) => {
  // TOPOLOGY VIEWER
  switch (action.type) {
    // GET nodes data
    case GET_NODES_DATA_SUCCESS:
      return {
        ...state,
        getNodesData: action.payload,
      };

    case GET_NODES_DATA_FAIL:
      return {
        ...state,
        getNodesData: action.payload,
      };
    // GET edges data
    case GET_EDGES_DATA_SUCCESS:
      return {
        ...state,
        getEdgesData: action.payload,
      };

    case GET_EDGES_DATA_FAIL:
      return {
        ...state,
        getEdgesData: action.payload,
      };

    default:
      return state;
  }
};

export default TopologyViewerData;
