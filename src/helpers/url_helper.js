export const ENVIRONMENT_URL = "http://localhost:8081";
export const DOMAIN = "localhost";
export const PROTOCOL = "http";
export const PORT_8081 = 8081;
export const PORT_8082 = 8082;
//REGISTER
export const POST_FAKE_REGISTER = "/api/auth/signup";

//LOGIN
export const POST_FAKE_LOGIN = "/api/auth/signin"; //api/auth/signin
export const POST_FAKE_JWT_LOGIN = "/api/auth/signin"; //post-jwt-login
export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/user";

// Calendar
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// Chat
export const GET_DIRECT_CONTACT = "/chat";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "add/message";
export const GET_CHANNELS = "/channels";
export const DELETE_MESSAGE = "delete/message";

//Mailbox
export const GET_MAIL_DETAILS = "/mail";
export const DELETE_MAIL = "/delete/mail";

// Ecommerce
// Product
export const GET_PRODUCTS = "/apps/product";
export const DELETE_PRODUCT = "/apps/product";
export const ADD_NEW_PRODUCT = "/apps/product";
export const UPDATE_PRODUCT = "/apps/product";

// Orders
export const GET_ORDERS = "/apps/order";
export const ADD_NEW_ORDER = "/apps/order";
export const UPDATE_ORDER = "/apps/order";
export const DELETE_ORDER = "/apps/order";

// Customers
export const GET_CUSTOMERS = "/apps/customer";
export const ADD_NEW_CUSTOMER = "/apps/customer";
export const UPDATE_CUSTOMER = "/apps/customer";
export const DELETE_CUSTOMER = "/apps/customer";

// Sellers
export const GET_SELLERS = "/sellers";

// Project list
export const GET_PROJECT_LIST = "/project/list";

// Task
export const GET_TASK_LIST = "/apps/task";
export const ADD_NEW_TASK = "/apps/task";
export const UPDATE_TASK = "/apps/task";
export const DELETE_TASK = "/apps/task";

// CRM
// Conatct
export const GET_CONTACTS = "/apps/contact";
export const ADD_NEW_CONTACT = "/apps/contact";
export const UPDATE_CONTACT = "/apps/contact";
export const DELETE_CONTACT = "/apps/contact";

// Companies
export const GET_COMPANIES = "/apps/company";
export const ADD_NEW_COMPANIES = "/apps/company";
export const UPDATE_COMPANIES = "/apps/company";
export const DELETE_COMPANIES = "/apps/company";

// Lead
export const GET_LEADS = "/apps/lead";
export const ADD_NEW_LEAD = "/apps/lead";
export const UPDATE_LEAD = "/apps/lead";
export const DELETE_LEAD = "/apps/lead";

// Deals
export const GET_DEALS = "/deals";

// Crypto
export const GET_TRANSACTION_LIST = "/transaction-list";
export const GET_ORDRER_LIST = "/order-list";

// Invoice
export const GET_INVOICES = "/apps/invoice";
export const ADD_NEW_INVOICE = "/apps/invoice";
export const UPDATE_INVOICE = "/apps/invoice";
export const DELETE_INVOICE = "/apps/invoice";

// TicketsList
export const GET_TICKETS_LIST = "/apps/ticket";
export const ADD_NEW_TICKET = "/apps/ticket";
export const UPDATE_TICKET = "/apps/ticket";
export const DELETE_TICKET = "/apps/ticket";

// Dashboard Analytics

// Sessions by Countries
export const GET_ALL_DATA = "/all-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

// Audiences Metrics
export const GET_ALLAUDIENCESMETRICS_DATA = "/allAudiencesMetrics-data";
export const GET_MONTHLYAUDIENCESMETRICS_DATA = "/monthlyAudiencesMetrics-data";
export const GET_HALFYEARLYAUDIENCESMETRICS_DATA =
  "/halfyearlyAudiencesMetrics-data";
