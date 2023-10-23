import {
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  dashboardData: [],
};

const Dashboard_reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
      };
    case GET_DASHBOARD_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Dashboard_reducer;
