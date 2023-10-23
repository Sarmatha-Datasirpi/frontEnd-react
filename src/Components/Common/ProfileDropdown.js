import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));

  const [username, setUserName] = useState();
  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      setUserName(obj.username);
    }
  }, [username, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn" class>
          <span className="d-flex align-items-center">
            {username != undefined ? capitalize(username.split("@")[0]) : ""}
            &nbsp;
            <i className="mdi mdi-chevron-down text-muted fs-16 align-middle me-1"></i>
          </span>
          {/* </span> */}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">
            Welcome{" "}
            {username != undefined ? capitalize(username.split("@")[0]) : ""}!
          </h6>
          <DropdownItem href={process.env.PUBLIC_URL + "/profile"}>
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem>
          <DropdownItem href={process.env.PUBLIC_URL + "/logout"}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
