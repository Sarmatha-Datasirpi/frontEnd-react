/**
@Description      : This file contain Sonic config form 
**/
import { FecMode } from "./interfaceCommonConfigData";
import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateInterfaceConfigData } from "../../../store/Interfaces/action";
import { getInterfaceData } from "../../../store/Interfaces/action";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
function SonicInterfaceConfig(props) {

  const deviceIpAddress = useParams().id;
  const dispatch = useDispatch();

  const [interfaceRequestBody, setInterfaceRequestBody] = useState({
    deviceId: deviceIpAddress,
    name: props.goldstonemodalProps?.name,
    isUpdate: true
  });


  // const [lagIDRequestBody, setlagIDRequestBody] = useState({

  // });
  // console.log("lagIDRequestBody")




  useEffect(() => {
    if (props.goldstonemodalProps) {
      setInterfaceRequestBody({
        deviceId: deviceIpAddress,
        name: props.goldstonemodalProps?.name,
        adminStatus: props.goldstonemodalProps?.adminStatus,
        mtu: props.goldstonemodalProps?.mtu,
        speed: props.goldstonemodalProps?.speed,
        lagValue: props.goldstonemodalProps?.lagValue,
        breakoutMode: props.goldstonemodalProps?.breakoutMode,
        sourcePortLabel: props.goldstonemodalProps?.sourcePortLabel,
        isUpdate: true
      });
    }

    // if (interfaceRequestBody?.lagValue === "") {
    //   setlagIDRequestBody({
    //     deviceId: deviceIpAddress,
    //     name: props.goldstonemodalProps?.name,
    //     isInterface: true,
    //     isLagRemoved: true,
    //     lagValue: props.goldstonemodalProps?.lagValue,
    //   })

    // }
  }, [props.goldstonemodalProps]);

  const interfacespeedlabel = props?.goldstonemodalProps?.speed
  const interfacespeedvalue = props?.goldstonemodalProps?.speed;

  if (interfacespeedvalue) {
    const numericalValue = parseFloat(interfacespeedvalue);

  }
  // console.log(props.goldstonemodalProps)
  // const sonicspeedOptions = [

  //   { value: interfacespeedvalue, label: interfacespeedlabel },
  //   { value: "SPEED_UNKNOWN", label: "Unknown" },
  //   { value: "10", label: "10 Gbps" },
  //   { value: "100", label: "100 Gbps" },
  //   { value: "1000", label: "1000 Gbps" },
  //   { value: "2500", label: "2500 Gbps" },
  //   { value: "5000", label: "5000 Gbps" },
  //   { value: "10000", label: "10000 Gbps" },
  // ];


  // const supportedSpeedsArray = props?.goldstonemodalProps?.supportedSpeeds?.split(',');

  // const sonicspeedOptions = [
  //   { value: interfacespeedvalue, label: interfacespeedlabel },
  //   ...supportedSpeedsArray.map(speed => ({
  //     value: speed,
  //     label: `${speed}`,
  //   })),
  // ];

  // sonicspeedOptions.sort((a, b) => parseInt(a.value) - parseInt(b.value));

  const supportedSpeedsArray = props.goldstonemodalProps?.supportedSpeeds || [];

  const sonicspeedOptions = [
    { value: interfacespeedvalue, label: interfacespeedlabel },
    ...(supportedSpeedsArray || []).map((speed) => {
      const matches = speed.match(/\d+/);
      const numericValue = matches ? parseInt(matches[0]) : NaN;
      return {
        value: isNaN(numericValue) ? null : numericValue.toString(),
        label: (speed || '').trim(),
      };
    }).filter((option) => option?.value !== null),
  ];

  sonicspeedOptions.sort((a, b) => parseInt(a?.value) - parseInt(b?.value));


  const breakoutvalue = props?.goldstonemodalProps?.breakoutMode || "Port Breakout";
  const portSpeedOptions = [
    { value: breakoutvalue, label: breakoutvalue },
    { value: "2x50G", label: "2x50G" },
    //{ value: "2X20G", label: "2x20G" },
    { value: "4x25G", label: "4x25G" },
    { value: "4x10G", label: "4x10G" },
    { value: "1x100G[40G]", label: "1x100G[40G]" },
    //1x100G[40G]
  ];


  const handleFieldChange = (fieldName, fieldValue) => {
    setInterfaceRequestBody((prevRequestBody) => ({
      ...prevRequestBody,
      [fieldName]: fieldValue,
    }));
  };
  console.log(interfaceRequestBody)

  const handleSubmit = async () => {
    const originalInterfaceBody = props.goldstonemodalProps;

    const fieldsToUpdate = [
      "adminStatus",
      "mtu",
      "lagValue",
      "breakoutMode",
      "sourcePortLabel",
      "speed"
    ];

    const updatedFields = {};

    fieldsToUpdate.forEach(field => {
      if (interfaceRequestBody[field] !== originalInterfaceBody[field]) {
        updatedFields[field] = interfaceRequestBody[field];
      }
    });

    if (interfaceRequestBody.lagValue === "") {
      updatedFields.lagValue = props?.goldstonemodalProps?.lagValue;
      updatedFields.isLagRemoved = true;
      updatedFields.isInterface = true;
    }

    const requestBody = {
      deviceId: deviceIpAddress,
      name: props.goldstonemodalProps?.name,
      isUpdate: true,
      ...updatedFields,
    };

    const cleanedRequestBody = removeEmptyFields(requestBody);

    dispatch(updateInterfaceConfigData(cleanedRequestBody));

    await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for 3000 milliseconds
    await dispatch(getInterfaceData(props?.deviceID));
    closeModal();
  };



  const closeModal = () => {
    setInterfaceRequestBody({});
    props.setShowModal(false);
  };

  const removeEmptyFields = (obj) => {
    const cleanedObj = { adminStatus: interfaceRequestBody?.adminStatus };
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
        cleanedObj[key] = obj[key];
      }
    }
    return cleanedObj;
  };




  const { user, success, error } = useSelector(state => ({
    user: state.Profile.user,
    success: state.Profile.success,
    error: state.Profile.error
  }));

  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));

      if (!isEmpty(user)) {
        obj.data.username = user.username;
        sessionStorage.removeItem("authUser");
        sessionStorage.setItem("authUser", JSON.stringify(obj));
      }

    }
  }, [user]);

  const { usersDataList } = useSelector((state) => ({ usersDataList: state?.Users?.usersDataList }));

  const sessionstoragedata = JSON.parse(sessionStorage?.getItem("authUser"));
  const sessionUsername = sessionstoragedata?.username

  const currentUser = usersDataList?.find((user) => user?.username === sessionUsername);

  const isAdmin = currentUser && currentUser?.roles?.includes("ROLE_ADMIN");
  return (
    <>
      {isAdmin && (
        <Modal
          show={props.showModal}
          onHide={closeModal}
          dialogClassName="modal-90w"
          size="xl"
          fullscreen="true"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sonic Device Configuration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className="form-label fw-bold badge fs-4 bg-info">
              <span>{props.goldstonemodalProps?.name}</span>
            </label>{" "}
            <Modal.Body>
              <Formik
                onSubmit={handleSubmit}
              >
                {({ }) => (
                  <Form>
                    <Row className="d-flex justify-content-between">
                      <Col>
                        <div className="mb-3">
                          <label
                            htmlFor="adminStatus"
                            className="form-label fw-bold"
                          >
                            Admin Status:
                          </label>
                          <div className="form-check form-switch">
                            <Field
                              type="checkbox"
                              className="form-check-input"
                              id="adminStatus"
                              name="adminStatus"
                              checked={interfaceRequestBody?.adminStatus}
                              onChange={(e) => {
                                setInterfaceRequestBody({
                                  ...interfaceRequestBody,
                                  adminStatus: e.target.checked,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="mtu" className="form-label">
                            MTU:
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="mtu"
                            name="mtu"
                            placeholder="MTU"
                            value={interfaceRequestBody?.mtu}
                            onChange={(e) => {
                              handleFieldChange("mtu", e.target.value);
                            }}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="speed" className="form-label">
                            Speed:
                          </label>
                          <Field
                            as="select"
                            className="form-select"
                            id="speed"
                            name="speed"
                            value={interfaceRequestBody?.speed}
                            onChange={(e) => {
                              const selectedSpeed = e.target.value;
                              handleFieldChange("speed", selectedSpeed);
                            }}
                          >
                            {sonicspeedOptions?.map((option) => (
                              <option key={option?.value} value={option?.value}>
                                {option?.label?.replace("SPEED_", "")}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="fecMode" className="form-label">
                            FEC:
                          </label>
                          <Field
                            disabled
                            as="select"
                            className="form-select"
                            id="fec"
                            name="fec"
                            placeholder="FEC (in capital)"
                            onChange={(e) => {
                              setInterfaceRequestBody({
                                ...interfaceRequestBody,
                                fec: e.target.value,
                              });
                            }}
                          >
                            {FecMode.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </Col>
                      <Col>
                        <div className="">
                          <label htmlFor="ipAdress" className="form-label">
                            IPV4 Address:
                          </label>
                          <Field
                            disabled
                            type="text"
                            className="form-control"
                            id="ipAdress"
                            name="ipAddress"
                            placeholder="IP v4Address"
                            value={interfaceRequestBody?.ipv4Address}
                            onChange={(e) => {
                              setInterfaceRequestBody({
                                ...interfaceRequestBody,
                                ipv4Address: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="">
                          <label htmlFor="ipV6Address" className="form-label">
                            IPV6 Address:
                          </label>
                          <Field
                            disabled
                            type="text"
                            className="form-control"
                            id="ipV6Address"
                            name="ipV6Address"
                            placeholder="IPV6 Adress"
                            value={interfaceRequestBody?.ipV6Address}
                            onChange={(e) => {
                              setInterfaceRequestBody({
                                ...interfaceRequestBody,
                                ipV6Address: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <div className="col">
                        <label htmlFor="lagId" className="form-label">
                          LAG ID
                        </label>
                        <Field
                          as="input"
                          type="number"
                          className="form-control"
                          id="lagId"
                          name="lagId"
                          placeholder="Lag ID"
                          value={interfaceRequestBody?.lagValue}
                          onChange={(e) => {
                            const inputValue = parseInt(e.target.value);
                            if (inputValue >= 1 && inputValue <= 16) {
                              handleFieldChange("lagValue", e.target.value);
                            } else {
                              handleFieldChange("lagValue", ""); // Set lagValue to an empty string
                              e.target.value = "";
                            }
                          }}
                        />
                        <p className="text-muted">
                          Please enter a value between 1 and 16.
                        </p>
                      </div>

                      <div className="col">
                        <label htmlFor="description" className="form-label">
                          Description:
                        </label>
                        <Field
                          disabled
                          as="textarea"
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="Description"
                          value={interfaceRequestBody?.description}
                          style={{ height: "40px" }} // Set the desired height here
                          onChange={(e) => {
                            setInterfaceRequestBody({
                              ...interfaceRequestBody,
                              description: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </Row>
                    <Row>
                      <Col >
                        <div className="mb-3">
                          <label htmlFor="portbreakout" className="form-label">
                            Port breakout:
                          </label>
                          <Field
                            as="select"
                            className="form-select"
                            id="PortBreakout"
                            name="Port Breakout"
                            value={interfaceRequestBody?.breakoutMode}
                            onChange={(e) => {
                              const selectedBreakoutMode = e.target.value;
                              setInterfaceRequestBody(prevRequestBody => ({
                                ...prevRequestBody,
                                breakoutMode: selectedBreakoutMode,
                                mode: selectedBreakoutMode,
                              }));
                            }}
                            disabled={!interfaceRequestBody?.breakoutMode}
                          >
                            {portSpeedOptions?.map((option) => (
                              <option key={option?.value} value={option?.value}>
                                {option?.label?.replace("SPEED_", "")}
                              </option>
                            ))}
                          </Field>

                        </div>
                      </Col>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="sourceportlabel" className="form-label">
                            Source Port Label:
                          </label>
                          <Field
                            disabled
                            type="text"
                            className="form-control"
                            id="sourceportlabel"
                            name="sourceportlabel"
                            placeholder="Source Port Label"
                            value={interfaceRequestBody?.sourcePortLabel}
                            onChange={(e) => {
                              handleFieldChange("sourcePortLabel", e.target.value);
                            }}
                          />
                        </div>
                      </Col>
                    </Row>

                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" class="btn btn-light" onClick={closeModal}>
              Cancel
            </button>
            <button type="button" class="btn btn-success" onClick={handleSubmit}>
              Save
            </button>
          </Modal.Footer>
        </Modal >
      )
      }
    </>
  );
}

export default SonicInterfaceConfig;
