import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  ADD_USER_DATA,
  ADD_USER_DATA_SUCCESS,
  ADD_USER_DATA_FAIL,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  DELETE_USER_DATA_BY_ID,
  DELETE_USER_DATA_SUCCESS_BY_ID,
  DELETE_USER_DATA_FAIL_BY_ID,
  GET_USER_DATA_BY_ID_SUCCESS,
  GET_USER_DATA_BY_ID_FAIL,
  GET_USER_DATA_BY_ID,
} from "./actionType";

const INIT_STATE = {
  usersDataList: [],
  editUserData: [],
  deleteUserDataList: [],
  updateUserDataList: [],
  changePassword: [],
  error: {},
};

const Users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        usersDataList: action.payload,
      };

    case GET_USER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_USER_DATA_SUCCESS_BY_ID:
      return {
        ...state,
        deleteUserDataList: action.payload,
      };

    case DELETE_USER_DATA_FAIL_BY_ID:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        editUserData: action.payload,
      };

    case GET_USER_DATA_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        updateUserDataList: action.payload,
      };
    case UPDATE_USER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: action.payload,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Users;