export const GET_YEARLYAUDIENCESMETRICS_DATA = "/yearlyAudiencesMetrics-data";

// Users by Device
export const GET_TODAYDEVICE_DATA = "/todayDevice-data";
export const GET_LASTWEEKDEVICE_DATA = "/lastWeekDevice-data";
export const GET_LASTMONTHDEVICE_DATA = "/lastMonthDevice-data";
export const GET_CURRENTYEARDEVICE_DATA = "/currentYearDevice-data";

// Audiences Sessions by Country
export const GET_TODAYSESSION_DATA = "/todaySession-data";
export const GET_LASTWEEKSESSION_DATA = "/lastWeekSession-data";
export const GET_LASTMONTHSESSION_DATA = "/lastMonthSession-data";
export const GET_CURRENTYEARSESSION_DATA = "/currentYearSession-data";

// Dashboard CRM

// Balance Overview
export const GET_TODAYBALANCE_DATA = "/todayBalance-data";
export const GET_LASTWEEKBALANCE_DATA = "/lastWeekBalance-data";
export const GET_LASTMONTHBALANCE_DATA = "/lastMonthBalance-data";
export const GET_CURRENTYEARBALANCE_DATA = "/currentYearBalance-data";

// Deal type
export const GET_TODAYDEAL_DATA = "/todayDeal-data";
export const GET_WEEKLYDEAL_DATA = "/weeklyDeal-data";
export const GET_MONTHLYDEAL_DATA = "/monthlyDeal-data";
export const GET_YEARLYDEAL_DATA = "/yearlyDeal-data";

// Sales Forecast

export const GET_OCTSALES_DATA = "/octSales-data";
export const GET_NOVSALES_DATA = "/novSales-data";
export const GET_DECSALES_DATA = "/decSales-data";
export const GET_JANSALES_DATA = "/janSales-data";

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = "/allRevenue-data";
export const GET_MONTHREVENUE_DATA = "/monthRevenue-data";
export const GET_HALFYEARREVENUE_DATA = "/halfYearRevenue-data";
export const GET_YEARREVENUE_DATA = "/yearRevenue-data";

// Dashboard Crypto
// Portfolio
export const GET_BTCPORTFOLIO_DATA = "/btcPortfolio-data";
export const GET_USDPORTFOLIO_DATA = "/usdPortfolio-data";
export const GET_EUROPORTFOLIO_DATA = "/euroPortfolio-data";

// Market Graph
export const GET_ALLMARKETDATA_DATA = "/allMarket-data";
export const GET_YEARMARKET_DATA = "/yearMarket-data";
export const GET_MONTHMARKET_DATA = "/monthMarket-data";
export const GET_WEEKMARKET_DATA = "/weekMarket-data";
export const GET_HOURMARKET_DATA = "/hourMarket-data";

// Dashboard Crypto
// Project Overview
export const GET_ALLPROJECT_DATA = "/allProject-data";
export const GET_MONTHPROJECT_DATA = "/monthProject-data";
export const GET_HALFYEARPROJECT_DATA = "/halfYearProject-data";
export const GET_YEARPROJECT_DATA = "/yearProject-data";

// Project Status
export const GET_ALLPROJECTSTATUS_DATA = "/allProjectStatus-data";
export const GET_WEEKPROJECTSTATUS_DATA = "/weekProjectStatus-data";
export const GET_MONTHPROJECTSTATUS_DATA = "/monthProjectStatus-data";
export const GET_QUARTERPROJECTSTATUS_DATA = "/quarterProjectStatus-data";

// Dashboard NFT
// Marketplace
export const GET_ALLMARKETPLACE_DATA = "/allMarketplace-data";
export const GET_MONTHMARKETPLACE_DATA = "/monthMarketplace-data";
export const GET_HALFYEARMARKETPLACE_DATA = "/halfYearMarketplace-data";
export const GET_YEARMARKETPLACE_DATA = "/yearMarketplace-data";

