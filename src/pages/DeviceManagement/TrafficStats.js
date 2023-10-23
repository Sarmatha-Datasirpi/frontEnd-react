import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDeviceStatsInfoAction, deleteDeviceStatsInfoAction } from "../../store/DevicesList/action";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  UncontrolledTooltip
} from "reactstrap";

const TrafficStats = (props) => {

  document.title = "DPB-NMS | Traffic Status";
  const dispatch = useDispatch();
  const deviceName = useParams().osVersion;
  const deviceIpAddress = useParams().id;
  const MINUTE_MS = 15000;
  useEffect(() => {
    dispatch(getDeviceStatsInfoAction(deviceIpAddress));
    dispatch(deleteDeviceStatsInfoAction(deviceIpAddress));
    let interval = setInterval(() => {
      dispatch(dispatch(getDeviceStatsInfoAction(deviceIpAddress)));
    }, MINUTE_MS);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const devicestatsdata = useSelector(
    (state) => state.DevicesListData.devicestatsdata
  );
  const buttonStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  };
  const interfaceStatisticsInfo = [];
  const xconnectStatisticsInfo = [];

  if (devicestatsdata != undefined) {
    for (const keys in devicestatsdata) {
      if (keys === "interfaceStatistics") {
        Object.keys(devicestatsdata[keys]).map((key, index) => {
          interfaceStatisticsInfo.push(devicestatsdata[keys][key]);
        });
      }
      if (keys === "xconnectStatistics") {
        //xconnectStatisticsInfo.push(devicestatsdata[keys]);
        Object.keys(devicestatsdata[keys]).map((key) => {
          Object.keys(devicestatsdata[keys][key]).map((key2, index) => {
            if (key2 != "mode") {
              if (devicestatsdata[keys][key][key2] != null) {
                xconnectStatisticsInfo.push({
                  xconnect: key,
                  ports: key2,
                  interfaceName:
                    devicestatsdata[keys][key][key2]["interfaceName"],
                  packetIn:
                    devicestatsdata[keys][key][key2]["counter"]["packetIn"],
                  packetInError:
                    devicestatsdata[keys][key][key2]["counter"][
                    "packetInError"
                    ],
                  packetInDiscard:
                    devicestatsdata[keys][key][key2]["counter"][
                    "packetInDiscard"
                    ],
                  packetOut:
                    devicestatsdata[keys][key][key2]["counter"]["packetOut"],
                  packetOutError:
                    devicestatsdata[keys][key][key2]["counter"][
                    "packetOutError"
                    ],
                  packetOutDiscard:
                    devicestatsdata[keys][key][key2]["counter"][
                    "packetOutDiscard"
                    ],
                });
              }
            }
          });
        });
      }
    }
  }

  return (
    <>
      {" "}
      <Container fluid>
        <Row>
          {" "}
          {deviceName.includes(["goldstone"]) ? (
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">XConnect Stats</h4>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table-striped table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">XConnect</th>
                          <th scope="col">Ports</th>
                          <th scope="col">Interface Name</th>
                          <th scope="col">Packet In</th>
                          <th scope="col">Packet Out</th>
                          <th scope="col">Packet In Error</th>
                          <th scope="col">Packet Out Error</th>
                          <th scope="col">Packet In Discard</th>
                          <th scope="col">Packet Out Discard</th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {xconnectStatisticsInfo.map((item, index) => (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{item.xconnect}</td>
                              <td>{item.ports}</td>
                              <td>{item.interfaceName}</td>
                              <td>{item.packetIn}</td>
                              <td>{item.packetOut}</td>
                              <td>{item.packetInError}</td>
                              <td>{item.packetOutError}</td>
                              <td>{item.packetInDiscard}</td>
                              <td>{item.packetOutDiscard}</td>
                            </tr>
                          ))}
                        </>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ) : (
            ""
          )}
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">Interface Counter Stats</h4>
                <div style={{ marginLeft: "auto" }}>
                <button
                      type="button"
                      className="btn btn-danger btn-icon waves-effect waves-light layout-rightside-btn"
                      style={{ width: "auto", minWidth: "100px", marginRight: "10px" }}
                      id="clearstats"
                      onClick={() =>
                        dispatch(deleteDeviceStatsInfoAction(deviceIpAddress))
                      }
                  >
                      Clear Stats
                  </button>                  
                  <button
                    type="button"
                    className="btn btn-success btn-icon waves-effect waves-light layout-rightside-btn"
                    id="refreshstats"
                    onClick={() =>
                      dispatch(getDeviceStatsInfoAction(deviceIpAddress))
                    }
                  // style={{ backgroundColor: "white", borderColor: "white", color: "green" }}
                  >
                    <i className="ri-refresh-line"></i>
                  </button>

                  <UncontrolledTooltip placement="bottom" target="refreshstats">
                    Refresh Stats
                  </UncontrolledTooltip>
                  <UncontrolledTooltip placement="bottom" target="clearstats">
                    Clear Traffic Stats
                  </UncontrolledTooltip>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table-striped table-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Interface Name</th>
                        <th scope="col">packetIn</th>
                        <th scope="col">packetInError</th>
                        <th scope="col">packetInDiscard</th>
                        <th scope="col">packetOut</th>
                        <th scope="col">packetOutError</th>
                        <th scope="col">packetOutDiscard</th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {interfaceStatisticsInfo.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td className="fw-medium">
                              <span className="badge fs-14 bg-success">
                                {item.interfaceName}
                              </span>
                            </td>
                            <td>{item.counter.packetIn}</td>
                            <td>{item.counter.packetInError}</td>
                            <td>{item.counter.packetInDiscard}</td>
                            <td>{item.counter.packetOut}</td>
                            <td>{item.counter.packetOutError}</td>
                            <td>{item.counter.packetOutDiscard}</td>
                          </tr>
                        ))}
                      </>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default TrafficStats;
