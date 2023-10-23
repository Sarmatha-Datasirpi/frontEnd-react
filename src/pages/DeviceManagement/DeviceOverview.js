import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDeviceSystemInfoAction } from "../../store/DevicesList/action";
import { SimplePie } from "../Charts/PieCharts";
import { updateDeviceSetting, getDeviceCredentials, verifyLicenseKeyAction } from "../../store/actions";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";

const DeviceOverview = (props) => {
  document.title = "DPB-NMS | Overview";
  const sysInfo = {};
  const dispatch = useDispatch();
  const deviceIpAddress = useParams().id;
  const deviceosVersion = useParams().osVersion;
  const piuInfo = [{ PRESENT: [], UNPLUGGED: [] }];
  const psuInfo = [{ RUNNING: [], UNPLUGGED: [] }];


  const transeiverInfo = [{ PRESENT: [], UNPLUGGED: [] }];
  const devicesystemdata = useSelector((state) => state.DevicesListData.devicesystemdata);


  useEffect(() => {
    dispatch(getDeviceSystemInfoAction(deviceIpAddress));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDeviceCredentials({ deviceId: deviceIpAddress }));
  }, []);

  const deviceUserDetails = useSelector(
    (state) => state.DevicesListData.deviceCredentials
  );


  if (devicesystemdata != undefined) {

    for (const keys in devicesystemdata) {


      if (keys === "transceiverList") {
        Object.values(devicesystemdata[keys]).map((values, index) => {
          const presence = values?.presence;
          const name = values?.name;
          if (presence === "PRESENT") {
            transeiverInfo[0]["PRESENT"].push(name);
          } else if (presence === "UNPLUGGED") {
            transeiverInfo[0]["UNPLUGGED"].push(name);
          }
        });
      }

      if (keys === "piuList") {
        Object.values(devicesystemdata[keys]).map((values, index) => {
          const status = values?.piuStatus;
          const name = values?.name;
          if (status === true) {
            piuInfo[0]["PRESENT"].push(name);
          } else if (status === false) {
            piuInfo[0]["UNPLUGGED"].push(name);
          }
        });
      }
      if (keys === "psuList") {
        Object.values(devicesystemdata[keys]).map((values, index) => {
          const status = values?.status === "true";
          const name = values?.name;
          if (status === true) {
            psuInfo[0]["RUNNING"].push(name);
          } else if (status === false) {
            psuInfo[0]["UNPLUGGED"].push(name);
          }
        });
      }
    }


  }


  const capitalizeAndSplit = (str) => {
    const words = str.split(/(?=[A-Z])/);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  let SystemInfoTableRow;
  SystemInfoTableRow = devicesystemdata && devicesystemdata?.sysInfo
    ? Object.entries(devicesystemdata?.sysInfo).map(([key, value]) => ({
      label: capitalizeAndSplit(key),
      value,
    }))
    : [];

  const columnSize = 3;
  const groupedRows = Array?.from({ length: Math.ceil(SystemInfoTableRow?.length / columnSize) }, (_, index) =>
    SystemInfoTableRow?.slice(index * columnSize, (index + 1) * columnSize)
  );

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card className="border border-3 rounded-3">
              <CardBody>
                <h5 className="mb-0">Software License:</h5>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                  <h2 style={{ flex: 1, marginRight: "15px", fontSize: "16px" }}>
                    License Key : {deviceUserDetails?.licenseKey}
                  </h2>
                  <div style={{ flex: 1, marginRight: "10px", fontSize: "16px" }}>
                    Status :{" "}
                    {deviceUserDetails.isVerified ? (
                      <span className="badge bg-success">{deviceUserDetails?.status}</span>
                    ) : (
                      <span className="badge bg-danger">{deviceUserDetails?.status}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, marginRight: "10px", fontSize: "16px" }}>
                    Validity : Lifetime
                  </div>
                  <div style={{ flex: 1, marginRight: "10px", fontSize: "16px" }}>
                      Support End Date : {deviceUserDetails?.supportEndDate}
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="border border-3 rounded-3">
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="card-title mb-0">System Information</span>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="align-middle table-nowrap mb-0">
                  <>
                    <tbody>
                      {groupedRows.length === 0 ? (
                        <tr>
                          <td colSpan={columnSize * 2} className="text-center">
                            <span><h4>No device Information Found</h4></span>
                          </td>
                        </tr>
                      ) : (
                        groupedRows.map((rowGroup, index) => (
                          <tr key={index}>
                            {rowGroup.map((row, rowIndex) => (
                              <React.Fragment key={rowIndex}>
                                <td>
                                  <strong>{row.label}</strong>
                                </td>
                                <td>{row.value}</td>
                              </React.Fragment>
                            ))}
                            {rowGroup.length < columnSize && (
                              Array.from({ length: columnSize - rowGroup.length }, (_, emptyIndex) => (
                                <React.Fragment key={`empty-${emptyIndex}`}>
                                  <td></td>
                                  <td></td>
                                </React.Fragment>
                              ))
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>

                  </>
                </Table>
              </CardBody>
            </Card>
          </Col>


          <Col lg={4}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">
                  Transceiver (QSFP)
                  <i class="ri-information-line" id="tranceivee43"></i>
                  <UncontrolledTooltip placement="bottom" target="tranceivee43">
                    Transceiver (QSFP) Information
                  </UncontrolledTooltip>
                </h4>
              </CardHeader>
              <CardBody>
                <SimplePie
                  dataColors='["--vz-secondary","--vz-success"]'
                  value={[
                    transeiverInfo[0]["PRESENT"].length,
                  ]}
                  label={[
                    "PRESENT (" +
                    transeiverInfo[0]["PRESENT"].length +
                    " Ports)"
                  ]}
                  title="PRESENT vs UNPLUGGED"
                />
              </CardBody>
            </Card>
          </Col>
          {deviceosVersion !== "sonic" && (
            <Col lg={4}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">
                    PIU Status{" "}
                    <i class="ri-information-line" id="piustatus43"></i>
                    <UncontrolledTooltip placement="bottom" target="piustatus43">
                      PIU Status Information
                    </UncontrolledTooltip>
                  </h4>
                </CardHeader>
                <CardBody>
                  <SimplePie
                    dataColors='["--vz-success","--vz-danger"]'
                    value={[
                      piuInfo[0]["PRESENT"].length,
                      piuInfo[0]["UNPLUGGED"].length,
                    ]}
                    label={[
                      "PRESENT (" + piuInfo[0]["PRESENT"].length + " Ports)",
                      "UNPLUGGED (" + piuInfo[0]["UNPLUGGED"].length + " Ports)",
                    ]}
                    title="PRESENT vs UNPLUGGED"
                  />
                </CardBody>
              </Card>
            </Col>
          )}
          <Col lg={4}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">
                  PSU Status
                  <i class="ri-information-line" id="psustatus43"></i>
                  <UncontrolledTooltip placement="bottom" target="psustatus43">
                    PSU Status Information
                  </UncontrolledTooltip>
                </h4>
              </CardHeader>
              <CardBody>
                <SimplePie
                  dataColors='["--vz-success","--vz-warning"]'
                  value={[
                    psuInfo[0]["RUNNING"].length,
                    psuInfo[0]["UNPLUGGED"].length,
                  ]}
                  label={[
                    "RUNNING (" + psuInfo[0]["RUNNING"].length + " PSU)",
                    "UNPLUGGED (" + psuInfo[0]["UNPLUGGED"].length + " PSU)",
                  ]}
                  title="RUNNING vs UNPLUGGED"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default DeviceOverview;
