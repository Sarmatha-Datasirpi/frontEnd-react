import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import DeviceComponents from "./DeviceComponents";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

const DeviceManagement = () => {
  document.title = "DPB-NMS | Device Management";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Container fluid> */}
        <DeviceComponents />
        {/* </Container> */}
      </div>
    </React.Fragment>
  );
};

export default DeviceManagement;
