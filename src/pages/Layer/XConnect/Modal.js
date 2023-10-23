import GoldstoneinterfaceCofig from "../../Routing/Interface/goldstoneinterfaceCofig.modal";
import Ocnosinterfaceconfig from "../../Routing/Interface/ocnosinterfaceConfig";
import SonicInterfaceConfig from "../../Routing/Interface/SonicInterfaceConfig";
import PortchannelConfig from "../../Routing/Interface/PortchannelConfig";
import React, { useEffect, useCallback, useState } from "react";
import FilterPopup from "../XConnect/Filter-Popup";
import { Tabs, Tab } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../XConnect/App.css";


export function Modals({
  showModal,
  setShowModal,
  mapData,
  setMapData,
  modalProps,
  configuringMap,
  configuringRule,
  goldstonemodalProps,
  deviceID,
}) {
  const closeModal = (e) => {
    // if (modalRef.current === e.target) {
    setShowModal(false);

    // }
  };
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  const [key, setKey] = useState("general");

  return (
    <>
      {(() => {
        switch (modalProps.section) {
          // case "goldstone":
          //   return (
          //     <GoldstoneinterfaceCofig
          //       showModal={showModal}
          //       setShowModal={setShowModal}
          //       goldstonemodalProps={goldstonemodalProps}
          //       deviceID={deviceID}
          //     />
          //   );
          // case "ocnos":
          //   return (
          //     <Ocnosinterfaceconfig
          //       showModal={showModal}
          //       setShowModal={setShowModal}
          //       ocnosInterfaceData = {goldstonemodalProps}
          //     />
          //   );
          case "sonic":
            return (
              <SonicInterfaceConfig
                showModal={showModal}
                setShowModal={setShowModal}
                goldstonemodalProps={goldstonemodalProps}
                deviceID={deviceID}
              />
            );
          case "portchannel":
            return (
              <PortchannelConfig
                showModal={showModal}
                setShowModal={setShowModal}
                goldstonemodalProps={goldstonemodalProps}
                deviceID={deviceID}
              />
            );
          case "dynamicFilter":
            return (
              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Dynamic Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => {
                      setKey(k);
                    }}
                    className="mb-3"
                  >
                    <Tab eventKey="general" title="General">
                      <FilterPopup
                        sectionName={"general"}
                        configuringMap={(e) => configuringMap(e)}
                      />
                    </Tab>
                    <Tab eventKey="filterCriteria" title="Filter Criteria">
                      <FilterPopup
                        sectionName={"filterCriteria"}
                        configuringRule={(e) => configuringRule(e)}
                      />
                    </Tab>
                  </Tabs>
                </Modal.Body>
              </Modal>
            );
          // case "xConnect":
          //   return (
          //     <Modal show={showModal} onHide={closeModal}>
          //       <Modal.Header closeButton>
          //         <Modal.Title>{modalProps.section}</Modal.Title>
          //       </Modal.Header>
          //       <Modal.Body>
          //         <FilterPopup
          //           sectionName={modalProps.section}
          //           mapData={mapData}
          //           setMapData={setMapData}
          //           configuringMap={(e) => configuringMap(e)}
          //         />
          //       </Modal.Body>
          //     </Modal>
          //   );
          default:
            return (
              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{modalProps.section}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FilterPopup sectionName="dynamicFilter" />
                </Modal.Body>
              </Modal>
            );
        }
      })()}
    </>
  );
}
