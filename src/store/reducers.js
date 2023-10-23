import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

// Device Management
import { addMapsReducers, DashboardManagement } from "./PacketProker/reducer";

import PacketProker_reducer from "./PacketProker/reducer";

import TopologyViewerData from "./TopologyViewer/reducer";

import Interface_reducer from "./Interfaces/reducer";
//API Key
import APIKey from "./apikey/reducer";

// Devices
import DevicesListData from "./DevicesList/reducer";

// XConnect
import XConnect_Reducer from "./XConnect/reducer";

//Users Management
import Users from "./user/reducer";

//Topology Logs
import TopologyLogsData from "./TopologyLogs/reducer"

//Dashboard 
import Dashboard_reducer from "./Dashboard/reducer";

import OpticalMonitor_reducer from "./OpticalManagement/reducer";



const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  // NMS
  PacketProker_reducer,
  TopologyViewerData,
  Interface_reducer,
  DevicesListData,
  XConnect_Reducer,
  Users,
  TopologyLogsData,
  Dashboard_reducer,
  OpticalMonitor_reducer
});

export default rootReducer;
