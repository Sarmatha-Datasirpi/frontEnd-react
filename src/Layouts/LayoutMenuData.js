import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoSm from "../assets/images/logo-sm.png";
const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isInventory, setIsInventory] = useState(false);
  const [isDeviceMgmt, setIsDeviceMgmt] = useState(false);
  const [isLayer, setIsLayer] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  const [isDashboard, setIsDashboard] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Inventory") {
      setIsInventory(false);
    }
    if (iscurrentState !== "DeviceManagement") {
      setIsDeviceMgmt(false);
    }

    if (iscurrentState !== "Layer") {
      setIsLayer(false);
    }

    if (iscurrentState !== "Routing") {
      setIsRouting(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isLayer,
    isRouting,
    isDeviceMgmt,
    isInventory,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    // {
    //   id: "topology",
    //   label: "Home",
    //   icon: "ri-home-wifi-line",
    //   link: "/dashboard",
    //   stateVariables: isDashboard,
    // },
    {
      id: "inventory",
      label: "Devices",
      icon: "ri-device-line",
      link: "/devices",
      stateVariables: isInventory,
      click: function (e) {
        e.preventDefault();
        setIsInventory(!isInventory);
        setIscurrentState("Inventory");
        updateIconSidebar(e);
      },
      // subItems: [
      //   {
      //     id: "inventorylist",
      //     label: "Devices",
      //     link: "/devices",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "xconnect",
      //     label: "XConnect",
      //     icon: "ri-links-line",
      //     link: "/layer/xconnect",
      //     parentId: "layer",
      //   },
      //   {
      //     id: "packetproker",
      //     label: "Packet broker",
      //     link: "/routing/packetproker",
      //     parentId: "routing",
      //   },
      //   {
      //     id: "interface",
      //     label: "Interface",
      //     link: "/routing/interface",
      //     parentId: "routing",
      //   },
      // ],
    },
    // {
    //   id: "layer",
    //   label: "Layer 1",
    //   icon: "ri-stack-line",
    //   link: "/#",
    //   stateVariables: isLayer,
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsLayer(!isLayer);
    //     setIscurrentState("Layer");
    //     updateIconSidebar(e);
    //   },
    //   subItems: [
    //     {
    //       id: "xconnect",
    //       label: "XConnect",
    //       icon: "ri-links-line",
    //       link: "/layer/xconnect",
    //       parentId: "layer",
    //     },
    //   ],
    // },
    // {
    //   id: "routing",
    //   label: "Routing",
    //   icon: "ri-router-line",
    //   link: "/#",
    //   stateVariables: isRouting,
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsRouting(!isRouting);
    //     setIscurrentState("Routing");
    //     updateIconSidebar(e);
    //   },
    //   subItems: [
    //     {
    //       id: "packetproker",
    //       label: "Packet broker",
    //       link: "/routing/packetproker",
    //       parentId: "routing",
    //     },
    //     {
    //       id: "interface",
    //       label: "Interface",
    //       link: "/routing/interface",
    //       parentId: "routing",
    //     },
    //   ],
    // },
    {
      id: "events",
      label: "Events",
      icon: "ri-history-line",
      link: "/events",
    },
    {
      id: "user",
      label: "User Management",
      icon: "ri-user-line",
      link: "/user",
      stateVariables: isDashboard,
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
