import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//import images
import progileBg from "../../../../assets/images/profile-bg.jpg";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  document.title = "Profile Settings | DPB-NMS - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img src={progileBg} className="profile-wid-img" alt="" />
              <div className="overlay-content">
                <div className="text-end p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                    />
                    <Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light"
                    >
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
