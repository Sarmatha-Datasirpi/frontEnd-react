import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "reactstrap";

import AuthSlider from "../authCarousel";

const CoverLogout = () => {
  document.title = "DPB-NMS | Log Out";
  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container></Container>
        </div>

        {/* <!-- end Footer --> */}
      </div>
    </React.Fragment>
  );
};

export default CoverLogout;
