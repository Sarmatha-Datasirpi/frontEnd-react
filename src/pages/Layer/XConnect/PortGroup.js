import React from "react";
import { Modal, Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";

export default function PortGroup({
  portGroup,
  setPortGroup,
  ports,
  setPorts,
  createGroup,
  removeGroup,
  groupOperation,
}) {
  const [groupName, setGroupName] = React.useState("");

  const handleClose = (e) => {
    // if (modalRef.current === e.target) {
    setPortGroup(false);
    // }
  };

  const setGroupNaming = (e) => setGroupName(e.target.value);

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
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="name"
                    onChange={setGroupName}
                  />
                </FloatingLabel>
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
              onClick={() => removeGroup(ports)}
            >
              Remove Port Channels
            </Button>
            <Button
              hidden={groupOperation === "ungroup"}
              variant="primary"
              onClick={() => createGroup(ports, groupName)}
            >
              Add Port Channels
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}
