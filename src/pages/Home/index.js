import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import HomeComponents from "../Home/HomeComponents";

const Home = () => {
  document.title = "DPB-NMS | Topology Viewer";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <HomeComponents />
      </div>
    </React.Fragment>
  );
};

export default Home;
