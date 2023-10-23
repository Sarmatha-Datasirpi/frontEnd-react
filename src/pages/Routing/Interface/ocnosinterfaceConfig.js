/**
@Description      : This file contain Ocnos config form 
**/
import { speedOptions, FecMode } from "./interfaceCommonConfigData";
import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from 'formik';
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { ENVIRONMENT_URL } from "../../../helpers/url_helper";


function Ocnosinterfaceconfig(props) {

    const deviceIpAddress = useParams().id;
    const [requestBody, setRequestBody] = useState({
        deviceId: deviceIpAddress,
        name: props?.ocnosInterfaceData?.name,
        "isInterface": true,
        // ipV6Address: {
        //     primary: [''],
        //     secondary: [''],
        // },
        // ipAddress: {
        //     primary: [''],
        //     secondary: ['']
        // },
    });
    console.log("Request body", requestBody)

    const handleSubmit = (event) => {
console.log("event")

        const apiUrl = `${ENVIRONMENT_URL}/device/interfaces/update`;

        // Make the API call using Axios
        axios.post(apiUrl, requestBody)
            .then(response => {
                // Handle the success response
                console.log('Response:', response);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

        closeModal();
    };

    const closeModal = () => props.setShowModal(false);

    const handlePrimaryIPV6Change = (event, index) => {
        event.preventDefault();
        const updatedPrimaryIPV6 = [...requestBody.ipV6Address.primary];
        updatedPrimaryIPV6[index] = event.target.value;

        setRequestBody(prevState => ({
            ...prevState,
            ipV6Address: {
                ...prevState.ipV6Address,
                primary: updatedPrimaryIPV6
            }
        }));
    };

    const handlePrimaryIPChange = (event, index) => {
        event.preventDefault();
        const updatedPrimaryIP = [...requestBody.ipAddress.primary];
        updatedPrimaryIP[index] = event.target.value;

        setRequestBody(prevState => ({
            ...prevState,
            ipAddress: {
                ...prevState.ipAddress,
                primary: updatedPrimaryIP
            }
        }));
    };


    const handleSecondaryIPV6Change = (event, index) => {
        event.preventDefault();
        const updatedSecondaryIPV6 = [...requestBody.ipV6Address.secondary];
        updatedSecondaryIPV6[index] = event.target.value;

        setRequestBody(prevState => ({
            ...prevState,
            ipV6Address: {
                ...prevState.ipV6Address,
                secondary: updatedSecondaryIPV6
            }
        }));
    };

    const handleSecondaryIPChange = (event, index) => {
        event.preventDefault();
        const updatedSecondaryIP = [...requestBody.ipAddress.secondary];
        updatedSecondaryIP[index] = event.target.value;

        setRequestBody(prevState => ({
            ...prevState,
            ipAddress: {
                ...prevState.ipAddress,
                secondary: updatedSecondaryIP
            }
        }));
    };



    const handleAddSecondaryIPV6 = (event) => {
        event.preventDefault();
        setRequestBody(prevState => ({
            ...prevState,
            ipV6Address: {
                ...prevState.ipV6Address,
                secondary: [...prevState.ipV6Address.secondary, ""]
            }
        }));
    };

    const handleAddSecondaryIP = (event) => {
        event.preventDefault();
        setRequestBody(prevState => ({
            ...prevState,
            ipAddress: {
                ...prevState.ipAddress,
                secondary: [...prevState.ipAddress.secondary, ""]
            }
        }));
    };



    const handleRemoveSecondaryIPV6 = (event, index) => {
        event.preventDefault();
        const updatedSecondaryIPV6 = [...requestBody.ipV6Address.secondary];
        updatedSecondaryIPV6.splice(index, 1);

        setRequestBody(prevState => ({
            ...prevState,
            ipV6Address: {
                ...prevState.ipV6Address,
                secondary: updatedSecondaryIPV6
            }
        }));
    };

    const handleRemoveSecondaryIP = (event, index) => {
        event.preventDefault();
        const updatedSecondaryIP = [...requestBody.ipAddress.secondary];
        updatedSecondaryIP.splice(index, 1);

        setRequestBody(prevState => ({
            ...prevState,
            ipAddress: {
                ...prevState.ipAddress,
                secondary: updatedSecondaryIP
            }
        }));
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

    const { usersDataList } = useSelector((state) => ({
        usersDataList: state.Users.usersDataList,
    }));
    const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
    const sessionUserId = sessionstoragedata.id
    const sessionUsername = sessionstoragedata.username

    const currentUser = usersDataList.find((user) => user.username === sessionUsername);

    const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");

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
                        <Modal.Title>Ocnos Device Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Modal.Body>
                            <Formik initialValues={requestBody} onSubmit={handleSubmit}>
                                {({ }) => (
                                    <Form>
                                        <Row className="d-flex justify-content-between">
                                            <Col>
                                                <div className="mb-3">
                                                    <label htmlFor="adminStatus" className="form-label fw-bold">Admin Status:</label>
                                                    <div className="form-check form-switch">
                                                        <Field
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="adminStatus"
                                                            name="adminStatus"
                                                            checked={requestBody.adminStatus}
                                                            onChange={(e) => {
                                                                setRequestBody({
                                                                    ...requestBody,
                                                                    adminStatus: e.target.checked
                                                                });
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col>

                                                <div className="mb-3">
                                                    <label htmlFor="mtu" className="form-label">MTU:</label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="mtu"
                                                        name="mtu"
                                                        placeholder="MTU"
                                                        value={requestBody.mtu}
                                                        onChange={(e) => {
                                                            setRequestBody({
                                                                ...requestBody,
                                                                mtu: e.target.value
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col>

                                                <div className="mb-3">
                                                    <label htmlFor="speed" className="form-label">Speed:</label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        id="speed"
                                                        name="speed"
                                                        onChange={(e) => {
                                                            const selectedSpeed = e.target.value;
                                                            setRequestBody((prevState) => ({
                                                                ...prevState,
                                                                speed: selectedSpeed,
                                                            }));
                                                        }}
                                                    >
                                                        {speedOptions.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}


                                                    </Field>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="mb-3">
                                                    <label htmlFor="fecMode" className="form-label">FEC:</label>
                                                    <Field
                                                        as="select"
                                                        className="form-select"
                                                        id="fec"
                                                        name="fec"
                                                        placeholder="FEC (in capital)"

                                                        onChange={(e) => {
                                                            setRequestBody({
                                                                ...requestBody,
                                                                fec: e.target.value
                                                            });
                                                        }}>
                                                        {FecMode.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>

                                            </Col>
                                            <Col>

                                                <Row>
                                                    <Col>
                                                        <div className="mb-3 mt-1" >
                                                            <label htmlFor="ospf" className="form-label fw-bold">OSPF:</label>
                                                            <div className="form-check form-switch">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ospf"
                                                                    name="ospf"
                                                                    checked={requestBody.ospf}
                                                                    onChange={(e) => {
                                                                        setRequestBody({
                                                                            ...requestBody,
                                                                            ospf: e.target.checked
                                                                        });
                                                                    }}

                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="mb-3 mt-1">
                                                            <label htmlFor="isis" className="form-label fw-bold">ISIS:</label>
                                                            <div className="form-check form-switch">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="isis"
                                                                    name="isis"
                                                                    checked={requestBody.isis}
                                                                    onChange={(e) => {
                                                                        setRequestBody({
                                                                            ...requestBody,
                                                                            isis: e.target.checked
                                                                        });
                                                                    }}

                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="mb-3 mt-1">
                                                            <label htmlFor="ldp" className="form-label fw-bold">LDP:</label>
                                                            <div className="form-check form-switch">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="ldp"
                                                                    name="isLdp"
                                                                    checked={requestBody.isLdp}
                                                                    onChange={(e) => {
                                                                        setRequestBody({
                                                                            ...requestBody,
                                                                            isLdp: e.target.checked
                                                                        });
                                                                    }}

                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col>

                                                <div className="" >
                                                    <label htmlFor="description" className="form-label">Description:</label>
                                                    <Field
                                                        as="textarea"
                                                        className="form-control custom-textarea"
                                                        id="description"
                                                        name="description"
                                                        placeholder="Description"
                                                        value={requestBody.description}
                                                        onChange={(e) => {
                                                            setRequestBody({
                                                                ...requestBody,
                                                                description: e.target.value
                                                            });
                                                        }}
                                                    />

                                                </div >

                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <div className="row">
                                                <div className="col-4">
                                                    <h6>Primary IP Addresses</h6>
                                                    {requestBody.ipAddress.primary.map((address, index) => (
                                                        <div key={index} className="row">
                                                            <div className="col-12">
                                                                <input
                                                                    type="text"
                                                                    className="form-control flex-grow-1"
                                                                    placeholder="Enter IP Primary Address"
                                                                    value={address}
                                                                    onChange={(event) => handlePrimaryIPChange(event, index)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="col-4">
                                                    <h6>Primary IPv6 Addresses</h6>
                                                    {requestBody.ipV6Address.primary.map((address, index) => (
                                                        <div key={index} className="row">
                                                            <div className="col-12">
                                                                <input
                                                                    type="text"
                                                                    className="form-control flex-grow-1"
                                                                    placeholder="Enter IPv6 Primary Address"
                                                                    value={address}
                                                                    onChange={(event) => handlePrimaryIPV6Change(event, index)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 mt-3">
                                                    <h6>Secondary IP Addresses <span style={{ marginLeft: "29%" }} className="btn btn-light btn-sm " onClick={(event) => handleAddSecondaryIP(event)}>
                                                        <i className="ri-add-fill" style={{ fontSize: '24px' }}></i></span> </h6>
                                                    {requestBody.ipAddress.secondary.map((address, index) => (
                                                        <div key={index} className="row">
                                                            <div className="col-9 mt-2">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter IP Secondary Address"
                                                                    value={address}
                                                                    onChange={(event) => handleSecondaryIPChange(event, index)}
                                                                />
                                                            </div>
                                                            <div className="col-3 mt-3">
                                                                <button className="btn btn-danger btn-sm ml-2" onClick={(event) => handleRemoveSecondaryIP(event, index)}>
                                                                    <i className="ri-delete-bin-2-line" ></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="col-4 mt-3">
                                                    <h6>Secondary IPv6 Addresses <button style={{ marginLeft: "24%" }} className="btn btn-light btn-sm ml-2" onClick={(event) => handleAddSecondaryIPV6(event)}>
                                                        <i className="ri-add-fill" style={{ fontSize: '24px' }}></i></button> </h6>
                                                    {requestBody.ipV6Address.secondary.map((address, index) => (
                                                        <div key={index} className="row">
                                                            <div className="col-9 mt-2">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter IPv6 Secondary Address"
                                                                    value={address}
                                                                    onChange={(event) => handleSecondaryIPV6Change(event, index)}
                                                                />
                                                            </div>
                                                            <div className="col-3 mt-2"><button className="btn btn-danger btn-sm ml-2" onClick={(event) => handleRemoveSecondaryIPV6(event, index)}>
                                                                <i className="ri-delete-bin-2-line" ></i>
                                                            </button></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </Row> */}
                                    </Form>
                                )}
                            </Formik>
                        </Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-light" onClick={closeModal}>Cancel</button>
                        <button type="button" class="btn btn-success" onClick={handleSubmit}>Save</button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );

}

export default Ocnosinterfaceconfig;