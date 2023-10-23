import React, { useCallback, useState, useRef, useEffect } from "react";
import GridTable from "./GritTable";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  FloatingLabel,
  Row,
  Col,
  Table,
  ButtonGroup,
} from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import { getRuleData } from "../../../store/PacketProker/action";

export default function FilterPopup({
  sectionName,
  configuringMap,
  configuringRule,
  mapData,
  setMapData,
}) {
  const dispatch = useDispatch();
  const [key, setKey] = useState(sectionName);
  const [mapGeneral, setMapGeneral] = useState({
    name: "",
    id: null,
  });
  const [mapXConnect, setMapXConnect] = useState({
    name: mapData?.name,
    revertion: mapData?.revertion,
  });

  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {}, [dispatch]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // id: (ticket && ticket.id) || '',
      // title: (ticket && ticket.title) || '',
      // client: (ticket && ticket.client) || '',
      // assigned: (ticket && ticket.assigned) || '',
      // create: (ticket && ticket.create) || '',
      // due: (ticket && ticket.due) || '',
      // status: (ticket && ticket.status) || '',
      // priority: (ticket && ticket.priority) || '',
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("Please Enter id"),
      // title: Yup.string().required("Please Enter Title"),
      // client: Yup.string().required("Please Enter Client Name"),
      // assigned: Yup.string().required("Please Enter Assigned Name"),
      // // create: Yup.string().required("Please Enter Create Date"),
      // // due: Yup.string().required("Please Enter Your Due Date"),
      // status: Yup.string().required("Please Enter Your Joining status"),
      // priority: Yup.string().required("Please Enter Your Priority")
    }),
    onSubmit: (values) => {
      // if (isEdit) {
      //     const updateTickets = {
      //         _id: ticket ? ticket._id : 0,
      //         id: values.id,
      //         title: values.title,
      //         client: values.client,
      //         assigned: values.assigned,
      //         create: credate,
      //         due: duedate,
      //         status: values.status,
      //         priority: values.priority,
      //     };
      //     // update ticket
      //     dispatch(updateTicket(updateTickets));
      //     validation.resetForm();
      // } else {

      //     const newTicket = {
      //         _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
      //         id: values["id"],
      //         title: values["title"],
      //         client: values["client"],
      //         assigned: values["assigned"],
      //         create: credate,
      //         due: duedate,
      //         status: values["status"],
      //         priority: values["priority"],
      //     };
      //     // save new ticket
      //     dispatch(addNewTicket(newTicket));
      //     validation.resetForm();
      // }
      // toggle();
    },
  });

  const { getRule_red } = useSelector((state) => ({
    getRule_red: state.PacketProker_reducer.getRule_red,
  }));

  var rulesList;
  if (getRule_red != undefined) {
    rulesList = getRule_red.rules;
  }

  const [selected, setSelected] = useState(true);
  const [statChecked, setStatChecked] = useState(true);
  const [actionChecked, setActionChecked] = useState(true);

  const [ruleForm, setRuleForm] = useState({
    ruleId: null,
    action: "permit",
    srcmac: "",
    destmac: "",
    vlan: "",
    ethertype: "",
    ipdst: "",
    ipsrc: "",
    srcipv6: "",
    smask: "",
    dstipv6: "",
    dmask: "",
    ttl: "",
    src_l4port: "",
    dst_l4port: "",
    protocol: "",
    stats: "disable",
    match_all: "disable",
  });

  const onFormSubmit = () => {
    };

  const onInput = (value, id) => {
    setRuleForm({
      ...ruleForm,
      [id]: value,
    });
  };

  const onMapGeneralInput = (value, id) => {
    setMapGeneral({
      ...mapGeneral,
      [id]: value,
    });
  };

  const onXConnectInput = (value, id) => {
    setMapXConnect({
      ...mapXConnect,
      [id]: value,
    });
  };

  const availableFilterOutput = (value, laneKey, portKey) => {
    setRuleForm((prevState) => ({
      ...prevState,
      [laneKey]: {
        ...prevState[laneKey],
        [portKey]: value,
      },
    }));
  };

  useEffect(() => {
    //dispatch(getRuleData("1001"))
  }, [ruleForm]);

  switch (key) {
    case "general":
      return (
        <div>
          <Row className="g-2">
            <Col md>
              <FloatingLabel label="ID">
                <Form.Control
                  type="text"
                  placeholder="Password"
                  onChange={(event) =>
                    onMapGeneralInput(event.target.value, "id")
                  }
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInput"
                label="Push Vlan"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="push-vlan"
                  onChange={(event) =>
                    onMapGeneralInput(event.target.value, "pushvlan")
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  onClick={() => configuringMap(mapGeneral)}
                >
                  Create
                </Button>
                <Button
                  variant="danger"
                  hidden
                  type="submit"
                  onClick={() => alert("On delete function")}
                >
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      );
    case "filterCriteria":
      return (
        <>
          <Row>
            <Col>
              <Form name="ruleForm">
                <Form.Group>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rule ID"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        onChange={(event) =>
                          onInput(event.target.value, "ruleId")
                        }
                        name="ruleId"
                        placeholder="name"
                        size="sm"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <div key="inline-radio" className="mb-3">
                      <span className="fw-bold">Match All : </span> &nbsp;
                      <Form.Check
                        inline
                        label="Enable"
                        type="radio"
                        id="enable"
                        name="enableDisable"
                        value="enable"
                        onChange={(event) => {
                          setIsReadOnly(true);
                          onInput(event.target.value, "match_all");
                        }}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        type="radio"
                        name="enableDisable"
                        value="disable"
                        id="disable"
                        defaultChecked={selected}
                        onChange={(event) => {
                          setIsReadOnly(false);
                          onInput(event.target.value, "match_all");
                        }}
                      />
                    </div>
                  </Col>

                  <Col>
                    <div key="inline-radio" className="mb-3">
                      <span className="fw-bold">Stats : </span> &nbsp;
                      <Form.Check
                        inline
                        label="Enable"
                        type="radio"
                        id="enable"
                        name="stats"
                        value="enable"
                        onChange={(event) => {
                          onInput(event.target.value, "stats");
                        }}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        type="radio"
                        name="stats"
                        value="disable"
                        id="disable"
                        defaultChecked={statChecked}
                        onChange={(event) => {
                          onInput(event.target.value, "stats");
                        }}
                      />
                    </div>
                  </Col>

                  <Col>
                    <div key="inline-radio" className="mb-1">
                      <span className="fw-bold">Action : </span> &nbsp;
                      <Form.Check
                        inline
                        label="Permit"
                        type="radio"
                        id="permit"
                        name="action"
                        value="permit"
                        defaultChecked={actionChecked}
                        onChange={(event) => {
                          onInput(event.target.value, "action");
                        }}
                      />
                      <Form.Check
                        inline
                        label="Deny"
                        type="radio"
                        name="action"
                        value="deny"
                        id="deny"
                        onChange={(event) => {
                          onInput(event.target.value, "action");
                        }}
                      />
                    </div>
                  </Col>
                  <br />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th colSpan={4}>Available Filters</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>L2</td>
                        <td>
                          <Form.Label>SMAC</Form.Label>
                          <Form.Control
                            name="srcmac"
                            type="input"
                            id="srcmac"
                            disabled={isReadOnly}
                            onChange={(event) => {
                              onInput(event.target.value, "srcmac");
                            }}
                          />
                        </td>
                        <td>
                          <Form.Label>DMAC</Form.Label>
                          <Form.Control
                            name="destmac"
                            type="input"
                            id="destmac"
                            disabled={isReadOnly}
                            onChange={(event) => {
                              onInput(event.target.value, "destmac");
                            }}
                          />
                        </td>
                        <td>
                          <Form.Label>Ether Type</Form.Label>
                          <Form.Control
                            name="ethertype"
                            type="input"
                            id="ethertype"
                            disabled={isReadOnly}
                            onChange={(event) => {
                              onInput(event.target.value, "ethertype");
                            }}
                          />
                        </td>
                      </tr>
                      <tr rowSpan={4}>
                        <td>L3</td>
                        <td colSpan={3}>
                          <tr>
                            <td>
                              <Form.Label>DIP</Form.Label>
                              <Form.Control
                                name="ipdst"
                                type="input"
                                id="ipdst"
                                disabled={isReadOnly}
                                onChange={(event) => {
                                  onInput(event.target.value, "ipdst");
                                }}
                              />
                            </td>
                            <td>
                              <Form.Label>SIP</Form.Label>
                              <Form.Control
                                name="ipsrc"
                                type="input"
                                id="ipsrc"
                                disabled={isReadOnly}
                                onChange={(event) => {
                                  onInput(event.target.value, "ipsrc");
                                }}
                              />
                            </td>
                            <td>
                              <Form.Label>SIP V6</Form.Label>
                              <Form.Control
                                name="srcipv6"
                                type="input"
                                id="srcipv6"
                                disabled={isReadOnly}
                                onChange={(event) => {
                                  onInput(event.target.value, "srcipv6");
                                }}
                              />
                            </td>
                            <td>
                              <Form.Label>SMASK </Form.Label>
                              <Form.Control
                                name="smask"
                                type="input"
                                id="smask"
                                disabled={isReadOnly}
                                onChange={(event) => {
                                  onInput(event.target.value, "smask");
                                }}
                              />
                            </td>
                          </tr>
                          <br />
                          <tr>
                            <td>
                              <Form.Label>DIP V6</Form.Label>
                              <Form.Control
                                name="dstipv6"
                                type="input"
                                id="dstipv6"
                                disabled={isReadOnly}
                                onChange={(event) => {
                                  onInput(event.target.value, "dstipv6");
                                }}
                              />
                            </td>
                            <td>
                              <Form.Label>DMASK</Form.Label>
                              <Form.Control
                                name="dmask"
                                type="input"
                                id="dmask"
                                disabled={isReadOnly}
                                onChange={(event) => {
                                  onInput(event.target.value, "dmask");
                                }}
                              />
                            </td>
                            <td>
                              <Form.Label>TTL</Form.Label>
                              <Form.Control
                                name="ttl"
                                type="input"
                                id="ttl"
                                disabled={isReadOnly}
                                onChange={(event) => {
                                  onInput(event.target.value, "ttl");
                                }}
                              />
                            </td>
                          </tr>
                        </td>
                      </tr>
                      <tr>
                        <td>L4</td>
                        <td>
                          <Form.Label>S Port</Form.Label>
                          <Form.Control
                            name="src_l4port"
                            type="input"
                            id="src_l4port"
                            disabled={isReadOnly}
                            onChange={(event) => {
                              onInput(event.target.value, "src_l4port");
                            }}
                          />
                        </td>
                        <td>
                          <Form.Label>D Port</Form.Label>
                          <Form.Control
                            name="dst_l4port"
                            type="input"
                            id="dst_l4port"
                            disabled={isReadOnly}
                            onChange={(event) => {
                              onInput(event.target.value, "dst_l4port");
                            }}
                          />
                        </td>
                        <td>
                          <Form.Label>Protocol</Form.Label>
                          <Form.Control
                            name="protocol"
                            type="input"
                            id="protocol"
                            disabled={isReadOnly}
                            onChange={(event) => {
                              onInput(event.target.value, "protocol");
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <br />
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => configuringRule(ruleForm)}
                    >
                      Add Rule
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <br />

              <GridTable />

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan={3}>Configured Filters</th>
                  </tr>
                  <tr>
                    <th>Rule Id</th>
                    <th>Filters</th>
                    <th>Stats</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rulesList != undefined ? (
                    <>
                      {Object.keys(rulesList).map((key) => (
                        <tr key={key}>
                          <td>{rulesList[key].rule_id}</td>
                          <td>
                            {rulesList[key].match_all == "disable" ? (
                              <>
                                <span>
                                  {rulesList[key].action},
                                  {rulesList[key].match_all},
                                  {rulesList[key].srcmac},
                                  {rulesList[key].destmac},{rulesList[key].vlan}
                                  ,{rulesList[key].ethertype},
                                  {rulesList[key].ipdst},{rulesList[key].ipsrc}
                                </span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {rulesList[key].action},{rulesList[key].stats}
                                  ,{rulesList[key].match_all}
                                </span>
                              </>
                            )}
                          </td>
                          <td>{rulesList[key].counters}</td>
                          <td>
                            <ButtonGroup aria-label="Basic example">
                              <Button variant="primary">
                                <MdModeEditOutline />
                              </Button>
                              &nbsp;
                              <Button variant="secondary">
                                <MdDelete />
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      );
    case "xConnect":
      return (
        <>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  onChange={(event) =>
                    setMapData({
                      name: event.target.value,
                      revertion: mapData.revertion,
                    })
                  }
                  value={mapData.name}
                  name="name"
                  placeholder="name"
                  size="sm"
                />
              </FloatingLabel>

              <div key="inline-radio" className="mb-3">
                <span className="fw-bold">Revertion:</span> &nbsp;
                <Form.Check
                  inline
                  label="Revertive"
                  type="radio"
                  id="true"
                  name="stats"
                  checked={mapData.revertion === "true"}
                  value="true"
                  onChange={(event) =>
                    setMapData({ name: mapData.name, revertion: "true" })
                  }
                />
                <Form.Check
                  inline
                  label="Non-Revertive"
                  type="radio"
                  name="stats"
                  value="false"
                  id="false"
                  checked={mapData.revertion === "false"}
                  onChange={(event) =>
                    setMapData({ name: mapData.name, revertion: "false" })
                  }
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  size="lg"
                  type="submit"
                  variant="primary"
                  onClick={() => configuringMap(mapData)}
                >
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        </>
      );
    case "goldstone":
      return (
        <>
          <Row className="d-flex justify-content-between">
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <Form.Group className="mb-3" controlId="adminStatus">
                  <div key="inline-radio" className="mb-3">
                    <span className="fw-bold">Admin Status</span> &nbsp;
                    <Form.Check
                      inline
                      label="Enabled"
                      type="radio"
                      id="enable"
                      name="stats"
                      value="enabled"
                    />
                    <Form.Check
                      inline
                      label="Disabled"
                      type="radio"
                      name="stats"
                      value="disabled"
                      id="disable"
                      defaultChecked={statChecked}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="mtu">
                  <Form.Label>MTU</Form.Label>
                  <Form.Control type="text" placeholder="MTU" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="fecMode">
                  <Form.Label>FEC Mode(in capital)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="FEC Mode(in capital)"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="interfaceType">
                  <Form.Label>Interface Type</Form.Label>
                  <Form.Control type="text" placeholder="Interface Type" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <Form.Group className="mb-3" controlId="autoNegotiate">
                  <div key="inline-radio" className="mb-3">
                    <span className="fw-bold">Auto Negotiate :</span> &nbsp;
                    <Form.Check
                      inline
                      label="Enabled"
                      type="radio"
                      id="enable"
                      name="stats"
                      value="enabled"
                    />
                    <Form.Check
                      inline
                      label="Disabled"
                      type="radio"
                      name="stats"
                      value="disabled"
                      id="disable"
                      defaultChecked={statChecked}
                    />
                  </div>
                  <Form.Label>Auto Negotiate Speed</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Auto Negotiate Speed"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="breakout">
                  <Form.Label>Channel Number</Form.Label>
                  <Form.Control type="text" placeholder="Channel Number" />
                  <Form.Label>Speed</Form.Label>
                  <Form.Control type="text" placeholder="Speed" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="vlanSwitchPort">
                  <Form.Label>VLAN Switch Port</Form.Label>
                  <Form.Control type="text" placeholder="VLAN Switch Port" />
                </Form.Group>
              </Col>
            </Row>
          </Row>

          {/* Transponder Netify Commands... */}
          <hr />

          <Row className="d-flex justify-content-between">
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <Form.Group className="mb-3" controlId="berPeriod">
                  <Form.Label>Ber period</Form.Label>
                  <Form.Control type="text" placeholder="Ber period" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="chlFrequency">
                  <Form.Label>Chl Frequency</Form.Label>
                  <Form.Control type="text" placeholder="Chl Frequency" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="netifyLoopbackType">
                  <Form.Label>Netify Loopback Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Netify Loopback Type"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="modulationFormat">
                  <Form.Label>Moudulation Format</Form.Label>
                  <Form.Control type="text" placeholder="Moudulation Format" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="outputPower">
                  <Form.Label>Output Power</Form.Label>
                  <Form.Control type="text" placeholder="Output Power" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <Form.Group className="mb-3" controlId="prbsType">
                  <Form.Label>PRBS Type</Form.Label>
                  <Form.Control type="text" placeholder="PRBS Type" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="pulseShaping">
                  <Form.Label>Pulse Shaping</Form.Label>
                  <Form.Control type="text" placeholder="Pulse Shaping" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="txDisable">
                  <Form.Label>TX Disable</Form.Label>
                  <Form.Control type="text" placeholder="TX Disable" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="txLaserFrequency">
                  <Form.Label>Tx Laser Frequency</Form.Label>
                  <Form.Control type="text" placeholder="Tx Laser Frequency" />
                </Form.Group>
              </Col>
            </Row>
          </Row>

          {/* Transponder Hostify Commands... */}
          <hr />
          <Row className="d-flex justify-content-between">
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <Form.Group className="mb-3" controlId="signalRatio">
                  <Form.Label>Signal Ratio</Form.Label>
                  <Form.Control type="text" placeholder="Signal Ratio" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="fecType">
                  <Form.Label>FEC Type</Form.Label>
                  <Form.Control type="text" placeholder="FEC Type" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="loopback">
                  <Form.Label>Loopback</Form.Label>
                  <Form.Control type="text" placeholder="Loopback" />
                </Form.Group>
              </Col>
            </Row>
          </Row>
        </>
      );
    case "ocnos":
      return (
        <>
          <Row className="d-flex justify-content-between">
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <span className="fw-bold">Admin State</span> &nbsp;
                <Form.Group className="mb-3" controlId="adminStatus">
                  <div key="inline-radio" className="mb-3">
                    <Form.Check
                      inline
                      label="Enabled"
                      type="radio"
                      id="enable"
                      name="stats"
                      value="enabled"
                    />
                    <Form.Check
                      inline
                      label="Disabled"
                      type="radio"
                      name="stats"
                      value="disabled"
                      id="disable"
                      defaultChecked={statChecked}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="mtu">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="MTU" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="mtu">
                  <Form.Label>MTU</Form.Label>
                  <Form.Control type="number" placeholder="MTU" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="fecMode">
                  <Form.Label>Speed</Form.Label>
                  <Form.Select size="sm">
                    <option>1G</option>
                    <option>10G</option>
                    <option>25G</option>
                    <option>40G</option>
                    <option>100G</option>
                    <option>400G</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <Form.Group className="mb-3" controlId="interfaceType">
                  <Form.Label>IP Address</Form.Label>
                  <Form.Control type="text" placeholder="Interface Type" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="interfaceType">
                  <Form.Label>IPV6 Address</Form.Label>
                  <Form.Control type="text" placeholder="Interface Type" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="interfaceType">
                  <Form.Label>FEC</Form.Label>
                  <Form.Control type="text" placeholder="Interface Type" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between"></Row>
          </Row>
        </>
      );
    default:
      return null;
  }
}
