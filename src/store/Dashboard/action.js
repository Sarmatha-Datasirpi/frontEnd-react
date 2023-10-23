import {
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAIL,
  GET_DASHBOARD_DATA,
} from "./actionTypes";

export const getDashboardDataSuccess = (data) => ({
  type: GET_DASHBOARD_DATA_SUCCESS,
  payload: data,
});
export const getDashboardDataFail = (error) => ({
  type: GET_DASHBOARD_DATA_FAIL,
  payload: error,
});
export const getDashboardData = () => ({
  type: GET_DASHBOARD_DATA,
});
