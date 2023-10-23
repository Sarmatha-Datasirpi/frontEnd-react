import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import TopologyViewer from "../DashboardTopology/TopologyViwer";
import TopologyLogs from "../DashboardTopology/TopologyLogs";
// import BestSellingProducts from "./BestSellingProducts";
// import RecentActivity from "./RecentActivity";
// import RecentOrders from "./RecentOrders";
// import Revenue from "./Revenue";
// import SalesByLocations from "./SalesByLocations";
// import Section from "./Section";
// import StoreVisits from "./StoreVisits";
// import TopSellers from "./TopSellers";

const DashboardTopology = () => {
  document.title = "DPB-NMS | Topology Viewer";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Container fluid> */}
        <TopologyViewer />
        {/* </Container> */}
      </div>
    </React.Fragment>
  );
};

export default DashboardTopology;
