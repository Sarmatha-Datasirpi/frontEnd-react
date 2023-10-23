/**
@Description      : This file contain Goldstone config form 
**/

import { updateInterfaceConfigData } from "../../../store/Interfaces/action";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import {
    speedOptions,
    interfaceTypeOptions,
    portSpeedOptions,
    FecMode,
    NeftyLoopBackType,
    ModulationFormat,
    PrbsType,
    FecType,
    HostSignalRate,
} from "./interfaceCommonConfigData";
import {
    getInterfaceData,
} from "../../../store/Interfaces/action";
import { isEmpty } from "lodash";

function GoldstoneinterfaceCofig(props) {

    const dispatch = useDispatch();
    const interfaceConfigDataSet = useSelector(
        (state) => state.Interface_reducer?.interfaceData
    );

    const interfaceUpdateError = useSelector(
        (state) => state?.Interface_reducer?.error
    );

    const [interfacerequestBody, setInterfaceRequestBody] = useState({
        deviceId: "",
        name: " ",
        adminStatus: false,
        mtu: "",
        fec: "",
        interfaceType: "",
        speed: false,
        numchannel: "",
        channelspeed: "",
        isInterface: true,
        autoNegotiate: false,
    });


    const [piurequestBody, setPiuRequestBody] = useState({
        deviceId: "",
        name: " ",
        adminStatus: false,
        berPeriod: "",
        ch1Frequency: "",
        netifyLoopbackType: "",
        modulationFormat: "",
        outputPower: "",
        prbsType: "",
        pulseShaping: false,
        txDisable: false,
        txLaserFrequency: "",
        isInterface: false,

        hostIfRequestList: [
            {
                signalRate: "",
                fecType: "",
                loopBack: "",
            },
            {
                signalRate: "",
                fecType: "",
                loopBack: "",
            },
        ],
    });

    useEffect(() => {
        if (props?.goldstonemodalProps) {
            setInterfaceRequestBody((prevState) => ({
                ...prevState,
                deviceId: props?.deviceID || "",
                name: props?.goldstonemodalProps?.name || "",
                adminStatus: props?.goldstonemodalProps?.adminStatus || false,
                mtu: props?.goldstonemodalProps?.mtu || "",
                fec: props?.goldstonemodalProps?.fec || "",
                interfaceType: props?.goldstonemodalProps?.interfaceType || "",
                speed: props?.goldstonemodalProps?.speed || "",
                alias: props?.goldstonemodalProps?.alias || "",
                autoNegotiate: props?.goldstonemodalProps?.autoNegotiate || false,
            }));


            setPiuRequestBody((prevState) => ({
                ...prevState,
                deviceId: props?.deviceID || "",
                name: props?.goldstonemodalProps?.name || "",
                adminStatus: props?.goldstonemodalProps?.adminStatus || false,
                berPeriod: props?.goldstonemodalProps?.berPeriod || "",
                ch1Frequency: props?.goldstonemodalProps?.ch1Frequency || "",
                netifyLoopbackType:
                    props?.goldstonemodalProps?.netifyLoopbackType || "",
                modulationFormat: props?.goldstonemodalProps?.modulationFormat || "",
                outputPower: props?.goldstonemodalProps?.outputPower || "",
                prbsType: props?.goldstonemodalProps?.prbsType || "",
                txLaserFrequency: props?.goldstonemodalProps?.txLaserFrequency || "",
                pulseShaping: props?.goldstonemodalProps?.pulseShaping || false,
                txDisable: props?.goldstonemodalProps?.txDisable || false,
                hostIfRequestList: [
                    {
                        signalRate:
                            props.goldstonemodalProps?.hostIf?.[0]?.state?.["signal-rate"] ||
                            "",
                        fecType:
                            props.goldstonemodalProps?.hostIf?.[0]?.state?.["fec-type"] || "",
                        loopBack:
                            props.goldstonemodalProps?.hostIf?.[0]?.state?.[
                            "loopback-type"
                            ] || "",
                    },
                    {
                        signalRate:
                            props.goldstonemodalProps?.hostIf?.[1]?.state?.["signal-rate"] ||
                            "",
                        fecType:
                            props.goldstonemodalProps?.hostIf?.[1]?.state?.["fec-type"] || "",
                        loopBack:
                            props.goldstonemodalProps?.hostIf?.[1]?.state?.[
                            "loopback-type"
                            ] || "",
                    },
                ],
            }));
        }
    }, [props.goldstonemodalProps]);

    const handleSubmit = (event) => {
        if (props?.goldstonemodalProps?.name.startsWith("piu")) {
            dispatch(updateInterfaceConfigData(piurequestBody));
        } else {
            dispatch(updateInterfaceConfigData(interfacerequestBody));
        }
        setTimeout(() => {
            dispatch(getInterfaceData(props?.deviceID));
        }, 3000);
        closeModal();
    };

    const closeModal = () => props.setShowModal(false);
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
                        <Modal.Title>GoldStone Device Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Modal.Body>
                            <Formik onSubmit={handleSubmit}>
                                {({ }) => (
                                    <Form>
                                        <label className="form-label fw-bold badge fs-4 bg-info">
                                            <span>{props.goldstonemodalProps.name}</span>
                                        </label>{" "}
                                        {props?.goldstonemodalProps?.name.startsWith("piu") ? (
                                            <>
                                                <div className="mb-3">
                                                    <Row>
                                                        <div className="col-5">
                                                            <Row>
                                                                <div className="col-4">
                                                                    <label
                                                                        htmlFor="adminStatus"
                                                                        className="form-label fw-bold"
                                                                    >
                                                                        Admin Status:
                                                                    </label>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div className="form-check form-switch">
                                                                        <Field
                                                                            type="checkbox"
                                                                            className="form-check-input"
                                                                            id="adminStatus"
                                                                            name="adminStatus"
                                                                            checked={piurequestBody.adminStatus}
                                                                            onChange={(e) => {
                                                                                setPiuRequestBody({
                                                                                    ...piurequestBody,
                                                                                    adminStatus: e.target.checked,
                                                                                });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </div>
                                                        <div className="col-7 "></div>
                                                    </Row>
                                                </div>
                                                <hr />
                                                <label className="form-label fw-bold">
                                                    <h4>Netif </h4>
                                                </label>
                                                <Row className="d-flex justify-content-between">
                                                    <Row className="d-flex align-items-center justify-content-between">
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label htmlFor="berperiod" className="form-label">
                                                                    Ber period:
                                                                </label>

                                                                <Field
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Ber period"
                                                                    name="berPeriod"
                                                                    value={piurequestBody.berPeriod}
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody({
                                                                            ...piurequestBody,
                                                                            berPeriod: e.target.value,
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="ch1Frequency"
                                                                    className="form-label"
                                                                >
                                                                    Ch1 Frequency:
                                                                </label>
                                                                <Field
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Chl Frequency"
                                                                    name="ch1Frequency"
                                                                    value={piurequestBody?.ch1Frequency}
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody({
                                                                            ...piurequestBody,
                                                                            ch1Frequency: e.target.value,
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="netifyloopbacktype"
                                                                    className="form-label"
                                                                >
                                                                    Netify Loopback Type:
                                                                </label>
                                                                <Field
                                                                    name="netifyLoopbackType"
                                                                    as="select"
                                                                    className="form-select"
                                                                    id="netifyloopbacktype"
                                                                    value={piurequestBody.netifyLoopbackType}
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody({
                                                                            ...piurequestBody,
                                                                            netifyLoopbackType: e.target.value,
                                                                        });
                                                                    }}
                                                                >
                                                                    {NeftyLoopBackType.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row className="d-flex align-items-center justify-content-between">
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="modulationformat"
                                                                    className="form-label"
                                                                >
                                                                    Moudulation Format:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    id="modulationformat"
                                                                    name="modulationFormat"
                                                                    value={piurequestBody.modulationFormat}
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody({
                                                                            ...piurequestBody,
                                                                            modulationFormat: e.target.value,
                                                                        });
                                                                    }}
                                                                >
                                                                    {ModulationFormat.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="outputpower"
                                                                    className="form-label"
                                                                >
                                                                    Output Power:
                                                                </label>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Output Power"
                                                                    className="form-control"
                                                                    name="outputPower"
                                                                    value={piurequestBody.outputPower}
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody({
                                                                            ...piurequestBody,
                                                                            outputPower: e.target.value,
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label htmlFor="prbstype" className="form-label">
                                                                    PRBS Type:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    id="prbsType"
                                                                    name="prbsType"
                                                                    value={piurequestBody.prbsType}
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody({
                                                                            ...piurequestBody,
                                                                            prbsType: e.target.value,
                                                                        });
                                                                    }}
                                                                >
                                                                    {PrbsType.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
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
                                                                <label
                                                                    htmlFor="pulseShaping"
                                                                    className="form-label"
                                                                >
                                                                    Pulse Shaping:
                                                                </label>
                                                                <div className="form-check form-switch">
                                                                    <Field
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id="pulseShaping"
                                                                        name="pulseShaping"
                                                                        checked={piurequestBody.pulseShaping}
                                                                        onChange={(e) => {
                                                                            setPiuRequestBody({
                                                                                ...piurequestBody,
                                                                                pulseShaping: e.target.checked,
                                                                            });
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label htmlFor="txDisable" className="form-label">
                                                                    TX Disable:
                                                                </label>
                                                                <div className="form-check form-switch">
                                                                    <Field
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id="txDisable"
                                                                        name="txDisable"
                                                                        checked={piurequestBody.txDisable}
                                                                        onChange={(e) => {
                                                                            setPiuRequestBody({
                                                                                ...piurequestBody,
                                                                                txDisable: e.target.checked,
                                                                            });
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="txlaserfrequency"
                                                                    className="form-label"
                                                                >
                                                                    Tx Laser Frequency:
                                                                </label>
                                                                <Field
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Tx Laser Frequency"
                                                                    name="txLaserFrequency"
                                                                    value={piurequestBody.txLaserFrequency}
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody({
                                                                            ...piurequestBody,
                                                                            txLaserFrequency: e.target.value,
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Row>
                                                <hr />
                                                <label className="form-label fw-bold">
                                                    <h4>Hostif 0</h4>
                                                </label>
                                                <Row className="d-flex justify-content-between">
                                                    <Row className="d-flex align-items-center justify-content-between">
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="signal-rate"
                                                                    className="form-label"
                                                                >
                                                                    Signal Rate:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    id="signal-rate"
                                                                    name="signalRate"
                                                                    value={
                                                                        piurequestBody.hostIfRequestList[0]
                                                                            ?.signalRate
                                                                    }
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody((prevState) => ({
                                                                            ...prevState,
                                                                            hostIfRequestList: [
                                                                                {
                                                                                    ...prevState.hostIfRequestList[0],
                                                                                    signalRate: e.target.value,
                                                                                },
                                                                                ...prevState.hostIfRequestList.slice(1),
                                                                            ],
                                                                        }));
                                                                    }}
                                                                >
                                                                    {HostSignalRate.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label htmlFor="fec-type" className="form-label">
                                                                    FEC Type:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    name="fecType"
                                                                    value={
                                                                        piurequestBody.hostIfRequestList[0]?.fecType
                                                                    }
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody((prevState) => ({
                                                                            ...prevState,
                                                                            hostIfRequestList: [
                                                                                {
                                                                                    ...prevState.hostIfRequestList[0],
                                                                                    fecType: e.target.value,
                                                                                },
                                                                                ...prevState.hostIfRequestList.slice(1),
                                                                            ],
                                                                        }));
                                                                    }}
                                                                >
                                                                    {FecType.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="loopback-type"
                                                                    className="form-label"
                                                                >
                                                                    Loopback:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    name="loopBack"
                                                                    value={
                                                                        piurequestBody.hostIfRequestList[0]?.loopBack
                                                                    }
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody((prevState) => ({
                                                                            ...prevState,
                                                                            hostIfRequestList: [
                                                                                {
                                                                                    ...prevState.hostIfRequestList[0],
                                                                                    loopBack: e.target.value,
                                                                                },
                                                                                ...prevState.hostIfRequestList.slice(1),
                                                                            ],
                                                                        }));
                                                                    }}
                                                                >
                                                                    {NeftyLoopBackType.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Row>
                                                <label className="form-label fw-bold">
                                                    <h4>Hostif 1</h4>
                                                </label>
                                                <Row className="d-flex justify-content-between">
                                                    <Row className="d-flex align-items-center justify-content-between">
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="signalratio"
                                                                    className="form-label"
                                                                >
                                                                    Signal Rate:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    id="signalRate"
                                                                    name="signalRate"
                                                                    value={
                                                                        piurequestBody.hostIfRequestList[1].signalRate
                                                                    }
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody((prevState) => ({
                                                                            ...prevState,
                                                                            hostIfRequestList: [
                                                                                prevState.hostIfRequestList[0],
                                                                                {
                                                                                    ...prevState.hostIfRequestList[1],
                                                                                    signalRate: e.target.value,
                                                                                },
                                                                                ...prevState.hostIfRequestList.slice(2),
                                                                            ],
                                                                        }));
                                                                    }}
                                                                >
                                                                    {HostSignalRate.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label htmlFor="fec-type" className="form-label">
                                                                    FEC Type:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    name="fecType"
                                                                    value={
                                                                        piurequestBody.hostIfRequestList[1]?.fecType
                                                                    }
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody((prevState) => ({
                                                                            ...prevState,
                                                                            hostIfRequestList: [
                                                                                prevState.hostIfRequestList[0],
                                                                                {
                                                                                    ...prevState.hostIfRequestList[1],
                                                                                    fecType: e.target.value,
                                                                                },
                                                                                ...prevState.hostIfRequestList.slice(2),
                                                                            ],
                                                                        }));
                                                                    }}
                                                                >
                                                                    {FecType.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="loopback-type"
                                                                    className="form-label"
                                                                >
                                                                    Loopback:
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    className="form-select"
                                                                    name="loopBack"
                                                                    value={
                                                                        piurequestBody.hostIfRequestList[1]?.loopBack
                                                                    }
                                                                    onChange={(e) => {
                                                                        setPiuRequestBody((prevState) => ({
                                                                            ...prevState,
                                                                            hostIfRequestList: [
                                                                                prevState.hostIfRequestList[0],
                                                                                {
                                                                                    ...prevState.hostIfRequestList[1],
                                                                                    loopBack: e.target.value,
                                                                                },
                                                                                ...prevState.hostIfRequestList.slice(2),
                                                                            ],
                                                                        }));
                                                                    }}
                                                                >
                                                                    {NeftyLoopBackType.map((option) => (
                                                                        <option
                                                                            key={option.value}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Row>
                                            </>
                                        ) : (
                                            <>
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
                                                                    checked={interfacerequestBody.adminStatus}
                                                                    onChange={(e) => {
                                                                        setInterfaceRequestBody({
                                                                            ...interfacerequestBody,
                                                                            adminStatus: e.target.checked,
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
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
                                                                value={interfacerequestBody.mtu}
                                                                onChange={(e) => {
                                                                    setInterfaceRequestBody({
                                                                        ...interfacerequestBody,
                                                                        mtu: e.target.value,
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="fecMode" className="form-label">
                                                                FEC Mode:
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                className="form-select"
                                                                id="fecMode"
                                                                name="fec"
                                                                value={interfacerequestBody.fec}
                                                                onChange={(e) => {
                                                                    setInterfaceRequestBody({
                                                                        ...interfacerequestBody,
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
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="interfaceType"
                                                                className="form-label"
                                                            >
                                                                Interface Type:
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                className="form-select"
                                                                id="interfaceType-type"
                                                                name="interfaceType"
                                                                value={interfacerequestBody.interfaceType}
                                                                onChange={(e) => {
                                                                    setInterfaceRequestBody({
                                                                        ...interfacerequestBody,
                                                                        interfaceType: e.target.value,
                                                                    });
                                                                }}
                                                            >
                                                                {interfaceTypeOptions.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="autonegotiatespeed"
                                                                className="form-label"
                                                            >
                                                                Type:
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                id="mtu"
                                                                name="alias"
                                                                placeholder="alias"
                                                                value={interfacerequestBody.alias}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="interfaceType"
                                                                className="form-label fw-bold"
                                                            >
                                                                Auto Negotiate :
                                                            </label>
                                                            <div class="form-check form-switch">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="autoNegotiate"
                                                                    name="speed"
                                                                    checked={interfacerequestBody.autoNegotiate}
                                                                    onChange={(e) => {
                                                                        setInterfaceRequestBody({
                                                                            ...interfacerequestBody,
                                                                            autoNegotiate: e.target.checked,
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="autonegotiatespeed"
                                                                className="form-label"
                                                            >
                                                                Speed:
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                className="form-select"
                                                                id="speed"
                                                                name="speed"
                                                                value={interfacerequestBody.speed}
                                                                onChange={(e) => {
                                                                    setInterfaceRequestBody({
                                                                        ...interfacerequestBody,
                                                                        speedSpeed: e.target.value,
                                                                    });
                                                                }}
                                                            >
                                                                {speedOptions.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="channalnumber"
                                                                className="form-label"
                                                            >
                                                                Port breakout:
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                className="form-select"
                                                                id="portSpeed"
                                                                name="portbreakout"
                                                                value={`${interfacerequestBody.numchannel}X${interfacerequestBody.channelspeed.replace("SPEED_", "")}`}
                                                                onChange={(e) => {
                                                                    const selectedValue = e.target.value;
                                                                    const [numChannels, channelspeed] = selectedValue.split("X");
                                                                    const newChannelspeed = `SPEED_${channelspeed}`;
                                                                    setInterfaceRequestBody({
                                                                        ...interfacerequestBody,
                                                                        numchannel: numChannels,
                                                                        channelspeed: newChannelspeed,
                                                                    });
                                                                }}
                                                            >
                                                                {portSpeedOptions.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label.replace("SPEED_", "")}
                                                                    </option>
                                                                ))}
                                                            </Field>


                                                        </div>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
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
                </Modal>
            )}
        </>
    );
}

export default GoldstoneinterfaceCofig;