// Project
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

// Pages > Team
export const GET_TEAMDATA = "/teamData";
export const DELETE_TEAMDATA = "/delete/teamData";
export const ADD_NEW_TEAMDATA = "/add/teamData";
export const UPDATE_TEAMDATA = "/update/teamData";

// File Manager
// Folder
export const GET_FOLDERS = "/folder";
export const DELETE_FOLDER = "/delete/folder";
export const ADD_NEW_FOLDER = "/add/folder";
export const UPDATE_FOLDER = "/update/folder";

// File
export const GET_FILES = "/file";
export const DELETE_FILE = "/delete/file";
export const ADD_NEW_FILE = "/add/file";
export const UPDATE_FILE = "/update/file";

// To do
export const GET_TODOS = "/todo";
export const DELETE_TODO = "/delete/todo";
export const ADD_NEW_TODO = "/add/todo";
export const UPDATE_TODO = "/update/todo";

// To do Project
export const GET_PROJECTS = "/projects";
export const ADD_NEW_TODO_PROJECT = "/add/project";

//JOB APPLICATION
export const GET_APPLICATION_LIST = "/application-list";

//JOB APPLICATION
export const GET_API_KEY = "/api-key";

// Map Operations
export const ADD_MAPS_URL = "/maps/1";
export const GET_DEMO_DATA = "https://jsonplaceholder.typicode.com/users";
export const GET_MAP_CONFIG_DATA = "http://127.0.0.1:8081/map";
export const SET_MAP_CONFIG_DATA = "http://127.0.0.1:8081/map";

// Packet Broker Interfaces List
export const GET_PACKET_BROKER_INTERFACES_DATA =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/map/list`;
export const SET_PACKET_BROKER_INTERFACES_DATA =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/coordinates`;

// Map
export const GET_MAP_DATA = "http://172.27.1.106:8090/maps";
export const SET_MAP_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/map`;
export const UPDATE_MAP_DATA = "http://172.27.1.106:8090/maps/<map-id>";
export const DELETE_MAP_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/map`;
// Rules
export const GET_RULE_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/rule/list`;
export const GET_RULE_DATA_BY_ID = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/rule/id`;
export const SET_RULE_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/rule`;
export const UPDATE_RULE_DATA = "";
export const DELETE_RULE_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/rule`;
// Port Channel

export const GET_PORTCHANNEL_DATA = "http://172.27.1.106:8090/channelgroup";
export const SET_PORTCHANNEL_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/port-channel`;
export const UPDATE_PORTCHANNEL_DATA = "http://172.27.1.106:8090/channelgroup";
export const DELETE_PORTCHANNEL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/port-channel`;
export const DELETE_PORTCHANNEL_ALL_MEMBERS =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/port-channel`;
export const DELETE_PORTCHANNEL_PARTICULAR_MEMBERS = "http://172.27.1.106:8090";
// Interface counter
export const GET_INTERFACE_COUNT = "http://172.27.1.106:8090/intfcounter";
// DPBSTAT
export const GET_DPBSTAT = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/dpbstat`;
// TOPOLOGY VIEWER
export const GET_NODES_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/nodes`;
export const GET_EDGES_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/links`;
//export const GET_DPBSTAT = "http://172.26.1.129:8090/dpbstat";

// Devices List
export const GET_DEVICES_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device`;
export const DELETE_DEVICES_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device`;
export const UPDATE_DEVICE_SETTING = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device`;
export const GET_DEVICE_INFO_FILTER =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/process/info`;
export const GET_SYSTEM_INFO_FILTER =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/system/info`;
export const GET_STATS_INFO_FILTER =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/interface/statistics`;
export const DELETE_STATS_INFO_FILTER =
`${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/clear/interface-counters`;
// Interfaces List
export const GET_INTERFACES_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/id`;
export const UPDATE_INTERFACES_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/interfaces/update`;
export const GET_INTERFACE_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/interfaces`;

//Register Device
export const REGISTER_DEVICE_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/register`;
// X-Connect Interfaces List
export const GET_X_CONNECT_INTERFACES_DATA =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/operation/coordinates/deviceId`;
export const SET_X_CONNECT_INTERFACES_DATA =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/operation/coordinates`;
// X-Connect X-Connect List
export const GET_X_CONNECT_DATA =
  `${PROTOCOL}://${DOMAIN}:${PORT_8081}/operation/xconnect/deviceId`;
