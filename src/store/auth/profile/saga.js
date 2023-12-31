import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes";
import { profileSuccess, profileError } from "./actions";

import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/backend_helper";

function* editProfile({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtProfile, "/post-jwt-profile", {
        username: user.username,
        idx: user.idx,
      });
      yield put(profileSuccess(response));
    } else if (process.env.REACT_APP_API_URL) {
      const response = yield call(postFakeProfile, user);
      yield put(profileSuccess(response));
    }
  } catch (error) {
    yield put(profileError(error));
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
