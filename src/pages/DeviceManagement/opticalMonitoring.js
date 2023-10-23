import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import moment from "moment";
import Select from 'react-select';
import DynamicGraph from "./dynamicgraph";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import FilterJSON from "../../common/FilterJSON";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../store/actions";
import OpticalMonitoringPiu from "./opticalManagementPiu";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { MarketplaceChart } from "../Charts/MarketLineCharts";
import { getOpticalMonitorData } from "../../store/OpticalManagement/action";
import { setDeviceHistoricalInfo, getDeviceCustumGraphList, getOidList, deleteOidListData } from "../../store/DevicesList/action";


function OpticalMonitoring() {
  document.title = "DPB-NMS | Optical Monitoring";
  const dispatch = useDispatch();
  const deviceIpAddress = useParams().id;
  const [streamHour, setStreamHour] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const List = useSelector((state) => state?.DevicesListData?.DeviceCustumList?.customGraphFieldList);
  const [selectedFields, setSelectedFields] = useState([]); // Selected fields
  const OidList = useSelector((state) => state?.DevicesListData?.OidList?.customOidFieldList);
  const transponderList = useSelector((state) => state?.OpticalMonitor_reducer?.opticalMonitorData?.transponderList);
  const [chartDataValues, setChartDataValues] = useState([]);
  const customOidFieldList = useSelector((state) => state?.OpticalMonitor_reducer?.opticalMonitorData?.customOidFieldList);
  const CompareOidList = useSelector((state) => state?.DevicesListData?.OidList?.customOidFieldList?.map((item) => item.name));



  useEffect(() => {
    if (List) {
      setSelectedFields(List?.map((item) => item));
    }
  }, [List]);

  useEffect(() => {
    dispatch(getOidList(deviceIpAddress));
    dispatch(getDeviceCustumGraphList(deviceIpAddress));
    dispatch(getOpticalMonitorData(deviceIpAddress, parseInt(streamHour)));
    let interval = setInterval(() => {
      dispatch(getDashboardData());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [deviceIpAddress]);

  const selectStreamTime = (event) => {
    setStreamHour(event.target.value);
    dispatch(getOpticalMonitorData(deviceIpAddress, event.target.value));
  };


  const formattedLabels = [];

  transponderList?.map((transponder) =>

    formattedLabels.push(moment(transponder?.timestamp).format("HH:mm:ss"))
  );


  const groupedData = [];

  transponderList?.forEach((transponder) => {
    groupedData.push({
      name: transponder.piuName || "",
      data: transponder.currentSnr || "",
    });
  });

  

  const transponderSnrLiveStream = FilterJSON(groupedData);

  let power = [];
  let Temperature = [];
  let OutputPower = [];

  transponderList?.forEach((transponder) => {
    power.push({ name: transponder?.piuName || "", data: transponder?.power || "" });
    Temperature.push({ name: transponder?.piuName || "", data: transponder?.temp || "" });
    OutputPower.push({ name: transponder?.piuName || "", data: transponder?.outputPower || "" });
  });

  const transponderPowerLiveStream = FilterJSON(power);
  const transponderTemperatureLiveStream = FilterJSON(Temperature);
  const transponderOutputPowerLiveStream = FilterJSON(OutputPower);

  const data = {
    power: {
      label: "Power",
      data: transponderPowerLiveStream,
    },
    temp: {
      label: "Temperature",
      data: transponderTemperatureLiveStream,
    },
    'output-power': {
      label: "Output Power",
      data: transponderOutputPowerLiveStream,
    },
  };

  const handleFieldChange = (selectedOptions) => {
    const selectedValues = selectedOptions?.map((option) => option.value);
    setSelectedFields(selectedValues);



    const deletedFields = selectedFields?.filter(
      (field) => !selectedValues.includes(field)
    );

    if (selectedOptions?.length > 0) {
      const addPayload = {
        customGraphList: selectedValues,
        deviceId: deviceIpAddress,
      };
      dispatch(setDeviceHistoricalInfo(addPayload));
    }

    if (deletedFields.length > 0) {
      const removePayload = {
        deletedFieldList: deletedFields,
        deviceId: deviceIpAddress,
      };
      dispatch(setDeviceHistoricalInfo(removePayload));

    }
    dispatch(getDeviceCustumGraphList(deviceIpAddress));

  };

  const fieldOptions = Object.keys(data).map((field) => ({
    value: field,
    label: data[field].label,
  }));

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
      setIsLoading(false);
    }
  };

  // const customOidFieldList = [
  //   {
  //     "name": "rx-los",
  //     "oid": ".1.3.6.1.4.65544.4.2.1.29",
  //     "value": "0",
  //     "timestamp": 1686757027.0694623
  //   },
  //   {
  //     "name": "test",
  //     "oid": ".1.2.3.4.5",
  //     "value": "0",
  //     "timestamp": 1686757027.0694623
  //   },
  //   {
  //     "name": "rx-los",
  //     "oid": ".1.3.6.1.4.65544.4.2.1.29",
  //     "value": "0",
  //     "timestamp": 1686757055.2873914
  //   },
  //   {
  //     "name": "test",
  //     "oid": ".1.2.3.4.5",
  //     "value": "0",
  //     "timestamp": 1686757055.2873914
  //   },
  //   {
  //     "name": "rx-los",
  //     "oid": ".1.3.6.1.4.65544.4.2.1.29",
  //     "value": "0",
  //     "timestamp": 1686757085.2522414
  //   },
  //   {
  //     "name": "test",
  //     "oid": ".1.2.3.4.5",
  //     "value": "0",
  //     "timestamp": 1686757085.2522414
  //   },
  //   {
  //     "name": "rx-los",
  //     "oid": ".1.3.6.1.4.65544.4.2.1.29",
  //     "value": "0",
  //     "timestamp": 1686757115.4302764
  //   },
  //   {
  //     "name": "test",
  //     "oid": ".1.2.3.4.5",
  //     "value": "0.2",
  //     "timestamp": 1686757115.4302764
  //   },
  //   {
  //     "name": "real",
  //     "oid": ".1.2.3.4.5",
  //     "value": "0.2",
  //     "timestamp": 1686757115.4302764
  //   },
  //   {
  //     "name": "sk",
  //     "oid": ".1.2.3.4.5",
  //     "value": "0.10",
  //     "timestamp": 1686757115.4302764
  //   },
  //   {
  //     "name": "MUThu",
  //     "oid": ".1.2.3.4.5",
  //     "value": "0.10",
  //     "timestamp": 1686757115.4302764
  //   }

  // ];

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

  customOidFieldList?.forEach((obj) => {
    const { name, value } = obj;

    if (!chartData[name]) {
      chartData[name] = [];
    }

    chartData[name].push(value);
  });

  // Output the separated chartData
  const formattedChartData = Object.entries(chartData)?.map(([name, data]) => ({
    name,
    data
  }));

  const nestedChartData = formattedChartData?.map((item) => ({
    data: [item]
  }));

  const ComparedData = formattedChartData?.map((item) => item.name)
  const filteredList = CompareOidList?.filter(item => ComparedData?.includes(item));

  return (
    <Container fluid>
      <Row className="Row-margin">
        <OpticalMonitoringPiu />
      </Row>
      <label className="mt-2" style={{ fontSize: "20px" }}>Historical monitoring</label>
      <Row className="mt-1">
        {" "}
        <Col lg={8} >
          <div className="dropdown-container" >
            <Select
              className="dropdown-select"
              options={fieldOptions}
              value={fieldOptions.filter((option) =>
                selectedFields.includes(option.value)
              )}
              isMulti
              closeMenuOnSelect={true}
              onChange={handleFieldChange}
              placeholder="Select PIU Parameter for graph"
            />
          </div>
        </Col>
        <Col lg={2}>
          <div
            class="btn-group text-right float-right"
            role="group"          
            aria-label="Basic radio toggle button group"
            onChange={selectStreamTime}
            style={{ textAlign: "right !important", height: "45px" }}
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
      </Row>
      <div>

        <div className="row">
          {selectedFields.map((field, index) => (
            <div className='col-4' key={index}>
              <Card className="mt-4">
                <CardHeader style={{ color: "#0ab39c" }}>{data[field].label}</CardHeader>
                <CardBody>
                  <MarketplaceChart
                    data={data[field].data}
                    label={formattedLabels}
                    title={data[field].label}
                    dataColors='["--vz-secondary","--vz-warning","--vz-danger","--vz-success"]'
                  />
                </CardBody>

              </Card>
            </div>
          ))}
        </div>
      </div>
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <span className="card-title mb-0 ">
                  <strong>Transponder SNR </strong>

                  <i class="ri-information-line"></i>
                </span>
              </div>{" "}
            </CardHeader>
            <CardBody>
              <MarketplaceChart
                data={transponderSnrLiveStream}
                label={formattedLabels}
                title="SNR Value"
                dataColors='["--vz-secondary","--vz-warning","--vz-danger","--vz-success"]'
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>

        </Col>


      </Row>
      <Row>

        {/* <Col lg={6}>

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
            <CardBody className="card-list" style={{ height: '250px', overflowY: 'scroll', msScrollbarHighlightColor: 'red' }}>
              <div className="col-12">

                {OidList && OidList?.map((item, index) => (
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
                ))}
              </div>
            </CardBody>
          </Card>
        </Col> */}

        {/* <div className="row">
          {formattedChartData?.map((item, index) => {
            if (filteredList.includes(item?.name)) {
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
        </div> */}
      </Row>
    </Container >
  );
}

export default OpticalMonitoring;
