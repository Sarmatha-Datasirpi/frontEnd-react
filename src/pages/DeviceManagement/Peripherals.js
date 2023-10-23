import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MarketplaceChart } from "../Charts/MarketLineCharts";
import {
  deleteOidListData,
  getDeviceProcessInfoAction,
  getDeviceSystemInfoAction,
  getOidList,
} from "../../store/DevicesList/action";
import { useParams } from "react-router-dom";
import FilterJSON from "../../common/FilterJSON";
import moment from "moment";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import DynamicGraph from "./dynamicgraph";
import { getOpticalMonitorData } from "../../store/OpticalManagement/action";

const Peripherals = () => {
  document.title = "DPB-NMS | Peripherals";
  const dispatch = useDispatch();
  const deviceIpAddress = useParams().id;
  const deviceOsVersion = useParams().osVersion;
  const [streamHour, setStreamHour] = useState("1");
  const CompareOidList = useSelector((state) => state?.DevicesListData?.OidList?.customOidFieldList?.map((item) => item.name));
  const customOidFieldList = useSelector((state) => state?.DevicesListData?.OidList?.customOidFieldResponse);
  const OidList = useSelector((state) => state?.DevicesListData?.OidList?.customOidFieldList);
  const deviceprocessdata = useSelector((state) => state?.DevicesListData?.deviceprocessdata);
  const devicesystemdata = useSelector((state) => state?.DevicesListData?.devicesystemdata);

  useEffect(() => {
    const fetchData = () => {
        dispatch(getDeviceSystemInfoAction(deviceIpAddress));
        dispatch(getOpticalMonitorData(deviceIpAddress, parseInt(streamHour)));
        dispatch(getDeviceProcessInfoAction(deviceIpAddress, parseInt(streamHour)));
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); 
    return () => {
        clearInterval(intervalId);
    };
}, [dispatch, deviceIpAddress, streamHour]);


  const infoLiveLabels = [];

  const timestamps = Array.isArray(deviceprocessdata)
    ? deviceprocessdata.map((time) => time?.timestamp)
    : [];


  const convertedTimestamps = timestamps.map((timestamp) =>
    moment(timestamp).format('HH:mm:ss')
  );
  infoLiveLabels.push(...convertedTimestamps);

  /*****  PSU LIST  *******/

  const capitalizeAndSplit = (str) => {
    const words = str.split(/(?=[A-Z])/);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  //let transformedPIUArray = [];
  let PsuSet = devicesystemdata["psuList"];
  const transformedPIUArray = [];

  if (Array.isArray(PsuSet)) {
    PsuSet.forEach((obj) => {
      const transformedObj = obj
        ? Object.entries(obj).map(([key, value]) => ({
          label: capitalizeAndSplit(key),
          value: value !== null ? String(value) : null,
        }))
        : [];

      transformedPIUArray.push(transformedObj);
    });
  }

  //let transformedPIUArray = [];
  let FanSet = devicesystemdata["fanList"];
  const FanArray = [];

  if (Array.isArray(FanSet)) {
    FanSet.forEach((obj) => {
      const fanObj = obj
        ? Object.entries(obj).map(([key, value]) => ({
          label: capitalizeAndSplit(key),
          value: value !== null ? String(value) : null,
        }))
        : [];

      FanArray.push(fanObj);
    });
  }

  let ThermalSet = devicesystemdata["thermalSensorList"];
  const ThermalArray = [];

  if (Array.isArray(FanSet)) {
    ThermalSet.forEach((obj) => {
      const thermalObj = obj
        ? Object.entries(obj)?.map(([key, value]) => ({
          label: capitalizeAndSplit(key),
          value: value !== null ? String(value) : null,
        }))
        : [];

      ThermalArray.push(thermalObj);
    });
  }


  /********FAN GRAPH*********/

  const fanRPMAndNameArray = Array?.isArray(deviceprocessdata)
    ? deviceprocessdata?.map(({ fanList }) =>
      fanList.map(({ description, rpm }) => ({
        name: description || '',
        rpm: rpm?.toString() || ''
      }))
    )
    : [];

  const fanDataByFanName = fanRPMAndNameArray?.flat()?.reduce((result, { name, rpm }) => {
    if (result[name]) {
      result[name].data?.push(rpm);
    } else {
      result[name] = { name, data: [rpm] };
    }
    return result;
  }, {});

  const fanLiveStreams = Object?.values(fanDataByFanName)?.map(({ name, data }) => ({
    name,
    data: data.map(String)
  }));

  const filteredFanLiveStream = FilterJSON(fanLiveStreams);

  /********Memory Graph*********/

  const dataForFilter = Array?.isArray(deviceprocessdata)
    ? deviceprocessdata.map(({ memoryInfo }) => ({
      name: 'usage',
      data: [memoryInfo?.used !== null ? memoryInfo.used : '']
    }))
    : [];


  const memoryLiveStream = FilterJSON(dataForFilter);

  /********CPU Graph*********/

  const cpuData = Array?.isArray(deviceprocessdata)
    ? deviceprocessdata.map(({ cpuInfo }) => ({
      idle: cpuInfo?.idle || '',
      total: cpuInfo?.total || ''
    }))
    : [];
  const dataForCpuFilter = cpuData?.map(({ total }) => ({
    name: 'total',
    data: [total !== null ? total : '']
  }));

  const cpuLiveStream = FilterJSON(dataForCpuFilter);

  /********thermalSensorGraph*********/


  const ThermalData = Array?.isArray(deviceprocessdata)
    ? deviceprocessdata.flatMap(({ thermalSensorList }) => {
      if (!thermalSensorList) {
        return [];
      }
      return thermalSensorList.map(({ description = 'Unknown', temperature = 'N/A' }) => ({
        description,
        temperature: temperature.toString()
      }));
    })
    : [];




  const tempDataByThermalDescription = ThermalData?.reduce((result, { description, temperature }) => {
    if (result[description]) {
      result[description].data.push(temperature);
    } else {
      result[description] = { description, data: [temperature] };
    }
    return result;
  }, {});

  const dataLength = tempDataByThermalDescription?.["CPU Core"]?.data?.length || 0;
  const warningvalue = 45000;
  const errorValue = 55000;
  const shutdownValue = 60000;

  if(deviceOsVersion !== "sonic") {
    var warningarray = Array(dataLength)?.fill(warningvalue);
    var errorarray = Array(dataLength)?.fill(errorValue);
    var shutdownarray = Array(dataLength)?.fill(shutdownValue);

    const tempDataByThermal = {
      warning: { description: "warning", data: warningarray },
      error: { description: "error", data: errorarray },
      shutdown: { description: "shutdown", data: shutdownarray },
    };


    // Merge tempDataByThermal into tempDataByThermalDescription
    Object.entries(tempDataByThermal).forEach(([key, value]) => {
      if (tempDataByThermalDescription[key]) {
        tempDataByThermalDescription[key].data.push(...value.data);
      } else {
        tempDataByThermalDescription[key] = value;
      }
    });
  }

  const thermalLiveStream = Object.values(tempDataByThermalDescription).map(({ description, data }) => ({
    name: description,
    data: data.map(String)
  }));

  /********Transceiver List********/

  const transceiverList = devicesystemdata.transceiverList || [];
  const transformedTransArray = transceiverList.map(obj => {
    const transformedTransObj = Object.entries(obj).map(([key, value]) => ({
      label: capitalizeAndSplit(key),
      value
    }));
    return transformedTransObj;
  });

  const selectStreamTime = (event) => {
    setStreamHour(event.target.value);
    dispatch(getDeviceProcessInfoAction(deviceIpAddress, event.target.value));
    dispatch(getOpticalMonitorData(deviceIpAddress, event.target.value));
  };


  const handleRemoveOid = async (item) => {
    let DeletePayload = {
      deviceId: deviceIpAddress,
      oid: item.oid
    };


    try {
      await dispatch(deleteOidListData(DeletePayload));
      await dispatch(getOidList(deviceIpAddress));
    } catch (error) {
      // Handle error if needed
    } finally {
      //  setIsLoading(false);
    }
  };


  function transformObject(customOidFieldList) {
    const result = {};

    customOidFieldList?.forEach((obj) => {
      const { name, oid, value, timestamp } = obj;

      if (!result[name]) {
        result[name] = [];
      }

      result[name]?.push({ oid, value, timestamp });
    });

    return result;
  }

  const transformedObject = transformObject(customOidFieldList);

  const transponderCustomLiveStream = {};

  Object.entries(transformedObject)?.forEach(([name, values]) => {
    values?.forEach((value, index) => {
      if (!transponderCustomLiveStream[index]) {
        transponderCustomLiveStream[index] = {};
      }
      transponderCustomLiveStream[index][name] = value;
    });
  });


  let chartData = [];
  if (Array.isArray(customOidFieldList)) {
    customOidFieldList.forEach((obj) => {
      const { name, value } = obj;
      if (!chartData[name]) {
        chartData[name] = [];
      }
      chartData[name].push(value);
    });
  } else {
    console.error("customOidFieldList is not an array or is undefined.");
  }

  if (Array.isArray(OidList)) {
    OidList.forEach((obj) => {
      const { name, value } = obj;
      if (!chartData[name]) {
        chartData[name] = [];
      }
      chartData[name].push(value);
    });
  } else if (typeof OidList === 'undefined') {
    console.error("OidList is undefined.");
  } else {
    console.error("OidList is not an array.");
  }

  // Output the separated chartData

  const formattedChartData = Object.entries(chartData)?.map(([name, data]) => ({
    name,
    data
  }));

  const ComparedData = formattedChartData?.map((item) => item.name)
  const filteredList = CompareOidList?.filter(item => ComparedData?.includes(item));

  const formattedLabels = [];
  chartData?.map((chartData) =>
    formattedLabels.push(moment(chartData?.timestamp).format("HH:mm:ss"))
  );


  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">PSU Information</h4>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table-striped table-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        {transformedPIUArray[0]?.map((obj, index) => (
                          <th key={index}>{obj?.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {transformedPIUArray?.map((innerArray, rowIndex) => (
                        <tr key={rowIndex}>
                          {innerArray.map((obj, index) => (
                            <td key={index}>{obj.value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">Transceiver Information</h4>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table-striped table-nowrap align-middle mb-0">
                    {transformedTransArray.length > 0 ? (
                      <>
                        <thead>
                          <tr>
                            {transformedTransArray[0].map((obj, index) => (
                              <th key={index}>{obj.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {transformedTransArray.map((innerArray, rowIndex) => (
                            <tr key={rowIndex}>
                              {innerArray.map((obj, index) => (
                                <td key={index}>{obj.value}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (
                      <caption>No Transceiver Information found</caption>
                    )}
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">Thermal Information</h4>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table-striped table-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        {ThermalArray[0]?.map((obj, index) => (
                          <th key={index}>{obj?.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ThermalArray?.map((innerArray, rowIndex) => (
                        <tr key={rowIndex}>
                          {innerArray.map((obj, index) => (
                            <td key={index}>{obj.value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">Fan Information</h4>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table className="table-striped table-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                        {FanArray[0]?.map((obj, index) => (
                          <th key={index}>{obj?.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FanArray?.map((innerArray, rowIndex) => (
                        <tr key={rowIndex}>
                          {innerArray.map((obj, index) => (
                            <td key={index}>{obj.value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col
            lg={12}
            className="align-self-end  text-right"
            style={{ textAlign: "right !important" }}
          >
            <div
              class="btn-group text-right float-right"
              role="group"
              aria-label="Basic radio toggle button group"
              onChange={selectStreamTime}
              style={{ textAlign: "right !important" }}
            >
              <input
                type="radio"
                class="btn-check"
                name="streamHour"
                id="btnradio_1"
                value="1"
                checked={streamHour === "1"}
              />
              <label class="btn btn-sm btn-outline-success" for="btnradio_1">
                1Hr
              </label>

              <input
                type="radio"
                class="btn-check"
                name="streamHour"
                id="btnradio_2"
                value="2"
                checked={streamHour === "2"}
              />
              <label class="btn btn-sm btn-outline-success" for="btnradio_2">
                2Hr
              </label>

              <input
                type="radio"
                class="btn-check"
                name="streamHour"
                id="btnradio_3"
                value="4"
                checked={streamHour === "4"}
              />
              <label class="btn btn-sm btn-outline-success" for="btnradio_3">
                4Hr
              </label>

              <input
                type="radio"
                class="btn-check"
                name="streamHour"
                id="btnradio_4"
                value="6"
                checked={streamHour === "6"}
              />
              <label class="btn btn-sm btn-outline-success" for="btnradio_4">
                6Hr
              </label>

              <input
                type="radio"
                class="btn-check"
                name="streamHour"
                id="btnradio_5"
                value="12"
                checked={streamHour === "12"}
              />
              <label class="btn btn-sm btn-outline-success" for="btnradio_5">
                12Hr
              </label>

              <input
                type="radio"
                class="btn-check"
                name="streamHour"
                id="btnradio_6"
                value="24"
                checked={streamHour === "24"}
              />
              <label class="btn btn-sm btn-outline-success" for="btnradio_6">
                24Hr
              </label>
            </div>
          </Col>
          <Col lg={4}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">
                  CPU Usage <i class="ri-information-line" id="cpuUsage23"></i>
                  <UncontrolledTooltip placement="bottom" target="cpuUsage23">
                    CPU Usage Information
                  </UncontrolledTooltip>
                </h4>
              </CardHeader>
              <CardBody>
                <MarketplaceChart
                  data={cpuLiveStream}
                  label={infoLiveLabels}
                  title="CPU Total used (%)"
                  dataColors='["--vz-secondary","--vz-warning","--vz-danger","--vz-success"]'
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">
                  Memory Usage{" "}
                  <i class="ri-information-line" id="memoryUsage23"></i>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="memoryUsage23"
                  >
                    Memory Usage Information
                  </UncontrolledTooltip>
                </h4>
              </CardHeader>
              <CardBody>
                <MarketplaceChart
                  data={memoryLiveStream}
                  label={infoLiveLabels}
                  title="Memory Used (GB)"
                  dataColors='["--vz-secondary","--vz-warning","--vz-danger","--vz-success"]'
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">
                  FAN Usage <i class="ri-information-line" id="fanUsage23"></i>
                  <UncontrolledTooltip placement="bottom" target="fanUsage23">
                    FAN Usage information
                  </UncontrolledTooltip>
                </h4>
              </CardHeader>
              <CardBody>
                <MarketplaceChart
                  data={filteredFanLiveStream}
                  label={infoLiveLabels}
                  title="Speed(Rpm)"
                  dataColors='["--vz-secondary","--vz-warning","--vz-danger","--vz-success","black"]'
                />


              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">
                  Thermal{" "}
                  <i class="ri-information-line" id="thermalUsage23"></i>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="thermalUsage23"
                  >
                    Thermal information
                  </UncontrolledTooltip>
                </h4>
              </CardHeader>
              <CardBody>
                <div>
                  <MarketplaceChart
                    data={thermalLiveStream}
                    label={infoLiveLabels}
                    title="Temperature"
                    dataColors='["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080","#FF0000", "#00FF00", "#0000FF"]'
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
                  <span className="card-title mb-0">
                    <strong>Custom Monitoring (using SNMP): </strong>
                    <i className="ri-information-line" id="customTooltip"></i>
                    <UncontrolledTooltip placement="right" target="customTooltip">
                      Custom Historical tracking using SNMP
                    </UncontrolledTooltip>
                  </span>
                  <DynamicGraph style={{ float: 'right' }} />
                </div>
              </CardHeader>
              <CardBody className="card-list" style={{ height: '368px', overflowY: 'scroll', msScrollbarHighlightColor: 'red' }}>
                <div className="col-12">
                  {OidList && OidList.length === 0 ? (
                    <div className="empty-message-container" style={{ marginTop: "20%" }}>
                      <p className="text-center">Custom Monitoring List is empty.</p>
                    </div>
                  ) : (
                    OidList?.map((item, index) => (
                      <div key={index} className="row">
                        <div className="col-8">
                          <h3>{item.name}</h3>
                          <p>OID: {item.oid}</p>
                        </div>
                        <div className="col-4">
                          <i
                            className="ri-delete-back-2-line"
                            style={{
                              float: 'right',
                              fontSize: '24px',
                              color: 'red'
                            }}
                            onClick={() => handleRemoveOid(item)}
                          ></i>
                        </div>
                        <hr style={{ color: "blue" }} />
                      </div>
                    ))
                  )}
                </div>

              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <div className="row">
            {formattedChartData?.map((item, index) => {
              if (filteredList && Array.isArray(filteredList) && filteredList.includes(item?.name)) {
                return (
                  <div className="col-4" key={index}>
                    <Card className="mt-4">
                      <CardHeader style={{ color: "#0ab39c" }}>{item?.name}</CardHeader>
                      <CardBody>
                        <MarketplaceChart
                          data={[item]}
                          label={formattedLabels}
                          title={item?.name}
                          dataColors='["--vz-secondary","--vz-warning","--vz-danger","--vz-success"]'
                        />
                      </CardBody>
                    </Card>
                  </div>
                );
              } else {
                return null; // Exclude the item from rendering
              }
            })}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Peripherals;
