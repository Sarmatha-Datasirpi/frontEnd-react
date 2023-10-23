import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import UserManagement from "../User/UserManagement";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const User = (props) => {
    document.title ="DPB-NMS | User Management";
    const [rightColumn, setRightColumn] = useState(true);
    const toggleRightColumn = () => {
      setRightColumn(!rightColumn);
    };
  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
      {/* <BreadCrumb title="Users" pageTitle="Dashboards" /> */}
        <Row>
          <Col className="col-xxl-12 order-xxl-0 order-first">
              <Row>
                  <UserManagement/>
              </Row>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  )
};

export default User;
