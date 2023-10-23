import React, { useEffect, useState } from "react";
import { SplineAreaChart } from "../Charts/AreaCharts";
import { SimplePie } from "../Charts/PieCharts";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TopologyViewer from "../DashboardTopology/TopologyViwer";
import { Basic, Stacked } from "../Charts/BarCharts";
import { getDashboardData } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "../Home/HomeStyle.css";
import { getUserData } from "../../store/user/action";
const HomeComponents = (props) => {
  const [isFullScreenMode, setIsFullScreenMode] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);
  useEffect(() => {
    let interval = setInterval(() => {
      dispatch(getDashboardData());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {

    const fetchData = async () => {
      try {
        await dispatch(getUserData());
        setError(null); // Clear the error if successful
      } catch (error) {
        setError(error); // Set the error state if an error occurs
      }
    };
    fetchData();
  }, [dispatch]);
  const dashboardData = useSelector(
    (state) => state?.Dashboard_reducer?.dashboardData
  );
  const toggleFullscreen = () => {
    let document = window.document;
    document.body.classList.add("fullscreen-enable");

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      setIsFullScreenMode(false);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      setIsFullScreenMode(true);
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }

    // handle fullscreen exit
    const exitHandler = () => {
      if (
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      )
        document.body.classList.remove("fullscreen-enable");
    };
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
  };
  return (
    <>
      {Object.keys(dashboardData).length > 0 ? (
        <Container fluid>
          <Row>
            <Col lg={4}>
              <Col lg={8}>
                <Card className="bg-info rounded-3">
                  <CardBody>
                    <div className="text-light fs-2 fw-bold gap-1 d-flex align-items-center">
                      <span>{dashboardData?.deviceCount}</span>
                      <i class="ri-device-line fs-3"></i>
                    </div>
                    <h4 className="card-title mb-0 text-light fs-4 gap-1">
                      Devices{" "}
                      <i class="ri-information-fill fs-5" id="deviceCount"></i>
                    </h4>
                  </CardBody>
                  <UncontrolledTooltip
                    innerClassName="tooltip-style"
                    placement="bottom"
                    target="deviceCount"
                  >
                    No of devices registered
                  </UncontrolledTooltip>
                </Card>
              </Col>
            </Col>

            <Col lg={4}>
              <Col lg={8}>
                <Card className="bg-info rounded-3">
                  <CardBody>
                    <div className="text-light fs-2 fw-bold gap-1 d-flex align-items-center">
                      <span>{dashboardData?.transponderCount}</span>
                      <i class="ri-device-line fs-3"></i>
                    </div>
                    <h4 className="card-title mb-0 text-light fs-4 gap-1">
                      Transponders{" "}
                      <i
                        class="ri-information-fill fs-5"
                        id="transponderCount"
                      ></i>
                    </h4>
                  </CardBody>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="transponderCount"
                  >
                    Number of transponders currently attached to devices
                  </UncontrolledTooltip>
                </Card>
              </Col>

            </Col>

            <Col lg={4}>
              <Col lg={8}>
                <Card className="bg-info rounded-3">
                  <CardBody>
                    <div className="text-light fs-2 fw-bold gap-1 d-flex align-items-center">
                      <span>{dashboardData?.transceiverCount}</span>
                      <i class="ri-device-line fs-3"></i>
                    </div>
                    <h4 className="card-title mb-0 text-light fs-4 gap-1">
                      Transceivers{" "}
                      <i
                        class="ri-information-fill fs-5"
                        id="transceiverCount"
                      ></i>
                    </h4>
                  </CardBody>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="transceiverCount"
                  >
                    Number of transceivers currently attached to devices
                  </UncontrolledTooltip>
                </Card>
              </Col>

            </Col>
            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader className="border-1 border-m3 rounded-3">
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Device Status{" "}
                      <i class="ri-information-line" id="deviceStatus"></i>
                    </span>
                    {/* <button
                      onClick={toggleFullscreen}
                      type="button"
                      className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                      id="fullscreenmode"
                    >
                      <i
                        className={
                          // isFullScreenMode
                          //   ?
                          "bx bx-fullscreen fs-22"
                          // : "bx bx-exit-fullscreen fs-22"
                        }
                      ></i>
                    </button> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <SimplePie
                    dataColors='[ "--vz-success","--vz-primary"]'
                    value={[
                      dashboardData?.deviceStatus?.reachableCount,
                      dashboardData?.deviceStatus?.notReachableCount,
                    ]}
                    label={["Reachable", "Not Reachable"]}
                  />
                </CardBody>
                <UncontrolledTooltip
                  innerClassName="tooltip-style"
                  placement="bottom"
                  target="deviceStatus"
                >
                  Device reachability status
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Transponder Status{" "}
                      <i class="ri-information-line" id="transponderStatus"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <SimplePie
                    dataColors='["--vz-primary", "--vz-success"]'
                    value={[
                      dashboardData?.transponderStatus?.true
                        ? dashboardData?.transponderStatus?.true
                        : 0,
                      dashboardData?.transponderStatus?.false
                        ? dashboardData?.transponderStatus?.false
                        : 0,
                    ]}
                    label={["Ready", "Not Ready"]}
                  />
                </CardBody>
                <UncontrolledTooltip
                  placement="bottom"
                  target="transponderStatus"
                  innerClassName="tooltip-style"
                >
                  Tranponder usability status
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Transponder SNR(low to high){" "}
                      <i class="ri-information-line" id="transponderSnr"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <Basic
                    dataColors='["--vz-primary", "--vz-success"]'
                    label={Object.keys(dashboardData?.transponderSnr)}
                    value={Object.values(dashboardData?.transponderSnr)}
                  />{" "}
                </CardBody>
                <UncontrolledTooltip
                  innerClassName="tooltip-style"
                  placement="bottom"
                  target="transponderSnr"
                >
                  Trasnponder with low Signal to Noise ratio
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Top 5 device by CPU utilization{" "}
                      <i class="ri-information-line" id="cpuUtilization"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <Basic
                    dataColors='["--vz-primary", "--vz-success"]'
                    label={Object.keys(dashboardData?.cpuUtilization)}
                    value={Object.values(dashboardData?.cpuUtilization)}
                  />
                </CardBody>
                <UncontrolledTooltip
                  innerClassName="tooltip-style"
                  placement="bottom"
                  target="cpuUtilization"
                >
                  Devices with high cpu usage(%Percentage)
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Top 5 device by Memory utilization{" "}
                      <i class="ri-information-line" id="memoryUtilization"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <Basic
                    dataColors='["--vz-primary", "--vz-success"]'
                    label={Object.keys(dashboardData?.memoryUtilization)}
                    value={Object.values(dashboardData?.memoryUtilization)}
                  />
                </CardBody>
                <UncontrolledTooltip
                  placement="bottom"
                  target="memoryUtilization"
                  innerClassName="tooltip-style"
                >
                  Devices with high memory consumption(in GB)
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader className="border-1 border-m3 rounded-3">
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Uptime <i class="ri-information-line" id="uptime"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>
                </CardHeader>
                <CardBody className="bg-light rounded-3">
                  <Stacked
                    dataColors='["--vz-primary", "--vz-success"]'
                    label={["< Day", "> Days", "> weeks", "> Months"]}
                    value={[
                      Object.keys(dashboardData?.uptime?.lessThanDay).length,
                      Object.keys(dashboardData?.uptime?.days).length,
                      Object.keys(dashboardData?.uptime?.months).length,
                      Object.keys(dashboardData?.uptime?.weeks).length,
                    ]}
                  />
                </CardBody>
                <UncontrolledTooltip
                  innerClassName="tooltip-style"
                  placement="bottom"
                  target="uptime"
                >
                  Device Uptime
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      OS Distribution{" "}
                      <i class="ri-information-line" id="osDistribution"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <SimplePie
                    dataColors='["#47A992", "#213555", "#435B66", "#A76F6F", "#525FE1","#EAB2A0","#EAC7C7","#A0C3D2","#F7F5EB","#EAE0DA"]'
                    label={Object.keys(dashboardData?.osDistribution)}
                    value={Object.values(dashboardData?.osDistribution)}
                  />
                </CardBody>
                <UncontrolledTooltip
                  innerClassName="tooltip-style"
                  placement="bottom"
                  target="osDistribution"
                >
                  Distribution of OS installed in the device
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Hardware Distribution{" "}
                      <i
                        class="ri-information-line"
                        id="hardwareDistribution"
                      ></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <SimplePie
                    dataColors='["--vz-dark", "--vz-success"]'
                    label={Object.keys(dashboardData?.hardwareDistribution)}
                    value={Object.values(dashboardData?.hardwareDistribution)}
                  />
                </CardBody>
                <UncontrolledTooltip
                  placement="bottom"
                  target="hardwareDistribution"
                  innerClassName="tooltip-style"
                >
                  Distribution of hardware
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border border-3 rounded-3">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Top 5 device by Ping Delay{" "}
                      <i class="ri-information-line" id="pingDelay"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>{" "}
                </CardHeader>
                <CardBody>
                  <Basic
                    dataColors='["--vz-primary", "--vz-success"]'
                    label={Object.keys(dashboardData?.pingDelay)}
                    value={Object.values(dashboardData?.pingDelay)}
                  />
                </CardBody>
                <UncontrolledTooltip
                  innerClassName="tooltip-style"
                  placement="bottom"
                  target="pingDelay"
                >
                  Devices sorted based on ping response
                </UncontrolledTooltip>
              </Card>
            </Col>

            <Col lg={12}>
              <Card className="border border-3 rounded-3">
                <CardHeader className="border-0 ">
                  <div className="d-flex justify-content-between">
                    <span className="card-title mb-0">
                      Topology Viewer{" "}
                      <i class="ri-information-line" id="topologyViewer"></i>
                    </span>
                    {/* <i class="ri-fullscreen-fill fs-4"></i> */}
                  </div>
                </CardHeader>
                <CardBody>
                  <TopologyViewer />
                </CardBody>
                <UncontrolledTooltip
                  innerClassName="tooltip-style"
                  placement="bottom"
                  target="topologyViewer"
                >
                  Topology with device connection details{" "}
                </UncontrolledTooltip>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default HomeComponents;
