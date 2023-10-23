import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import PacketProkerSetup from "../PacketProker/PacketProkerSetup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const PacketBroker = (props) => {
  document.title = "Topology Viewer";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Col xl={12}>
                    <PacketProkerSetup />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
    </React.Fragment>
  );
};

export default PacketBroker;
