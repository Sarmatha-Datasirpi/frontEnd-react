import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

//API Key
import APIKeysaga from "./apikey/saga";

// Device Management
import getMapSaga from "./PacketProker/saga";
import TopologySaga from "./TopologyViewer/saga";

import getInterfaceSaga from "./Interfaces/saga";

// Devices
import getDevicesSaga from "./DevicesList/saga";

// XConnect
import getXConnectSaga from "./XConnect/saga";

//Users Management
import accountSaga from "./user/saga";



//Topology logs
import getAlarmSaga from "./TopologyLogs/saga"

//Dashboard
import getDashboardSaga from "./Dashboard/saga";
import getOpticalMonitorData from "./OpticalManagement/saga";


export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),

    fork(APIKeysaga),
    fork(getMapSaga),
    fork(TopologySaga),
    fork(getInterfaceSaga),
    fork(getDevicesSaga),
    fork(getXConnectSaga),
    fork(accountSaga),
    fork(getAlarmSaga),
    fork(getDashboardSaga),
    fork(getOpticalMonitorData)
  ]);
}