export const SET_X_CONNECT_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/operation/xconnect`;
export const DELETE_X_CONNECT_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/operation/xconnect`;

// User
export const GET_USER_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/user`;
export const GET_USER_DATA_BY_ID = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/user`;
export const SET_USER_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/api/auth/signup`;
export const PUT_USER_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/user`;
export const DELETE_USER_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/user`;
export const ADD_USER_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/api/auth/signup`;
export const CHANGE_PASSWORD = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/user`;
//Events

export const GET_ALARM_EVENTS_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`;

export const DELETE_ALARM_EVENTS_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`;
//Alarms

export const GET_ALARMS_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/alarms`;

//Syslog Data
export const GET_SYSLOG_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarms`;

//Dashboard
export const GET_DASHBOARD_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/dashboard`;

//Optical Monitor List
export const GET_OPTICAL_MONITOR_DATA = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/optical-monitoring/info`;

//Device  Historical Info
export const SET_DEVICE_HISTORICAL_INFO = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/custom/graph`;

//Get Custum Graph List
export const GET_DEVICE_CUSTOM_GRAPH_LIST = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/custom/graph/list`;


//Add OID for Graph
export const CREAT_CUSTUM_OID_LIST = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/custom/oid`;

//Get OID list 
export const GET_OID_LIST = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/custom/oid/list`;

export const DELETE_OID_LIST = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/custom/oid`;
//Device Polling Interval
export const SET_DEVICE_POLLING_INTERVAL = `${PROTOCOL}://${DOMAIN}:${PORT_8082}/scheduler/device/start?expression=`;

//Device Process Interval
export const SET_DEVICE_PROCESS_INTERVAL = `${PROTOCOL}://${DOMAIN}:${PORT_8082}/scheduler/process/start?expression=`;

//Device Polling
export const SET_DEVICE_POLLING = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/polling`;

//Device Polling
export const GET_DEVICE_POLLING = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/polling/list`;

//Device Credentials
export const GET_DEVICE_CREDENTIALS = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/info`;

//Verify License key 

export const VERIFY_LICENSE_KEY = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/license`;

// Reboot Device 

export const REBOOT_DEVICE = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/reboot`;

//Ocnos LDB Instance 

export const OCNOS_LDP_INSTANCE = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/ocnos/ldp/instance`;

//Ocnos LDB Interface

export const OCNOS_LDP_INTERFACE = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/ocnos/ldp/interface`;

//SERVR DEVICE MGMT IP FOR SYSLOG
export const SYSLOG_MGMT_IP = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/syslog_server`;

export const DEVICE_ALARMS_EVENT_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`;

export const GET_DEVICE_ALARMS_EVENT_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`;

export const DELETE_ALL_DEVICE_ALARMS_EVENT_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarms`;

export const DELETE_PARTICULAR_ALARMS_EVENT_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`;

export const DELETE_PARTICULAR_DEVICE_ALL_DEVICE_ALARMS_EVENT_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`;

export const POST_DEVICE_ALARMS_EVENT_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`;

export const POST_DEVICE_LOGS_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarms`;

export const OCNOS_ISIS_DELETE = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/delete`;

export const OCNOS_ISIS_UPDATE = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/update`;

export const OCNOS_ISIS_POST = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/post`;

export const OCNOS_ISIS_GET_URL = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/ocnos/isis/list`;