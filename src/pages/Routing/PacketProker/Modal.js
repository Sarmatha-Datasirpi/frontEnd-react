import React, { useRef, useEffect, useCallback, useState } from "react";
import "../PacketProker/App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Tabs, Tab } from "react-bootstrap";
import { UncontrolledTooltip } from "reactstrap";
import FilterPopup from "../PacketProker/Filter-Popup";
import MapRulesconfig from "./MapRulesconfig";
import { getRuleData } from "../../../store/PacketProker/action";

//redux
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export function Modals({
  showModal,
  setShowModal,
  mapRuleData,
  setMapRuleData,
  mapGeneralData,
  setMapGeneralData,
  // defaultMapId,
  deleteMapDataByMapId,
  configuringMap,
  configuringRule,
  deleteRule,
  editRule,
  showFilterCriteria,
}) {
  const dispatch = useDispatch();
  const deviceIpAddress = useParams().id;
  //console.log(showModal);
  const modalRef = useRef();

  const closeModal = (e) => {
    // if (modalRef.current === e.target) {
    setKey("general");
    setShowModal(false);
    // }
  };
  //console.log("inside modal:" + defaultMapId)
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        //console.log("I pressed");
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
      {showModal ? (
        <Modal
          fullscreen="true"
          size="xl"
          show={showModal}
          onHide={closeModal}
          className="packetproker-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Dynamic Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => {
                console.log(k);
                switch (k) {
                  case "filterCriteria":
                    setKey(k);
                    // dispatch(getRuleData({mapId: mapGeneralData.mapId, deviceId: deviceIpAddress}));
                    // setInterval(() => {
                    //   dispatch(getRuleData(mapRuleData.mapId));
                    // }, 30000);
                    break;

                  case "general":
                    setKey(k);
                    break;

                  default:
                    break;
                }
              }}
              className="mb-3"
            >
              <Tab eventKey="general" title="General">
                <FilterPopup
                  sectionName={"general"}
                  mapGeneralData={mapGeneralData}
                  setMapGeneralData={setMapGeneralData}
                  // configuringMap={(e, operation) =>
                  //   configuringMap(e, operation)
                  // }
                  deleteMapDataByMapId={(e) => deleteMapDataByMapId(e)}
                // currentmapid = {defaultMapId}
                />
              </Tab>
              <Tab
                eventKey="filterCriteria"
                title="Filter Criteria"
                disabled={!showFilterCriteria}
              >
                <FilterPopup
                  sectionName={"filterCriteria"}
                  mapRuleData={mapRuleData}
                  setMapRuleData={setMapRuleData}
                  configuringRule={(e) => configuringRule(e)}
                  deleteRule={(delmapid, ruleid) =>
                    deleteRule(delmapid, ruleid)
                  }
                  editRule={(e) => editRule(e)}
                // currentmapid = {defaultMapId}
                />
              </Tab>
            </Tabs>
          </Modal.Body>
          {/* <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={closeModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer> */}
        </Modal>
      ) : null}
    </>
  );
}
