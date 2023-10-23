import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import InventoryManagementList from "../DashboardInventory/InventoryManagementList";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Inventory = (props) => {
  document.title = "DPB-NMS | Devices";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <BreadCrumb title="Inventory" pageTitle="Dashboards" /> */}

          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Col xl={12}>
                    <InventoryManagementList />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Inventory;
