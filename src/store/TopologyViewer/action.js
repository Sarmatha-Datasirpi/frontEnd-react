import {
  GET_NODES_DATA_SUCCESS,
  GET_NODES_DATA_FAIL,
  GET_NODES_DATA,
  GET_EDGES_DATA_SUCCESS,
  GET_EDGES_DATA_FAIL,
  GET_EDGES_DATA,
} from "./actionTypes";

// Topology Viewer

// GET

// NODES
export const getNodesDataSuccess = (data) => ({
  type: GET_NODES_DATA_SUCCESS,
  payload: data,
});

export const getNodesDataFail = (error) => ({
  type: GET_NODES_DATA_FAIL,
  payload: error,
});

export const getNodesData = () => {
    return {
        type: GET_NODES_DATA,
      }
} 

// EDGES

export const getEdgesDataSuccess = (data) => ({
  type: GET_EDGES_DATA_SUCCESS,
  payload: data,
});

export const getEdgesDataFail = (error) => ({
  type: GET_EDGES_DATA_FAIL,
  payload: error,
});

export const getEdgesData = () => ({
  type: GET_EDGES_DATA
});
