/**
@Description      : This file contain Sonic config form 
**/
import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
import axios from 'axios';

import { toast } from "react-toastify";
import { DOMAIN, PORT_8081, PROTOCOL } from "../../../helpers/url_helper";

function PortchannelConfig(props) {
    const deviceIpAddress = useParams().id;
    const [PortchannelBody, setPortChannelRequestBody] = useState({
        deviceId: deviceIpAddress,
        portId: "",
        admin_status: "",
        isUpdate: true
        // member_ports: "",
    });

    useEffect(() => {
        if (props.goldstonemodalProps) {
            setPortChannelRequestBody({
                admin_status: props.goldstonemodalProps?.adminStatus,
                portId: props.goldstonemodalProps?.name,
                member_ports: props.goldstonemodalProps?.memberPorts?.join('\n'),
                speed: props.goldstonemodalProps?.speed
            });

        }
    }, [props.goldstonemodalProps]);

    const closeModal = () => props.setShowModal(false);

    const handleMemberPortsChange = (e) => {
        const newMemberPortsValue = e.target.value;
        const memberPortsArray = newMemberPortsValue.split('\n').filter(port => port.trim() !== ''); // Convert to array and filter empty values
        setPortChannelRequestBody({
            ...PortchannelBody,
            member_ports: memberPortsArray,
        });
    };

    const handleSubmit = async (e) => {

        const requestBody = {
            deviceId: deviceIpAddress,
            portId: props?.goldstonemodalProps?.name,
            admin_status: PortchannelBody?.admin_status,
            isUpdate: true
        };
        try {
            const response = await axios.post(`${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/port-channel`, requestBody);

            // Handle the response if needed
            console.log('Response:', response);

            // Check response status code and display toast accordingly
            if (response.statusCode === 200) {
                toast.success('Port Channel Updated Successfully!');
                closeModal();
            } else {
                toast.error(' error occurres an Updating Port Channel');
            }
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            toast.error('An error occurred'
            );
        }
    };

    const handleDelete = async () => {
        const requestBody = {
            deviceId: deviceIpAddress,
            portId: props?.goldstonemodalProps?.name
        };

        try {
            const response = await axios.delete(
                `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/port-channel`,
                {
                    data: requestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response?.statusCode === 200) {
                await toast.success('Port channel deleted successfully');

            } else {
                toast.error('Error in deleting this port channel');
            }
        } catch (error) {
            toast.error('An error occurred while deleting the port channel');
        }
        closeModal();
    };

    const { user, success, error } = useSelector(state => ({
        user: state.Profile.user,
    }));
    const PortChannelData = props?.goldstonemodalProps

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
                        <Modal.Title>PortChannel Configuration</Modal.Title>
                        {/* Add the delete icon here */}
                        <button
                            className="btn btn-danger ms-2"
                            style={{ fontSize: '15px', cursor: 'pointer' }}
                            onClick={handleDelete}
                        >
                            Delete
                        </button>

                        {/* <i
                            className="ri-delete-bin-6-fill"
                            style={{
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: 'red', // Add your desired color here
                            }}
                            onClick={handleDelete} // Don't forget to define this function
                        /> */}
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label fw-bold badge fs-4 bg-info">
                            <span>{PortChannelData?.name}</span>
                        </label>{" "}
                        <Modal.Body>
                            <Formik
                            // initialValues={interfaceRequestBody}
                            //  onSubmit={handleSubmit}
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
                                                            name="admin_status"
                                                            checked={PortchannelBody.admin_status === 'up'}
                                                            // onChange={handleAdminStatusChange}
                                                            onChange={(e) => {
                                                                const newAdminStatus = e.target.checked ? 'up' : 'down';
                                                                setPortChannelRequestBody({
                                                                    ...PortchannelBody,
                                                                    admin_status: newAdminStatus,
                                                                });
                                                            }}
                                                        />
                                                    </div>


                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="mb-3">
                                                    <label htmlFor="bandwidth" className="form-label">
                                                        Bandwidth:
                                                    </label>
                                                    <Field
                                                        disabled
                                                        type="number"
                                                        className="form-control"
                                                        id="bandwidth"
                                                        name="bandwidth"
                                                        placeholder="Bandwidth"
                                                        value={PortchannelBody?.speed}

                                                    />
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <div className="col">
                                                <label htmlFor="description" className="form-label">
                                                    Member Ports:
                                                </label>
                                                <Field
                                                    disabled
                                                    as="textarea"
                                                    className="form-control"
                                                    id="memberPorts"
                                                    name="memberPorts"
                                                    placeholder="Member Ports"
                                                    value={PortchannelBody?.member_ports}
                                                    onChange={handleMemberPortsChange}
                                                />
                                            </div>
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

export default PortchannelConfig;
