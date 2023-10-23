import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
//Account Redux states
import {
  ADD_USER_DATA,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  DELETE_USER_DATA_BY_ID,
  GET_USER_DATA_BY_ID,
  CHANGE_PASSWORD,
} from "./actionType";
import {
  addUserSuccessful,
  addUserFail,
  getUserSuccess,
  getUserFail,
  deleteUserSuccess,
  deleteUserFail,
  updateUserFail,
  updateUserSuccess,
  getUserDataByIdFail,
  getUserDataByIdSuccess,
  changePasswordSuccess,
  changePasswordFail,
} from "./action";

//Include Both Helper File with needed methods
import {
  postFakeRegister,
  adduserData,
  getUserData,
  putUserData,
  deleteUserById,
  getUserDataById,
  changePassword,
} from "../../helpers/backend_helper";

// Is user register successfull then direct plot user in redux.
//toast.configure()
function* AddUser({ payload: user }) {
  try {
    const response = yield call(adduserData, user);
    yield put(addUserSuccessful(response));
    toast("Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addUserFail(error));
    toast(" Add user Failed", { autoClose: 3000 });
  }
}
function* onGetUser() {
  try {
    const response = yield call(getUserData);
    yield put(getUserSuccess(response));
  } catch (error) {
    yield put(getUserFail(error));
  }
}

function* onGetUserById({ payload: userId }) {
  try {
    const response = yield call(getUserDataById, userId);
    yield put(getUserDataByIdSuccess(response));
  } catch (error) {
    yield put(getUserDataByIdFail(error));
  }
}

function* deleteUsersDataById({ payload: userId }) {
  try {
    const response = yield call(deleteUserById, userId);
    yield put(deleteUserSuccess(response));
    if (response.lastadminuser === "yes") {
      toast.error("Cannaot be Deleted (Last Admin User)", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(response.message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        //hideProgressBar: true,
      });

    }
  } catch (error) {
    yield put(deleteUserFail(error));
    toast.error("Deletion Failed", {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
      //hideProgressBar: false,
    });
  }
}

function* onUpdateUser({ payload: userdata }) {
  try {
    const response = yield call(putUserData, userdata);
    yield put(updateUserSuccess(response));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* onChangePassword({ payload: userdata }) {
  try {
    const response = yield call(changePassword, userdata);
    yield put(changePasswordSuccess(response));
  } catch (error) {
    yield put(changePasswordFail(error));
  }
}

export function* watchUser() {
  yield takeEvery(ADD_USER_DATA, AddUser);
}

export function* watchGetUser() {
  yield takeEvery(GET_USER_DATA, onGetUser);
}

export function* watchGetuserbyid() {
  yield takeEvery(GET_USER_DATA_BY_ID, onGetUserById);
}

export function* watchDeleteUserDataById() {
  yield takeEvery(DELETE_USER_DATA_BY_ID, deleteUsersDataById);
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER_DATA, onUpdateUser);
}
export function* watchchangepassword() {
  yield takeEvery(CHANGE_PASSWORD, onChangePassword);
}
function* accountSaga() {
  yield all([fork(watchUser)]);
  yield all([fork(watchGetUser)]);
  yield all([fork(watchDeleteUserDataById)]);
  yield all([fork(watchUpdateUser)]);
  yield all([fork(watchGetuserbyid)]);
  yield all([fork(watchchangepassword)]);
}
export default accountSaga;
