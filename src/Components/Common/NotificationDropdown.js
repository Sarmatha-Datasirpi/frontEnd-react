import React, { useRef, useState, useEffect } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams } from "react-router-dom";

//SimpleBar
import SimpleBar from "simplebar-react";
import { getAlarmsData, getsyslogData } from "../../store/TopologyLogs/action";
import { getUserData } from "../../store/user/action";
import { postlatestalarmeventdata } from "../../store/TopologyLogs/action";
import axios from "axios";
import ICON from "../../assets/images/device/ICON.png";
const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const cardItemTotal = useRef(null);
  const deviceId = useParams().id;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isCartDropdown, setIsCartDropdown] = useState(false);
  const AlarmsEventsData = useSelector((state) => {
    return state.TopologyLogsData?.postlatestalarmsdata;
  });

  const SysLogData = AlarmsEventsData;
  useEffect(() => {
    dispatch(postlatestalarmeventdata({
      pageNo: currentPage,
      pageSize: 10,
      isLatest: true
    }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const toggleCartDropdown = () => {
    setIsCartDropdown(!isCartDropdown);
  };

  const handleViewAllClick = () => {
    setIsCartDropdown(false);
  };

  const latestFiveLogs = AlarmsEventsData?.alarmEventEntityList;
  const currentLogs = AlarmsEventsData?.statusCount
  const totalAlarmSize = AlarmsEventsData?.totalSize
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isCartDropdown}
        toggle={toggleCartDropdown}
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
          id="listofalarms43"
          onClick={() =>
            dispatch(postlatestalarmeventdata({
              pageNo: currentPage,
              pageSize: 10,
              isLatest: true
            }))
          }
        >
          <i className="bx bx-bell fs-22"></i>
          <span className="position-absolute cartitem-badge topbar-badge fs-10 translate-middle badge rounded-pill bg-info">
            {totalAlarmSize}
            <span className="visually-hidden">unread Alarms</span>
          </span>
        </DropdownToggle>
        <UncontrolledTooltip placement="bottom" target="listofalarms43">
          Alarms
        </UncontrolledTooltip>
        <DropdownMenu
          className="dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
          aria-labelledby="page-header-cart-dropdown"
        >
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fs-16 fw-semibold"> Latest Alarms</h6>
              </Col>
              <div className="col-auto">
                <span className="badge badge-soft-warning fs-13">
                  <span className="cartitem-badge"> {currentLogs} </span> Active Alarms
                </span>
              </div>
            </Row>
          </div>
          <SimpleBar style={{ maxHeight: "300px" }}>
            <div className="p-2">
              {Array.isArray(latestFiveLogs) && latestFiveLogs.length > 0 ? (
                latestFiveLogs.map((item, index) => (

                  <div
                    className="d-block dropdown-item text-wrap dropdown-item-cart px-3 py-2"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-1">
                        <h6 className="mt-0 mb-1 fs-12">
                          <Link className="text-reset">

                            {item.deviceId && <>  {item.deviceId}</>} {" "}
                          </Link>
                          <span
                            className={`badge ${item.name.toLowerCase() === "on" ? "bg-success" : "bg-primary"}`}
                          >
                            {item.name}
                          </span>
                        </h6>
                        {item.message !== " null" && (
                          <p className="mb-0 fs-12 text-muted">
                            <b>Desc:</b> <span>{item.alaramDesc}</span>
                          </p>
                        )}
                      </div>
                      <div className="px-2">
                        <h6 className="m-0 fw-normal fs-10">
                          <b>firstEvent :</b>
                          <span className="cart-item-price">
                            <b>{item.firstEvent}</b>
                          </span>
                        </h6>
                        <h6 className="m-0 fw-normal fs-10">
                          <b>LastEvent :</b>
                          <span className="cart-item-price">
                            <b>{item.lastEvent}</b>
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p></p>
                  <div className="mt-2 text-center">
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                      <h4>                    <img src={ICON} height={'100'} />
                      </h4>
                      <p className="text-muted mx-4 mb-0">
                        No alarms available!.
                      </p>
                    </div>
                  </div>
                </>

              )}
            </div>
          </SimpleBar>
          <div
            className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
            id="checkout-elem"
          >
            <Link
              to="/All_alarms"
              className="btn btn-success text-center w-100"
              onClick={handleViewAllClick}
            >
              View All Alarms
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment >
  );
};

export default NotificationDropdown;
