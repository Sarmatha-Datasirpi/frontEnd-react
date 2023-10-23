import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ParticlesAuth from "../ParticlesAuth";

//import images
import logoLight from "../../../assets/images/logo-light.png";

const BasicLogout = () => {
  document.title = "Log Out | DPB-NMS - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="auth-page-content">
        <div className="auth-page-wrapper">
          <ParticlesAuth>
            <div className="auth-page-content">
              <Container>
                <Row></Row>

                <Row className="justify-content-center"></Row>
              </Container>
            </div>
          </ParticlesAuth>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BasicLogout;
