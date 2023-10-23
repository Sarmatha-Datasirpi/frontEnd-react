import React from "react";
import { Navigate } from "react-router-dom";

import DashboardTopology from "../pages/DashboardTopology";
import Invenory from "../pages/DashboardInventory";
import PacketBroker from "../pages/Routing/PacketProker";
import Interface from "../pages/Routing/Interface";
import User from "../pages/User";
import XConnect from "../pages/Layer/XConnect";
import Home from "../pages/Home";
import DeviceManagement from "../pages/DeviceManagement";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import TopologyLogs from "../pages/DashboardTopology/TopologyLogs";
import NotificationDropdown from "../pages/DeviceManagement/syslogs_alarms"
import SyslogyLogs_alarms from "../pages/DeviceManagement/syslogs_alarms";
import SyslogyLogs_logs from "../pages/DeviceManagement/syslog_logs";
import SyslogyLogs_alarms_notification from "../pages/DeviceManagement/Syslog_alarms_notification"
import SyslogyLogs_Logs_notification from "../pages/DeviceManagement/SyslogyLogs_Logs_notification";
const authProtectedRoutes = [
  { path: "/index", component: <Invenory /> },
  { path: "/devices", component: <Invenory /> },
  { path: "/routing/packetproker", component: <PacketBroker /> },
  { path: "/routing/interface", component: <Interface /> },
  { path: "/user", component: <User /> },
  { path: "/layer/xconnect", component: <XConnect /> },
  { path: "/events", component: <TopologyLogs /> },
  { path: "/device/:id/:osVersion", component: <DeviceManagement /> },
  { path: "/logs", component: <SyslogyLogs_logs /> },
  { path: "/alarms", component: <SyslogyLogs_alarms /> },
  { path: "/All_alarms", component: <SyslogyLogs_alarms_notification /> },
  { path: "/All_Logs", component: <SyslogyLogs_Logs_notification /> },
  { path: "/profile", component: <UserProfile /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/devices" />,
  },
  { path: "*", component: <Navigate to="/devices" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
];

export { authProtectedRoutes, publicRoutes };
