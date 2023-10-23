import React, { useCallback, useState, useRef, useEffect } from "react";
import { Modal, Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

export default function PortGroup({
  portGroup,
  setPortGroup,
  ports,
  setPorts,
  createGroup,
  removeGroup,
  groupOperation,
  portChannelData,
}) {
  const [groupName, setGroupName] = React.useState("");
  const [error, setError] = useState(false);
  const handleClose = (e) => {
    setPortGroup(false);
    setGroupName("");
  };
  {
    const setGroupNaming = (e) => {
      setGroupName(e.target.value);
      if (parseInt(e.target.value) > 16) {
        setError(true);
      } else {
        setError(false);
      }
    };
    useEffect(() => {
      if (portChannelData && Object.keys(portChannelData).length > 0) {
        setGroupName(portChannelData.data.label.split("PortChannel")[1]);
      }
    }, [portChannelData]);
    return (
      <>
        {portGroup ? (
          <Modal show={portGroup} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Port Channels Grouping</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="g-2">
                <Col md>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Portchannel ID(1-16)"
                    className="mb-3"
                    variant="primary"
                  >
                    <Form.Control
                      type="number"
                      placeholder="name"
                      value={groupName}
                      className={error ? "is-invalid" : ""}
                      onChange={setGroupNaming}
                      min={1}
                      max={16}
                    />
                  </FloatingLabel>
                  {error ? (
                    <span className="bg-dark text-light p-1 fs-6 rounded-3">
                      Numbers must range from 1 to 16
                    </span>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md>
                  <FloatingLabel controlId="floatingPassword" label="Members">
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      value={ports.map((port) => port.id)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                hidden={groupOperation === "group"}
                variant="secondary"
                onClick={() => removeGroup(ports, groupName)}
              >
                Remove Port Channels
              </Button>
              <Button
                hidden={groupOperation === "ungroup"}
                variant="primary"
                disabled={error}
                onClick={() => createGroup(ports, groupName)}
              >
                Add Port Channels
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  }
}
