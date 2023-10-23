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
//SimpleBar
import SimpleBar from "simplebar-react";
import { getAlarmsData } from "../../store/TopologyLogs/action";


const MyCartDropdown = () => {
  const dispatch = useDispatch();
  const cardItemTotal = useRef(null);
  const [firstTwoLetters, setFirstTwoLetters] = useState('');
  const [isCartDropdown, setIsCartDropdown] = useState(false);

  useEffect(() => {

    dispatch(getAlarmsData());


  }, []);

  const AlarmsLogData = useSelector((state) => {
    const alarmsData = state.TopologyLogsData.getAlarmsData;
    const firstFiveLogs = alarmsData?.slice(0, 5);
    return firstFiveLogs;
  });

  useEffect(() => {
    if (AlarmsLogData?.length > 0) {
      const lastLog = AlarmsLogData[AlarmsLogData.length - 1];
      const description = lastLog.description;
      if (description && description.length >= 2) {
        const firstTwoLetters = description.substring(0, 2);
        setFirstTwoLetters(firstTwoLetters);
      }
    }
  }, [AlarmsLogData]);

  const toggleCartDropdown = () => {
    setIsCartDropdown(!isCartDropdown);
  };

  const removeItem = (ele) => {
    var price = ele
      .closest(".dropdown-item-cart")
      .querySelector(".cart-item-price").innerHTML;
    var subTotal = cardItemTotal.current.innerHTML;
    cardItemTotal.current.innerHTML = subTotal - price;

    ele.closest(".dropdown-item-cart").remove();
    const element = document.querySelectorAll(".dropdown-item-cart").length;
    const ecart = document.getElementById("empty-cart");

    if (element === 0) {
      ecart.style.display = "block";
    } else {
      ecart.style.display = "none";
    }

  };

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
          id="listofevents43"
        >
          <i className="bx bx bx-calendar fs-22"></i>
          <span className="position-absolute cartitem-badge topbar-badge fs-10 translate-middle badge rounded-pill bg-info">
            {AlarmsLogData.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </DropdownToggle>
        <UncontrolledTooltip placement="bottom" target="listofevents43">
          Events
        </UncontrolledTooltip>
        <DropdownMenu
          className="dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
          aria-labelledby="page-header-cart-dropdown"
        >
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fs-16 fw-semibold"> Latest Events</h6>
              </Col>
              <div className="col-auto">
                <span className="badge badge-soft-warning fs-13">
                  <span className="cartitem-badge"> {AlarmsLogData?.length} </span> LOGS
                </span>
              </div>
            </Row>
          </div>
          <SimpleBar style={{ maxHeight: "300px" }}>
          <div className="p-2">
      {Array.isArray(AlarmsLogData) ? (
        AlarmsLogData.map((item, index) => (
          <div
            className="d-block dropdown-item text-wrap dropdown-item-cart px-3 py-2"
            key={index}
          >
            <div className="d-flex align-items-center">
              <img
                src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50" y="50" font-size="80  " text-anchor="middle" alignment-baseline="middle">${firstTwoLetters}</text></svg>`}
                className="me-3 rounded-circle avatar-sm p-2 bg-light"
                alt="user-pic"
              />
              <div className="flex-1">
                <h6 className="mt-0 mb-1 fs-12">
                  <Link className="text-reset">
                    {item.alarmType}
                    {item.deviceId && <> / {item.deviceId}</>}
                  </Link>
                </h6>
                {item.description !== " null" && (
                  <p className="mb-0 fs-12 text-muted">
                    <b>Desc:</b> <span>{item.description}</span>
                  </p>
                )}
              </div>
              <div className="px-2">
                <h6 className="m-0 fw-normal fs-10">
                  <span className="cart-item-price">
                    <b>{moment(item.createdDate).format('hh:mm A')}</b>
                  </span>
                </h6>
              </div>
              <div className="ps-2">
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                  onClick={(e) => {
                    removeItem(e.target);
                  }}
                >
                  {/* <i className="ri-close-fill fs-16"></i> */}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No alarm data available.</p>
      )}
    </div>
          </SimpleBar>
          <div
            className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
            id="checkout-elem"
          >
            <Link
              to="/events"
              className="btn btn-success text-center w-100"
            >
              View All Events
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default MyCartDropdown;
