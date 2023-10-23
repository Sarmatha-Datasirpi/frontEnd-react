import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getDevicesData } from "../../store/DevicesList/action";

import { InputGroup, Form } from "react-bootstrap";

import { BsSearch } from "react-icons/bs";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
export default function Devices({
  showDeviceSelection,
  setShowDeviceSelection,
  chosenDeviceInfo,
  filterDevice,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDevicesData());
  }, [dispatch]);

  const deviceList = useSelector(
    (state) => state.DevicesListData.getDevicesData
  );

  useEffect(() => {
    if (filterDevice != "none")
      setFilterDeviceList(
        deviceList?.filter((device) => device.osVersion === filterDevice)
      );
    else setFilterDeviceList(deviceList);
  }, [deviceList]);

  const searchByDeviceId = (val) => {
    if (!val) {
      setFilterDeviceList(deviceList);
    } else {
      setFilterDeviceList(
        deviceList?.filter((device) => device.deviceId.includes(val))
      );
    }
  };
  const [filteredDeviceList, setFilterDeviceList] = useState([]);
  const [ups, downs] = [
    filteredDeviceList?.filter((device) => device?.status == "Reachable"),
    filteredDeviceList?.filter((device) => device?.status != "Reachable"),
  ];

  return (
    <>
      {showDeviceSelection ? (
        <Fragment>
          <Row className="mb-3 pb-1">
            <Col xs={12}>
              <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                <div className="flex-grow-1">
                  <h4 className="fs-18 mb-1">
                    Total Devices ({filteredDeviceList?.length}){" "}
                    <Badge color="success" id="reachabledevice">
                      {ups?.length} <i className="ri-arrow-up-line"></i>
                    </Badge>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="reachabledevice"
                    >
                      Reachable Devices
                    </UncontrolledTooltip>
                    &nbsp;
                    <Badge color="danger" id="unreachabledevices">
                      {downs?.length} <i className="ri-arrow-down-line"></i>
                    </Badge>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="unreachabledevices"
                    >
                      Unreachable Devices
                    </UncontrolledTooltip>
                  </h4>
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
                                placeholder="Search Device id"
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
                            Give Device IP Address to search
                          </UncontrolledTooltip>
                        </Col>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-primary btn-icon waves-effect waves-light layout-rightside-btn"
                          // onClick={props.rightClickBtn}
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
            {/* <div className="d-flex align-items-end flex-column">
            <Col className="col-sm">
              <div className="d-flex justify-content-sm-end">
                <div className="search-box ms-2 mb-3">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search Device id"
                    onChange={(e) => searchByDeviceId(e.target.value)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </div>
            </Col>
          </div> */}
          </Row>{" "}
          <Row>
            <Col md={12}>
              {(filteredDeviceList?.length > 0 ? filteredDeviceList : []).map(
                (item, key) => (
                  <Card
                    key={key}
                    onClick={(e) => chosenDeviceInfo(e, item)}
                    className="device-card"
                  >
                    <CardBody>
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                            <i
                              className={"align-middle " + "ri-server-fill"}
                            ></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase text-muted mb-1 device-arragement">
                            {item.deviceId}
                          </p>
                          <h4 className=" mb-0">{item.osVersion}</h4>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )
              )}
            </Col>
          </Row>
        </Fragment>
      ) : (
        ""
      )}
    </>
  );
}
