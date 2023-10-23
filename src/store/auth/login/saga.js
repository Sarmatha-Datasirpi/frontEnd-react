import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/backend_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log(user);
      const response = yield call(postJwtLogin, {
        username: user.email,
        password: user.password,
      });
      console.log(response);
      sessionStorage.setItem("authUser", JSON.stringify(response));
      if (response) {
        yield put(loginSuccess(response));
        history("/devices");
      } else {
        yield put(apiError(response));
      }
    } else if (process.env.REACT_APP_API_URL) {
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      if (response.status === "success") {
        yield put(loginSuccess(response));
        history("/devices");
        sessionStorage.setItem("authUser", JSON.stringify(response));
      } else {
        yield put(apiError(response));
      }
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH != "firebase") {
      yield put(logoutUserSuccess(LOGOUT_USER, true));
    }
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
