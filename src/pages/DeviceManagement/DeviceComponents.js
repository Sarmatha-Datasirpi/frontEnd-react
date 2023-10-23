import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledTooltip,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import DeviceOverview from "./DeviceOverview";
import Peripherals from "./Peripherals";
import Interface from "../Routing/Interface";
import OpticalMonitoring from "./opticalMonitoring";
import TrafficStats from "./TrafficStats";
import { useParams } from "react-router-dom";
import DeviceSetting from "./DeviceSetting";

import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../store/user/action";
import SyslogyLogs_logs from "./syslog_logs";
import SyslogyLogs_alarms from "./syslogs_alarms";
import AlarmsCongifTab from "./Alarmsconfig/Alarm_Form_Table";

import PocketBrockerMaplist from "../Routing/PacketProker/packetBrocker";
import { PORT_8081, PROTOCOL, DOMAIN } from "../../helpers/url_helper";
import Error_500 from "../Errors/ErrorModals/Error_500";
import Error_index from "../Errors/ErrorModals/Error_index";
import CheckPortStatus from "./Port_Status";
import PortChecker from "../Experimental/PortScanner";
import ReviewSlider from "../../Components/Common/ReviewSlider";
import Widgets from "../../pages/APIKey/Widgets";
const DeviceComponents = (props) => {
  const dispatch = useDispatch();
  const deviceId = useParams().id;
  const deviceName = useParams().osVersion;
  const history = useNavigate();
  const [arrowNavTab, setarrowNavTab] = useState("1");
  const [deviceSettingModal, setDeviceSettingModal] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [devices, setDevices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchDevices();
  }, []);

  const arrowNavToggle = (tab) => {
    if (arrowNavTab !== tab) {
      setarrowNavTab(tab);
    }
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  const handleDeviceSettingModal = () => {
    setDeviceSettingModal(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${PROTOCOL}://${DOMAIN}:${PORT_8081}/device`);
      if (!response.ok) {
        throw new Error("Failed to fetch device data");
      }
      const items = await response.json();
      setDevices(items);
    } catch (error) {
      console.error("Error fetching device data:", error);
      // Handle the error state or display an error message to the user
    }
  };

  const { user, success, error } = useSelector((state) => ({
    user: state.Profile.user,
    success: state.Profile.success,
    error: state.Profile.error,
  }));

  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));

      if (!isEmpty(user)) {
        obj.data.username = user.username;
        sessionStorage.removeItem("authUser");
        sessionStorage.setItem("authUser", JSON.stringify(obj));
      }
      setUserId(obj.id);
      setUserName(obj.username);
      setRole(obj.roles);
    }
  }, [user]);

  const { usersDataList } = useSelector((state) => ({
    usersDataList: state.Users.usersDataList,
  }));
  const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
  const sessionUserId = sessionstoragedata.id;
  const sessionUsername = sessionstoragedata.username;

  const currentUser = usersDataList.find(
    (user) => user.username === sessionUsername
  );

  const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");

  const currentDevice = devices.find((device) => device.deviceId === deviceId);
  const hidePacketBroker =
    currentDevice && currentDevice.osVersion === "goldstone";
  const hideXConnect = currentDevice && currentDevice.osVersion === "sonic";
  const hidePacketBrokerAndXConnect =
    currentDevice && currentDevice.osVersion === "ocnos";
  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-between">
          <Col className="fs-3 d-flex align-items-center gap-2">
            <span>
              {" "}
              <b>Device ID :</b> {deviceId}
            </span>
            <span
              className="text-primary"
              onClick={() => history("/devices")}
              id="backButton"
            >
              {" "}
              <i class="ri-arrow-left-circle-line fs-1"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="backButton">
              Back to Devices{" "}
            </UncontrolledTooltip>
          </Col>

          {isAdmin && (
            <Col className="d-flex justify-content-end">
              <div
                className="col-auto"
                onClick={() => handleDeviceSettingModal()}
              >
                <i
                  class="ri-settings-3-line fs-3 bg-warning rounded p-2"
                  id="deviceSetting"
                ></i>
                <UncontrolledTooltip placement="bottom" target="deviceSetting">
                  Device Setting
                </UncontrolledTooltip>
              </div>
            </Col>
          )}
          <hr />
        </Row>
        <Row>
          <Col xxl={12}>
            {/* <h5 className="mb-3">Arrow Nav tabs</h5> */}
            <Card>
              <CardBody>
                <Nav
                  pills
                  className="nav nav-pills arrow-navtabs nav-success bg-light mb-3"
                >
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: arrowNavTab === "1",
                      })}
                      onClick={() => {
                        arrowNavToggle("1");
                      }}
                    >
                      Overview
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: arrowNavTab === "14",
                      })}
                      onClick={() => {
                        arrowNavToggle("14");
                      }}
                    >
                      Error 500
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: arrowNavTab === "6",
                      })}
                      onClick={() => {
                        arrowNavToggle("6");
                      }}
                    >
                      Peripherals
                    </NavLink>
                  </NavItem>
                  {deviceName.includes(["goldstone"]) ? (
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "2",
                        })}
                        onClick={() => {
                          arrowNavToggle("2");
                        }}
                      >
                        Optical Monitor
                      </NavLink>
                    </NavItem>
                  ) : (
                    ""
                  )}
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: arrowNavTab === "3",
                      })}
                      onClick={() => {
                        arrowNavToggle("3");
                      }}
                    >
                      Interface
                    </NavLink>
                  </NavItem>
                  {!hidePacketBrokerAndXConnect && (
                    <>
                      {/* {!hideXConnect && (
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: arrowNavTab === "4",
                            })}
                            onClick={() => {
                              arrowNavToggle("4");
                            }}
                          >
                            XConnect
                          </NavLink>
                        </NavItem>
                      )} */}
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: arrowNavTab === "7",
                          })}
                          onClick={() => {
                            arrowNavToggle("7");
                          }}
                        >
                          Traffic Stats
                        </NavLink>
                      </NavItem>
                      {!hidePacketBroker && (
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: arrowNavTab === "5",
                            })}
                            onClick={() => {
                              arrowNavToggle("5");
                            }}
                          >
                            PacketBroker
                          </NavLink>
                        </NavItem>
                      )}
                    </>
                  )}
                  {/* <NavItem>
                    <select
                      className="btn  custom-toggle"
                      style={{
                        backgroundColor: "#f3f6f9",
                        color: "#333",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      <option onClick={() => {
                        arrowNavToggle("14");
                      }}>Alarm Configuration</option>
                      <option onClick={() => arrowNavToggle("13")}>Alarms</option>
                      <option onClick={() => arrowNavToggle("12")}>Logs</option>

                    </select>
                  </NavItem> */}


                  {/* <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: arrowNavTab === "8",
                      })}
                      onClick={() => {
                        arrowNavToggle("8");
                      }}
                    >
                      Settings
                    </NavLink>
                  </NavItem> */}
                  {/* {deviceName === "ocnos" && (
                    <>
                      <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "8",
                        })}
                        onClick={() => {
                          arrowNavToggle("8");
                        } }
                      >
                        IF
                      </NavLink>
                    </NavItem> 
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: arrowNavTab === "8",
                          })}
                          onClick={() => {
                            arrowNavToggle("8");
                          }}
                        >
                          OSPF
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: arrowNavTab === "9",
                          })}
                          onClick={() => {
                            arrowNavToggle("9");
                          }}
                        >
                          ISIS
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: arrowNavTab === "10",
                          })}
                          onClick={() => {
                            arrowNavToggle("10");
                          }}
                        >
                          LDP
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: arrowNavTab === "11",
                          })}
                          onClick={() => {
                            arrowNavToggle("11");
                          }}
                        >
                          L2VPN
                        </NavLink>
                      </NavItem>
                    </>
                  )} */}
                  {/* <NavItem>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle >
                        Troubleshoot <IoIosArrowDropdown />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: arrowNavTab === "12",
                            })}
                            onClick={() => {
                              arrowNavToggle("12");
                            }}
                          >
                            Logs
                          </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: arrowNavTab === "13",
                            })}
                            onClick={() => {
                              arrowNavToggle("13");
                            }}
                          >
                            Alarms
                          </NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem> */}
                  <NavItem>
                    <UncontrolledDropdown direction="down">
                      <DropdownToggle
                        caret
                        className="btn  custom-toggle"
                        style={{
                          backgroundColor: "#f3f6f9",
                          color: "#333",
                          outline: "none",
                          border: "none",
                        }}
                      >
                        Troubleshoot
                      </DropdownToggle>
                      <DropdownMenu
                        style={{
                          backgroundColor: "#ffffff",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                          padding: "0px 0",
                          width: "90%",
                        }}
                      >
                        <DropdownItem>
                          <NavLink
                            style={{
                              cursor: "pointer",
                              color: "#333",
                              display: "block",
                              padding: "8px 20px",
                              backgroundColor:
                                arrowNavTab === "14"
                                  ? "#0AB39C"
                                  : "transparent",
                              fontWeight:
                                arrowNavTab === "14" ? "bold" : "normal",
                            }}
                            onClick={() => {
                              arrowNavToggle("14");
                            }}
                          >
                            Alarms Config
                          </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink
                            style={{
                              cursor: "pointer",
                              color: "#333",
                              display: "block",
                              padding: "8px 20px",
                              backgroundColor:
                                arrowNavTab === "12"
                                  ? "#0AB39C"
                                  : "transparent",
                              fontWeight:
                                arrowNavTab === "12" ? "bold" : "normal",
                            }}
                            onClick={() => {
                              arrowNavToggle("12");
                            }}
                          >
                            Logs
                          </NavLink>
                        </DropdownItem>
                        {/* <DropdownItem divider /> */}
                        <DropdownItem>
                          <NavLink
                            style={{
                              cursor: "pointer",
                              color: "#333",
                              display: "block",
                              padding: "8px 20px",
                              backgroundColor:
                                arrowNavTab === "13"
                                  ? "#0AB39C"
                                  : "transparent",
                              fontWeight:
                                arrowNavTab === "13" ? "bold" : "normal",
                            }}
                            onClick={() => {
                              arrowNavToggle("13");
                            }}
                          >
                            Alarms
                          </NavLink>
                        </DropdownItem>

                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: arrowNavTab === "15",
                      })}
                      onClick={() => {
                        arrowNavToggle("15");
                      }}
                    >
                      Event Listener
                    </NavLink>
                  </NavItem> */}
                </Nav>

                <TabContent activeTab={arrowNavTab} className="text-muted">
                  <TabPane tabId="1" id="arrow-overview">
                    {arrowNavTab == 1 ? <DeviceOverview /> : ""}
                  </TabPane>
                  <TabPane tabId="6" id="arrow-overview">
                    {arrowNavTab == 6 ? (
                      <Peripherals deviceId={deviceId} />
                    ) : (
                      ""
                    )}
                  </TabPane>
                  <TabPane tabId="2" id="arrow-overview">
                    {arrowNavTab == 2 ? <OpticalMonitoring /> : ""}
                  </TabPane>
                  <TabPane tabId="3" id="arrow-profile">
                    {/* <DeviceInterface /> */}
                    {arrowNavTab == 3 ? <Interface deviceId={deviceId} /> : ""}
                  </TabPane>
                  <TabPane tabId="4" id="arrow-contact">
                    {/* <DeviceXconnect /> */}
                    {/* {hideXConnect ? null : arrowNavTab == 4 ? (
                      <XConnectSetup deviceId={deviceId} />
                    ) : (
                      ""
                    )} */}
                  </TabPane>
                  <TabPane tabId="5" id="arrow-contact">
                    {/* <DevicePacketBroker /> */}
                    {hidePacketBroker ? null : arrowNavTab == 5 ? (
                      // <PacketProkerSetup deviceId={deviceId} />
                      <PocketBrockerMaplist />
                    ) : (
                      ""
                    )}
                  </TabPane>
                  <TabPane tabId="7" id="arrow-contact">
                    {/* <DevicePacketBroker /> */}
                    {arrowNavTab == 7 ? (
                      <TrafficStats deviceId={deviceId} />
                    ) : (
                      ""
                    )}
                  </TabPane>
                  <TabPane tabId="11" id="arrow-contact">
                    {/* {arrowNavTab == 11 ? <OcnosL2Vpn /> : ""} */}
                  </TabPane>
                  <TabPane tabId="8" id="arrow-contact">
                    {/* {arrowNavTab == 8 ? <OcnosOspf /> : ""} */}
                  </TabPane>
                  <TabPane tabId="9" id="arrow-contact">
                    {/* {arrowNavTab == 9 ? <OcnosIsis /> : ""} */}
                  </TabPane>
                  <TabPane tabId="10" id="arrow-contact">
                    {/* {arrowNavTab == 10 ? <OcnosLdf /> : ""} */}
                  </TabPane>
                  <TabPane tabId="12" id="arrow-overview">
                    {arrowNavTab == 12 ? <SyslogyLogs_logs /> : ""}
                  </TabPane>
                  <TabPane tabId="13" id="arrow-overview">
                    {arrowNavTab == 13 ? <SyslogyLogs_alarms /> : ""}
                  </TabPane>
                  <TabPane tabId="14" id="arrow-contact">
                    {arrowNavTab == 14 ? <AlarmsCongifTab /> : ""}
                  </TabPane>
                  <TabPane tabId="15" id="arrow-contact">
                    {arrowNavTab == 15 ? <Widgets /> : ""}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        isOpen={deviceSettingModal}
        toggle={() => setDeviceSettingModal(!deviceSettingModal)}
      >
        <ModalHeader toggle={() => setDeviceSettingModal(!deviceSettingModal)}>
          <label>Device Setting</label>
        </ModalHeader>
        <ModalBody>
          <DeviceSetting
            deviceSettingModal={deviceSettingModal}
            setDeviceSettingModal={setDeviceSettingModal}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default DeviceComponents;
