import React, { useCallback, useState, useRef, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Card, CardBody, Col } from "reactstrap";
import { getInterfaceData } from "../../../store/Interfaces/action";
import { getDemoData } from "../../../store/demo/action";
const cyptoWidgets = [
  {
    id: 1,
    icon: "ri-money-dollar-circle-fill",
    label: "Port",
    interface: "172.26.1.127",
    badge: "ri-arrow-up-s-fill",
    badgeColor: "success",
    percentage: "6.24",
    prefix: "IP: ",
    separator: ",",
  },
  {
    id: 2,
    icon: "ri-arrow-up-circle-fill",
    label: "Port",
    interface: "172.26.1.128",
    badge: "ri-arrow-up-s-fill",
    badgeColor: "success",
    percentage: "3.67",
    prefix: "IP: ",
    separator: ",",
  },
  {
    id: 3,
    icon: "ri-arrow-down-circle-fill",
    label: "Port",
    interface: "172.26.1.129",
    badge: "ri-arrow-down-s-fill",
    badgeColor: "danger",
    percentage: "4.80",
    prefix: "IP: ",
    separator: ",",
  },
  {
    id: 4,
    icon: "ri-arrow-down-circle-fill",
    label: "Port",
    interface: "172.26.1.130",
    badge: "ri-arrow-down-s-fill",
    badgeColor: "danger",
    percentage: "4.80",
    prefix: "IP: ",
    separator: ",",
  },
];

const InterfaceSetup = (props) => {
  const dispatch = useDispatch();
  const { interfaceData } = useSelector((state) => ({
    interfaceData: state.Interface_reducer.interfaceData,
  }));
  const { demoData } = useSelector((state) => ({
    demoData: state.Demo.demoData,
  }));

  useEffect(() => {
    dispatch(getInterfaceData());
    dispatch(getDemoData());
  }, [dispatch]);

  return (
    <React.Fragment>
      {(cyptoWidgets || []).map((item, key) => (
        <Col lg={3} md={3} key={key}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                    <i className={"align-middle " + item.icon}></i>
                  </span>
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                    {item.label}
                  </p>
                  <h4 className=" mb-0">{item.interface}</h4>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default InterfaceSetup;
