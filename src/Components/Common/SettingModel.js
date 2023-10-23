import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    FormGroup,
    Label,
    Input,
    UncontrolledTooltip,
    Accordion,
    AccordionItem,
    Tooltip,
} from "reactstrap";


import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { AiTwotoneStar } from "react-icons/ai";
import { VscDebugConsole } from "react-icons/vsc";
import {
    RiDeleteBin5Fill,
    RiRestartFill,
    RiRestartLine,
    RiInformationLine,
    RiInformationFill,
} from "react-icons/ri";
import { IoSave } from "react-icons/io";
import * as Yup from "yup";
import { useFormik } from "formik";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SimpleBar from "simplebar-react";
import { Link, useParams } from "react-router-dom";
import List from "list.js";
import { isEmpty } from "lodash";
//redux
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
    deleteDevicesData,
    getDevicesData,
    setDevicePollingInterval,
    setDeviceProcessInterval,
    setDevicePolling,
    getDevicePolling,
    registerDeviceaction,
    syslogDeviceaction,
} from "../../store/DevicesList/action";
import { InputGroup, Form } from "react-bootstrap";

const SettingModel = () => {
    const dispatch = useDispatch();
    const [modal_list, setmodal_list] = useState(false);
    const [pollingInterval, setPollingInterval] = useState(false);
    const [pollingIntervalVal, setPollingIntervalVal] = useState(0);
    const [processInterval, setProcessInterval] = useState(true);
    const [processIntervalVal, setProcessIntervalVal] = useState(0);
    const [showBtn, setShowBtn] = useState(true);
    const [deviceType, setDeviceType] = useState("S");
    const [deviceList, setDeviceList] = useState([]);
    const [deviceListSearch, setDeviceListSearch] = useState([]);
    const [deviceSettingModal, setDeviceSettingModal] = useState(false);
    const [pollingData, setPollingData] = useState([]);
    const [syslogMgmtIP, setSyslogMgmtIP] = useState("");
    const history = useNavigate();
    const tog_list = () => {
        setmodal_list(!modal_list);
    };



    useEffect(() => {

        dispatch(getDevicePolling());
    }, []);




    const pollingValue = useSelector(
        (state) => state.DevicesListData.devicePolling
    );

    useEffect(() => {
        let key = "statusCode";
        if (
            Object.prototype.hasOwnProperty.call(pollingValue, key) &&
            pollingValue.statusCode === 200
        ) {
            dispatch(getDevicePolling());
            setPollingData(pollingValue[0]);
        } else {
            setPollingData(pollingValue[0]);
        }
    }, [pollingValue]);






    const updatePollingInterval = (e) => {
        dispatch(setDevicePollingInterval(pollingData?.devicePollingInterval));
        let pollingResData = {
            devicePollingId: pollingData?.id,
            devicePollingInterval: pollingData?.devicePollingInterval,
            devicePollingProcessInterval: pollingData?.deviceProcessPollingInterval,
            syslogId: pollingData?.syslogId,
        };
        dispatch(setDevicePolling(pollingResData));
        setDeviceSettingModal(false);
    };

    const updateProcessInterval = (e) => {
        dispatch(
            setDeviceProcessInterval(pollingData?.deviceProcessPollingInterval)
        );
        let procesResData = {
            devicePollingId: pollingData?.id,
            devicePollingInterval: pollingData?.devicePollingInterval,
            devicePollingProcessInterval: pollingData?.deviceProcessPollingInterval,
            syslogId: pollingData?.syslogId,
        };
        dispatch(setDevicePolling(procesResData));
        setDeviceSettingModal(false);
    };

    const handleDeviceSettingModal = () => {
        setDeviceSettingModal(true);
    };

    const handleSyslogChange = (event) => {
        setSyslogMgmtIP(event.target.value);
    };

    const SyslogMgmtIP = () => {
        dispatch(syslogDeviceaction(syslogMgmtIP));
    };



    return (
        <React.Fragment>
            <>

                <div
                    className="col-auto"
                    onClick={() => handleDeviceSettingModal()}
                >
                    <i
                        class="ri-settings-3-line fs-3  rounded p-2"
                        id="deviceSetting"
                    ></i>
                    <UncontrolledTooltip
                        placement="bottom"
                        target="deviceSetting"
                    >
                        Device Setting
                    </UncontrolledTooltip>
                </div>

            </>

            {/* Device Setting Modal */}
            <Modal
                isOpen={deviceSettingModal}
                toggle={() => setDeviceSettingModal(!deviceSettingModal)}
            >
                <ModalHeader toggle={() => setDeviceSettingModal(!deviceSettingModal)}>
                    <label>Device Setting</label>
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex flex-column justify-content-around align-items-start mt-2">

                        <>
                            <Form.Label htmlFor="pollingInterval" className="fs-5">
                                Fast Poll{" "}
                                <p className="fs-6 mb-2 text-muted">
                                    Traffic and topology information
                                </p>
                            </Form.Label>
                            <InputGroup className="mb-4">
                                <Form.Control
                                    id="pollingInterval"
                                    placeholder=""
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={pollingData?.devicePollingInterval}
                                    onChange={(event) =>
                                        setPollingData({
                                            ...pollingData,
                                            devicePollingInterval: event.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    id="updatePollingInterval"
                                    class="btn btn-secondary bg-light"
                                    onClick={() => updatePollingInterval()}
                                >
                                    <span>
                                        <i class="ri-save-2-line fs-4 text-dark"></i>
                                    </span>
                                </button>
                                <UncontrolledTooltip
                                    placement="bottom"
                                    target="updatePollingInterval"
                                >
                                    Save
                                </UncontrolledTooltip>
                            </InputGroup>
                        </>

                        <>
                            <Form.Label htmlFor="processInterval" className="fs-5">
                                System Poll Interval
                                <p className="fs-6 mb-2 text-muted">
                                    Polling Interval for CPU, Memory, Transponder Info
                                </p>
                            </Form.Label>
                            {/* <Form.Text className="text-muted fs-6">
                Polling Interval for CPU, Memory, Transponder Info
              </Form.Text> */}
                            <InputGroup className="mb-4">
                                <Form.Control
                                    id="processInterval"
                                    placeholder=""
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={pollingData?.deviceProcessPollingInterval}
                                    onChange={(event) =>
                                        setPollingData({
                                            ...pollingData,
                                            deviceProcessPollingInterval: event.target.value,
                                        })
                                    }
                                />
                                <Button
                                    variant="outline-secondary"
                                    id="updateProcessInterval"
                                    className="bg-light"
                                    onClick={() => updateProcessInterval()}
                                >
                                    <span>
                                        <i class="ri-save-2-line fs-4 text-dark"></i>
                                    </span>
                                </Button>
                                <UncontrolledTooltip
                                    placement="bottom"
                                    target="updateProcessInterval"
                                >
                                    Save
                                </UncontrolledTooltip>
                            </InputGroup>
                        </>
                        <>
                            <Form.Label htmlFor="syslogserverip" className="fs-5">
                                NMS MGMT IP{" "}
                                <p className="fs-6 mb-2 text-muted">
                                    NMS MGMT IP to receive logs from device.
                                </p>
                            </Form.Label>
                            {/* <Form.Text className="text-muted fs-6">
                Polling Interval for CPU, Memory, Transponder Info
              </Form.Text> */}
                            <InputGroup className="mb-4">
                                <Form.Control
                                    id="processInterval"
                                    placeholder=""
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={pollingData?.syslogId}
                                    onChange={(event) =>
                                        setPollingData({
                                            ...pollingData,
                                            syslogId: event.target.value,
                                        })
                                    }
                                />
                                <Button
                                    variant="outline-secondary"
                                    id="updateProcessInterval"
                                    className="bg-light"
                                    onClick={() => updateProcessInterval()}
                                >
                                    <span>
                                        <i class="ri-save-2-line fs-4 text-dark"></i>
                                    </span>
                                </Button>
                                <UncontrolledTooltip
                                    placement="bottom"
                                    target="updateProcessInterval"
                                >
                                    Save
                                </UncontrolledTooltip>
                            </InputGroup>
                        </>
                        {/* )} */}
                    </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

        </React.Fragment >
    );
};
export default SettingModel;
