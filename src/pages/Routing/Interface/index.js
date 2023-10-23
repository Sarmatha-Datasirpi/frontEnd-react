import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getInterfaceData,
} from "../../../store/Interfaces/action";
import { Modals } from "../../Layer/XConnect/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../XConnect/App.css";
import PortUP from "../../../assets/images/device/port-green.png";
import PortDOWN from "../../../assets/images/device/port-red.png";
import QSPF from "../../../assets/images/device/qspf.png";
import { useParams } from "react-router-dom";
import { SimplePie } from "../../Charts/PieCharts";
const Interface = (props) => {
  document.title = "DPB-NMS | Interface";
  const dispatch = useDispatch();
  const deviceIpAddress = useParams().id;
  const deviceVersion = useParams().osVersion;
  const [goldstonemodalProps, setGoldstoneModalProps] = useState();
  const [modalProps, setModalProps] = useState({ section: "" });
  const [interfaceData, setInterfaceData] = useState([]);
  const [interfaceDataSearch, setInterfaceDataSearch] = useState([]);
  const [piuInterfaceData, setPiuInterfaceData] = useState([]);
  const [portChannelData, setportChannelData] = useState([]);
  const [rightColumn, setRightColumn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [deviceID, setDeviceID] = useState(deviceIpAddress);
  const [showDeviceSelection, setShowDeviceSelection] = useState(true);

  //redux data
  const interfaceDataSet = useSelector(
    (state) => state.Interface_reducer?.interfaceData
  );

  const upCount = interfaceDataSet?.interfaceList?.filter(
    (interfaces) => interfaces?.operationStatus?.toLowerCase() === "up"
  )?.length;

  const downCount = interfaceDataSet?.interfaceList?.filter(
    (interfaces) => interfaces?.operationStatus?.toLowerCase() === "down"
  )?.length;

  // const speedRanges = {
  //   "Less than 1 kbps - 1 Mbps": 0,
  //   "1 Mbps - 1 Gbps": 0,
  //   "1 Gbps - 1 Tbps": 0,
  //   "Others": 0,
  // };

  // interfaceDataSet.interfaceList.forEach((interfaces) => {
  //   const speed = interfaces.speed;
  //   if (speed) {
  //     const numericSpeed = parseFloat(speed); // Extract the numeric value from the speed
  //     const lowerCaseSpeed = speed?.toLowerCase(); // Convert to lowercase for case-insensitive comparison
  //     if (numericSpeed < 1) {
  //       speedRanges["Less than 1 kbps - 1 Mbps"]++;
  //     } else if (numericSpeed >= 1 && numericSpeed < 1000) {
  //       speedRanges["1 Mbps - 1 Gbps"]++;
  //     } else if (numericSpeed >= 1000 && numericSpeed < 1000000) {
  //       speedRanges["1 Gbps - 1 Tbps"]++;
  //     } else {
  //       speedRanges["Others"]++;
  //     }
  //   } else {
  //     speedRanges["Others"]++;
  //   }
  // });


  const speeds = interfaceDataSet?.interfaceList?.map((interfaces) =>
    interfaces?.speed?.toLowerCase()
  );

  const speedCounts = speeds?.reduce((acc, speed) => {
    acc[speed] = (acc[speed] || 0) + 1;
    return acc;
  }, {});

  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };


  const chosenDeviceInfo = (event, deviceInfo) => {
    setInterfaceData([]);
    setShowDeviceSelection(false);
    setDeviceInfo(deviceInfo);
    dispatch(getInterfaceData(deviceIpAddress));
  };

  useEffect(() => {
    dispatch(getInterfaceData(deviceIpAddress));
  }, [deviceIpAddress, showModal]);

  useEffect(() => {
    setInterfaceData(interfaceDataSet?.interfaceList);
    setInterfaceDataSearch(interfaceDataSet?.interfaceList);
    setPiuInterfaceData(interfaceDataSet?.piuList);
    setportChannelData(interfaceDataSet?.portChannelDTOList);
  }, [interfaceDataSet, showModal]);

  const [interfaceNodes, ups, downs] = [
    interfaceDataSet?.interfaceList?.length + interfaceDataSet?.piuList?.length,
    interfaceDataSet?.interfaceList?.filter(
      (interfaces) => interfaces.operation_status?.toLowerCase() === "up"
    ),
    interfaceDataSet?.interfaceList?.filter(
      (interfaces) => interfaces.operation_status?.toLowerCase() === "down"
    ),
  ];

  const searchByDeviceId = (val) => {
    if (!val) {
      setInterfaceData(interfaceDataSearch);
    } else {
      setInterfaceData(
        interfaceDataSearch?.filter((device) => device.name.includes(val))
      );
    }
  };
  const NoInterface = !interfaceDataSet?.interfaceList || interfaceDataSet.interfaceList.length === 0;

  return (
    <React.Fragment>
      <ToastContainer />
      <div>
        {/* {showDeviceSelection ? (
          <Container fluid>
            <Row>
              <Col className="col-xxl-12 order-xxl-0 order-first">
                <Row>
                  <Devices
                    showDeviceSelection={showDeviceSelection}
                    setShowDeviceSelection={setShowDeviceSelection}
                    filterDevice={filterDevice}
                    chosenDeviceInfo={chosenDeviceInfo}
                  />
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          ""
        )} */}

        {/* {!showDeviceSelection ? ( */}
        <>
          <Row className="mb-3 pb-1">
            <Col xs={12}>
              <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                <div className="flex-grow-1">
                  {/* <p className="text mb-0 fs-16">
                18 <i className="ri-arrow-up-line fs-20 text-success"></i>, 7
                <i className="ri-arrow-down-line fs-20 text-danger"></i>
              </p> */}
                </div>
                <div className="mt-3 mt-lg-0">
                  <form action="#">
                    <Row className="g-3 mb-0 align-items-center">
                      {/* <div className="col-sm-auto">
                    <div className="input-group">
                      <Flatpickr
                        className="form-control border-0 dash-filter-picker shadow"
                        options={{
                          mode: "range",
                          dateFormat: "d M, Y",
                          defaultDate: ["01 Jan 2022", "31 Jan 2022"],
                        }}
                      />
                      <div className="input-group-text bg-primary border-primary text-white">
                        <i className="ri-calendar-2-line"></i>
                      </div>
                    </div>
                  </div> */}
                      <div className="col-auto"></div>
                      <div className="col-auto">
                        <Col className="col-sm">
                          <div className="d-flex justify-content-sm-end">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control search"
                                placeholder="Search Interface Name"
                                id="searchdevicelist"
                                onChange={(e) =>
                                  searchByDeviceId(e.target.value)
                                }
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                          <UncontrolledTooltip
                            placement="bottom"
                            target="searchdevicelist"
                          >
                            Give Interface Name to search
                          </UncontrolledTooltip>
                        </Col>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-primary btn-icon waves-effect waves-light layout-rightside-btn"
                          onClick={(deviceInfo) =>
                            dispatch(getInterfaceData(deviceIpAddress))
                          }
                          id="tooltipBottom"
                        >
                          <i className="ri-refresh-line"></i>
                        </button>
                        <UncontrolledTooltip
                          placement="bottom"
                          target="tooltipBottom"
                        >
                          Refresh
                        </UncontrolledTooltip>
                      </div>
                    </Row>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
          {/* <div className="d-flex justify-content-end px-5 ">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowDeviceSelection(true);
                  setInterfaceData([]);
                }}
              >
                Choose Device
              </Button>
            </div> */}
        </>
        {/* ) : (
          ""
        )} */}
        {/* {interfaceDataSet?.interfaceList?.length > 0 && !showDeviceSelection ? ( */}
        <>
          {deviceVersion === "goldstone" && (
            <>
              {piuInterfaceData && piuInterfaceData?.length !== 0 && (
                <div className="mb-5">
                  <h1 style={{ paddingLeft: "15px" }}>
                    <b>Transponder</b>
                  </h1>
                  {/* Other transponder content */}
                </div>
              )}
              <div
                className="d-flex flex-wrap gap-3 justify-content-around px-2"
                style={{ minWidth: "218px !important" }}
              >
                {(piuInterfaceData || []).map((piu) => {
                  return (
                    <div
                      key={piu?.name}
                      className="border border-dark rounded-3 d-flex align-items-center p-2 interfaces-list"
                      // style={{
                      //   backgroundColor: '#ffffff',
                      //   transition: 'background-color 0.3s ease',
                      //   ':hover': {
                      //     backgroundColor: 'red',
                      //   }
                      // }}
                      onClick={() => {
                        setGoldstoneModalProps(piu);
                        setModalProps({ section: deviceVersion });
                        setDeviceID(deviceIpAddress);
                        setShowModal(true);
                      }}
                    >
                      <span className="ps-2">
                        <b>{/* <h5>{piu?.name}</h5> */}</b>
                      </span>
                      <div className="d-flex align-items-center flex-column justify-content-between">
                        <img src={QSPF} width={110} height={70} />
                        <div className="text-center">
                          <h5>{piu?.name}</h5>
                          {/* <p className="mb-0">&nbsp;</p> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <hr />
              </div>
            </>
          )}
          {interfaceData && interfaceData.length !== 0 && (
            <div className="mb-5">
              <h1 style={{ paddingLeft: "15px", marginTop: "-80px" }}>
                <span
                  style={{
                    position: "absolute",
                    marginTop: "35px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#777777",
                  }}
                >
                  Interfaces in the device. click on interface
                  to add/modify <br></br>configurations such as admin-state,
                  MTU, speed,etc....
                </span>
                <b>Interface</b>
              </h1>
            </div>
          )}
          <div className="mb-12"><>
            {!NoInterface && (
              <Row>
                <Col lg={6}>
                  <Card className="border border-3 rounded-3">
                    <CardHeader>
                      <div className="d-flex justify-content-between">
                        <span className="card-title mb-0">
                          Interface OperationStatus{" "}
                          <i class="ri-information-line" id="hardwareDistribution"></i>
                        </span>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <SimplePie
                        dataColors='["--vz-success", "--vz-danger"]'
                        label={["Up", "Down"]}
                        value={[upCount, downCount]}
                      />
                    </CardBody>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="hardwareDistribution"
                      innerClassName="tooltip-style"
                    >
                      Interface Status
                    </UncontrolledTooltip>
                  </Card>
                </Col>
                {/* <Col lg={4}>
          <Card className="border border-3 rounded-3">
            <CardHeader>
              <div className="d-flex justify-content-between">
                <span className="card-title mb-0">
                  Speed Bandwidth Distribution{" "}
                  <i class="ri-information-line" id="speedDistribution"></i>
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <SimplePie
                dataColors='["--vz-dark", "--vz-success", "--vz-primary", "--vz-danger"]'
                label={Object.keys(speedRanges)}
                value={Object.values(speedRanges)}
              />
            </CardBody>
            <UncontrolledTooltip
              placement="bottom"
              target="speedDistribution"
              innerClassName="tooltip-style"
            >
              Distribution of speed bandwidth
            </UncontrolledTooltip>
          </Card>
        </Col> */}

                <Col lg={6}>
                  <Card className="border border-3 rounded-3">
                    <CardHeader>
                      <div className="d-flex justify-content-between">
                        <span className="card-title mb-0">
                          Speed Distribution{" "}
                          <i class="ri-information-line" id="speedDistribution"></i>
                        </span>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <SimplePie
                        dataColors='["--vz-info", "--vz-success", "--vz-warning", "--vz-danger"]'
                        label={Object?.keys(speedCounts)}
                        value={Object?.values(speedCounts)}
                      />
                    </CardBody>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="speedDistribution"
                      innerClassName="tooltip-style"
                    >
                      Distribution of hardware speeds
                    </UncontrolledTooltip>
                  </Card>
                </Col>



              </Row>
            )}
          </></div>
          <div className="d-flex flex-wrap gap-3 justify-content-around px-2">
            {(interfaceData || []).map((interfaces) => {
              return (
                <div
                  key={`${interfaces?.name}-${interfaces?.operationStatus}`}

                  // className=" interfaces-list"
                  onClick={() => {
                    dispatch(getInterfaceData(deviceIpAddress));
                    // dispatch(
                    //   getInterfaceConfigDatas({
                    //     deviceId: deviceIpAddress,
                    //     interfaceName: interfaces.name,
                    //   })
                    // );
                    setGoldstoneModalProps(interfaces);
                    setModalProps({ section: deviceVersion });
                    setDeviceID(deviceIpAddress);
                    setShowModal(true);
                    setDeviceID(deviceIpAddress);
                  }}
                >
                  <div className="d-flex align-items-center flex-column justify-content-between">
                    {interfaces?.operationStatus?.toLowerCase() === "up" ? (
                      <img src={PortUP} width={70} height={70} />
                    ) : (
                      <img src={PortDOWN} width={70} height={70} />
                    )}
                    <div className="text-center">
                      <p className="mb-0">
                        <strong>{interfaces?.name}</strong>
                      </p>
                      <p
                        className={`mb-0 ${interfaces?.speed?.toLowerCase().includes('mbps')
                          ? 'mbps-color'
                          : interfaces?.speed?.toLowerCase().includes('kbps')
                            ? 'kbps-color'
                            : interfaces?.speed?.toLowerCase().includes('gbps')
                              ? 'gbps-color'
                              : 'primary-color'
                          }`}
                        style={{
                          color: interfaces?.speed?.toLowerCase().includes('mbps')
                            ? '#0096FF'
                            : interfaces?.speed?.toLowerCase().includes('kbps')
                              ? '#3A98B9'
                              : interfaces?.speed?.toLowerCase().includes('gbps')
                                ? '#BA704F'
                                : 'inherit',
                        }}
                      >
                        <strong>
                          {interfaces?.speed}
                        </strong>
                      </p>
                      <p className="mb-0">&nbsp;</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Modals
            showModal={showModal}
            setShowModal={setShowModal}
            modalProps={modalProps}
            goldstonemodalProps={goldstonemodalProps}
            deviceID={deviceID}
          // configuringMap={configuringMap}
          // configuringRule={configuringRule}
          />
        </>
        {/* ) : (
          ""
        )} */}
      </div>
      <div>
        <>
          {/* <Row className="mb-3 pb-1">
            <Col xs={12}>
              <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                <div className="flex-grow-1">
                </div>
                <div className="mt-3 mt-lg-0">
                  <form action="#">
                    <Row className="g-3 mb-0 align-items-center">
                      <div className="col-auto"></div>
                      <div className="col-auto">
                        <Col className="col-sm">
                          <div className="d-flex justify-content-sm-end">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control search"
                                placeholder="Search Interface Name"
                                id="searchdevicelist"
                                onChange={(e) =>
                                  searchByDeviceId(e.target.value)
                                }
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                          <UncontrolledTooltip
                            placement="bottom"
                            target="searchdevicelist"
                          >
                            Give Interface Name to search
                          </UncontrolledTooltip>
                        </Col>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-primary btn-icon waves-effect waves-light layout-rightside-btn"
                          onClick={(deviceInfo) =>
                            dispatch(getInterfaceData(deviceInfo?.deviceId))
                          }
                          id="tooltipBottom"
                        >
                          <i className="ri-refresh-line"></i>
                        </button>
                        <UncontrolledTooltip
                          placement="bottom"
                          target="tooltipBottom"
                        >
                          Refresh
                        </UncontrolledTooltip>
                      </div>
                    </Row>
                  </form>
                </div>
              </div>
            </Col>
          </Row> */}
          {/* <div className="d-flex justify-content-end px-5 ">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowDeviceSelection(true);
                  setInterfaceData([]);
                }}
              >
                Choose Device
              </Button>
            </div> */}
        </>

        <>

          {/* {portChannelData && portChannelData.length !== 0 && (
            <div className="mb-5">
              <h1 style={{ paddingLeft: "15px", marginTop: "-80px" }}>
                <span
                  style={{
                    position: "absolute",
                    marginTop: "35px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#777777",
                  }}
                >
                  Interfaces in the device. click on Portchannel
                  to add/modify <br></br>configurations such as admin-state,
                  MTU, speed,etc...
                </span>
                <b>Portchannel</b>
              </h1>
            </div>
          )} */}
          <div className="d-flex flex-wrap gap-3 justify-content-around px-2">
            {(portChannelData || []).map((portchannel) => {
              return (
                <div
                  key={portchannel}
                  onClick={() => {
                    // dispatch(
                    //   getInterfaceConfigDatas({
                    //     deviceId: deviceIpAddress,
                    //     : portchannel?.name,
                    //   })
                    // );
                    setGoldstoneModalProps(portchannel);
                    setModalProps({ portchannel, section: 'portchannel' });
                    setDeviceID(deviceIpAddress);
                    setShowModal(true);
                    setDeviceID(deviceIpAddress);
                  }}
                >
                  <div className="d-flex align-items-center flex-column justify-content-between">

                    <img src={portchannel?.adminStatus?.toLowerCase() === "up" ? PortUP : PortDOWN} width={70} height={70} />
                    <div className="text-center">
                      <p className="mb-0">
                        <strong>{portchannel?.name}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Modals
            showModal={showModal}
            setShowModal={setShowModal}
            modalProps={modalProps}
            goldstonemodalProps={goldstonemodalProps}
            deviceID={deviceID}
          />
        </>
      </div>

    </React.Fragment >
  );
};

export default Interface;