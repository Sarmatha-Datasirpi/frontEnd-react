import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const PacketProker = (props) => {
  document.title = "DPB-NMS | Layer";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Col xl={12}>
                    {/* <XConnectSetup /> */}
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

export default PacketProker;
