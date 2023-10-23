import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, FloatingLabel, Table, Button } from "react-bootstrap";
import { Formik, Field } from "formik";
import { setRuleData } from "../../../store/PacketProker/action";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

function FilterCriteriaForm(props) {

    const deviceIpAddress = useParams().id;
    const dispatch = useDispatch();
    const [isRuleUpdated, setIsRuleUpdated] = useState(false);
    const [brokerRequestBody, setBrokerRequestBody] = useState({
        deviceId: deviceIpAddress,
        mapId: props?.mapId,
        ruleId: "",
        isUpdate: false,
        action: "permit",
        stats: "disabled",
    });

    const isAdmin = props?.isAdmin

    const isMatchAll = brokerRequestBody?.isMatchAll || false;

    useEffect(() => {

        if (props?.getOneRule === undefined) {
            setBrokerRequestBody((prevState) => ({
                ...prevState,
                ruleId: "",
                action: "",
                stats: "",
                srcmac: "",
                destmac: "",
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
                innervlan: "",
                outervlan: "",
                isMatchAll: false
            }));
        }


    }, [props?.getOneRule === undefined]);


    useEffect(() => {

        if (isMatchAll) {
            setBrokerRequestBody((prevState) => ({
                ...prevState,
                ruleId: brokerRequestBody?.ruleId || "",
                action: props?.getOneRule?.action || "permit",
                stats: props?.getOneRule?.stats || "enabled",
                srcmac: "",
                destmac: "",
                ethertype: "",
                ipdst: "",
                ipsrc: "",
                srcipv6: "",
                smask: "",
                dstipv6: "",
                dmask: '',
                ttl: "",
                src_l4port: "",
                dst_l4port: "",
                protocol: "",
                innervlan: "",
                outervlan: "",
                isUpdate: props?.getOneRule?.ruleId === undefined || props?.getOneRule?.ruleId !== brokerRequestBody?.ruleId ? false : true
            }));
        }
    }, [isMatchAll]);


    useEffect(() => {

        if (props?.getOneRule) {
            setBrokerRequestBody((prevState) => ({
                ...prevState,
                ruleId: props?.getOneRule?.ruleId,
                action: props?.getOneRule?.action,
                stats: props?.getOneRule?.stats,
                srcmac: props?.getOneRule?.srcmac,
                destmac: props?.getOneRule?.destmac,
                ethertype: props?.getOneRule?.ethertype,
                ipdst: props?.getOneRule?.ipdst,
                ipsrc: props?.getOneRule?.ipsrc,
                srcipv6: props?.getOneRule?.srcipv6,
                smask: props?.getOneRule?.smask,
                dstipv6: props?.getOneRule?.dstipv6,
                dmask: props?.getOneRule?.dmask,
                ttl: props?.getOneRule?.ttl,
                src_l4port: props?.getOneRule?.src_l4port,
                dst_l4port: props?.getOneRule?.dst_l4port,
                protocol: props?.getOneRule?.protocol,
                innervlan: props?.getOneRule?.innervlan,
                outervlan: props?.getOneRule?.outervlan,
                isMatchAll: props?.getOneRule?.match_all,
                isUpdate: props?.getOneRule?.ruleId ? true : false
            }));
        }




        setIsRuleUpdated(Boolean(props.getOneRule?.ruleId));


    }, [props?.getOneRule]);

    const validationSchema = Yup.object().shape({
        ruleId: Yup
            .string()
            .required('Rule ID is required.'),
        action: Yup
            .string()
            .required('Action is required.'),
        stats: Yup
            .string()
            .required('Stats is required.'),
        srcmac: Yup
            .string()
            .matches(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, 'Please enter a valid Src MAC address in the format "AA:BB:CC:DD:EE:FF".'),
        destmac: Yup
            .string()
            .matches(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, 'Please enter a valid dest MAC address in the format "AA:BB:CC:DD:EE:FF".'),
        ethertype: Yup
            .string()
            .matches(/^0x[0-9a-fA-F]+$/, 'Please enter a valid Ethertype in the format "0x0A00".'),
        innervlan: Yup
            .number()
            .min(0, 'Inner VLAN number must be greater than or equal to 0.')
            .max(4096, 'Inner VLAN number must be less than or equal to 4096.'),
        outervlan: Yup
            .number()
            .min(0, 'Outer VLAN number must be greater than or equal to 0.')
            .max(4096, 'Outer VLAN number must be less than or equal to 4096.'),
        srcipv6: Yup
            .string()
            .matches(/:/, 'Please enter a valid src IPv6 address in the correct format.'),
        smask: Yup
            .string()
            .matches(/:/, 'Please enter a valid smask value.'),
        dstipv6: Yup
            .string()
            .matches(/:/, 'Please enter a valid IPv6 address in the incorrect format.'),
        dmask: Yup
            .string()
            .matches(/:/, 'Please enter a valid dmask value.'),
    });

    // Function to check if Rule ID exists in getRule_red array
    function isRuleIdAlreadyExists(ruleId, getRuleRedArray) {
        return getRuleRedArray.includes(ruleId);
    }

    const getRule_red = useSelector((state) => state?.PacketProker_reducer?.getRule_red.map((Rule) => (Rule.ruleId)));
    const RuleIdValidation = brokerRequestBody?.ruleId;
    const isRuleIdValid = getRule_red.includes(RuleIdValidation);


    const handleSubmit = async (event) => {

        const mandatoryFields = ["ruleId", "action", "stats"];
        const missingFields = mandatoryFields.filter((field) => !brokerRequestBody[field]);

        if (missingFields.length > 0) {
            const missingFieldsString = missingFields.join(", ");
            toast.error(`Mandatory fields ${missingFieldsString} are missing or have invalid values.`);
            return;
        }

        if (isRuleIdValid) {
            toast.error("Given Rule ID Already Exits.");
            return;
        }

        const srcmacRegex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
        if (brokerRequestBody.srcmac && !srcmacRegex.test(brokerRequestBody.srcmac)) {
            toast.error("Please enter a valid Src MAC address in the format 'AA:BB:CC:DD:EE:FF'.");
            return;
        }

        const destmacRegex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
        if (brokerRequestBody.destmac && !destmacRegex.test(brokerRequestBody.destmac)) {
            toast.error("Please enter a valid dest MAC address in the format 'AA:BB:CC:DD:EE:FF'.");
            return;
        }
        // Validate ethertype field
        const ethertypeRegex = /^0x[0-9a-fA-F]+$/;
        if (brokerRequestBody.ethertype && !ethertypeRegex.test(brokerRequestBody.ethertype)) {
            toast.error("Please enter a valid Ethertype in the format '0x0A00'.");
            return;
        }

        // Validate innervlan field
        const innervlan = brokerRequestBody.innervlan;
        if (innervlan && (!/^\d+$/.test(innervlan) || +innervlan < 0 || +innervlan > 4096)) {
            toast.error("Please enter a valid Inner VLAN number between 0 and 4096.");
            return;
        }

        const outervlan = brokerRequestBody.outervlan;
        if (outervlan && (!/^\d+$/.test(outervlan) || +outervlan < 0 || +outervlan > 4096)) {
            toast.error("Please enter a valid Outer VLAN number between 0 and 4096.");
            return;
        }

        // Validate srcipv6 field
        const srcipv6 = brokerRequestBody.srcipv6;
        const srcipv6Regex = /:/;
        if (srcipv6 && !srcipv6Regex.test(srcipv6)) {
            toast.error("Please enter a valid src IPv6 address in the correct format.");
            return;
        }


        // Validate smask field
        const smask = brokerRequestBody.smask;
        const smaskRegex = /:/;
        if (smask && !smaskRegex.test(smask)) {
            toast.error("Please enter a valid smask value.");
            return;
        }

        // Validate dstipv6 field
        const dstipv6 = brokerRequestBody.dstipv6;
        const dstipv6Regex = /:/;

        if (dstipv6 && !dstipv6Regex.test(dstipv6)) {
            toast.error("Please enter a valid IPv6 address in the incorrect  format");
            return;
        }

        // Validate dmask field
        const dmask = brokerRequestBody.dmask;
        const dmaskRegex = /:/;
        if (dmask && !dmaskRegex.test(dmask)) {
            toast.error("Please enter a valid dmask value.");
            return;
        }

        const cleanedRequestBody = removeEmptyFields(brokerRequestBody);

        await dispatch(setRuleData(cleanedRequestBody));

        setBrokerRequestBody({
            action: "permit",
            stats: "disabled",
            srcmac: "",
            destmac: "",
            ethertype: "",
            ipdst: "",
            ipsrc: "",
            srcipv6: "",
            smask: '',
            dstipv6: '',
            dmask: "",
            ttl: "",
            src_l4port: "",
            dst_l4port: "",
            protocol: "",
            deviceId: deviceIpAddress,
            mapId: props?.mapId,
            ruleId: "",
            innervlan: "",
            outervlan: "",
            isUpdate: false
        });

        props.handleRuleSubmit(event);

        setIsRuleUpdated(false);

    };


    // Utility function to remove empty or falsy fields from an object
    const removeEmptyFields = (obj) => {
        const cleanedObj = { isUpdate: false, isMatchAll: props?.getOneRule?.match_all === true ? isMatchAll : false, };
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
                cleanedObj[key] = obj[key];
            }
        }
        return cleanedObj;
    };

    const handleInputChange = (fieldName, value) => {
        setBrokerRequestBody({
            ...brokerRequestBody,
            [fieldName]: value,
        });
    };

    const handleReset = () => {

        // Reset the value to an initial state (e.g., empty string)
        setBrokerRequestBody({
            action: "permit",
            stats: "disabled",
            isMatchAll: false,
            srcmac: "",
            destmac: "",
            ethertype: "",
            ipdst: "",
            ipsrc: "",
            srcipv6: "",
            smask: '',
            dstipv6: '',
            dmask: "",
            ttl: "",
            src_l4port: "",
            dst_l4port: "",
            protocol: "",
            innervlan: "",
            outervlan: "",
            ruleId: "",
            deviceId: deviceIpAddress,
            mapId: props?.mapId,
            isUpdate: props.getOneRule ? false : true
        })
        setIsRuleUpdated(false);

    };


    return (
        <>
            <Formik onSubmit={handleSubmit}>
                {({ }) => (
                    <Form>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Map ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="map_Id"
                                        placeholder="Map ID"
                                        className="form-control"
                                        size="sm"
                                        value={brokerRequestBody?.mapId}
                                        onChange={(e) => handleInputChange("mapId", e.target.value)}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Rule ID*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="ruleId"
                                        placeholder="Rule Id"
                                        size="sm"
                                        className="form-control"
                                        value={brokerRequestBody?.ruleId}
                                        readOnly={isRuleUpdated}
                                        onChange={(e) => {
                                            setBrokerRequestBody({
                                                ...brokerRequestBody,
                                                ruleId: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={4}>
                                <div className="mb-3 mt-1">
                                    <Form.Label className="fw-bold">Action* :</Form.Label>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Check
                                                type="checkbox"
                                                id="permit"
                                                name="permit"
                                                label="Permit"
                                                checked={brokerRequestBody.action === "permit"}
                                                onChange={() => {
                                                    setBrokerRequestBody({
                                                        ...brokerRequestBody,
                                                        action: "permit",
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Form.Check
                                                type="checkbox"
                                                id="deny"
                                                name="deny"
                                                label="Deny"
                                                checked={brokerRequestBody.action === "deny"}
                                                onChange={() => {
                                                    setBrokerRequestBody({
                                                        ...brokerRequestBody,
                                                        action: "deny",
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className="mb-3 mt-1">
                                    <Form.Label className="fw-bold">Stats* :</Form.Label>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Check

                                                type="checkbox"
                                                id="enabled"
                                                name="stats"
                                                label="Enabled"
                                                checked={brokerRequestBody.stats === "enabled"}
                                                onChange={() => {
                                                    setBrokerRequestBody({
                                                        ...brokerRequestBody,
                                                        stats: "enabled",
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Form.Check
                                                type="checkbox"
                                                id="disabled"
                                                name="stats"
                                                label="Disabled"
                                                checked={brokerRequestBody.stats === "disabled"}
                                                onChange={() => {
                                                    setBrokerRequestBody({
                                                        ...brokerRequestBody,
                                                        stats: "disabled",
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className="mb-3">
                                    <Form.Label className="fw-bold">Match All* :</Form.Label>

                                    <div className="form-check form-switch">
                                        <div className="col-6">
                                            <Form.Check
                                                style={{ fontSize: "11px" }}
                                                type="checkbox"
                                                id="enabled"
                                                name="isMatchAll"
                                                checked={brokerRequestBody.isMatchAll === true}
                                                onChange={(e) => {
                                                    setBrokerRequestBody({
                                                        ...brokerRequestBody,
                                                        isMatchAll: e.target.checked,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="table-responsive">
                            <Table striped bordered hover className="mt-3" >
                                <thead>
                                    <tr>
                                        <th colSpan={4}>Available Filters</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr rowSpan={3}>
                                        <td>L2</td>
                                        <td colSpan={3}>
                                            <tr>
                                                <td >
                                                    <FloatingLabel controlId="floatingInput" label="SMAC" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="srcmac"
                                                            id="srcmac"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.srcmac}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    srcmac: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="DMAC" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="destmac"
                                                            id="destmac"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.destmac}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    destmac: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="Ether Type" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="ethertype"
                                                            id="ethertype"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.ethertype}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    ethertype: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="Inner Vlan" className="mb-3">
                                                        <Field
                                                            type="number"
                                                            name="innervlan"
                                                            id="innervlan"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.innervlan}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                if (newValue === "" || (parseInt(newValue, 10) >= 0 && parseInt(newValue, 10) <= 4096)) {
                                                                    setBrokerRequestBody({
                                                                        ...brokerRequestBody,
                                                                        innervlan: newValue,
                                                                    });
                                                                }
                                                            }}

                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="Outer Vlan" className="mb-3">
                                                        <Field
                                                            type="number"
                                                            name="outervlan"
                                                            id="outervlan"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.outervlan}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                if (newValue === "" || (parseInt(newValue, 10) >= 0 && parseInt(newValue, 10) <= 4096)) {
                                                                    setBrokerRequestBody({
                                                                        ...brokerRequestBody,
                                                                        outervlan: newValue,
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                            </tr>
                                        </td>

                                    </tr>

                                    <tr rowSpan={4}>
                                        <td>L3</td>
                                        <td colSpan={3}>
                                            <tr>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="DIP" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="ipdst"
                                                            id="ipdst"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.ipdst}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    ipdst: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="SIP" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="ipsrc"
                                                            id="ipsrc"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.ipsrc}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    ipsrc: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="SIP V6" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="srcipv6"
                                                            id="srcipv6"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.srcipv6}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    srcipv6: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="SMASK" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="smask"
                                                            id="smask"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.smask}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    smask: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                            </tr>
                                            <br />
                                            <tr>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="DIP V6" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="dstipv6"
                                                            id="dstipv6"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.dstipv6}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    dstipv6: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="DMASK" className="mb-3">
                                                        <Field
                                                            type="text"
                                                            name="dmask"
                                                            id="dmask"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.dmask}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                setBrokerRequestBody({
                                                                    ...brokerRequestBody,
                                                                    dmask: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </FloatingLabel>
                                                </td>
                                                <td>
                                                    <FloatingLabel controlId="floatingInput" label="TTL" className="mb-3">
                                                        <Field
                                                            type="number"
                                                            name="ttl"
                                                            id="ttl"
                                                            size="sm"
                                                            className="form-control"
                                                            style={{ height: '50px' }}
                                                            value={isMatchAll ? "" : brokerRequestBody?.ttl}
                                                            disabled={isMatchAll}
                                                            onChange={(e) => {
                                                                const inputValue = e.target.value;
                                                                if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 255) {
                                                                    setBrokerRequestBody({
                                                                        ...brokerRequestBody,
                                                                        ttl: inputValue,
                                                                    });
                                                                }
                                                                // Optionally, you can add an else condition to display an error message if the input is invalid.
                                                            }}
                                                        />
                                                    </FloatingLabel>

                                                </td>
                                            </tr>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>L4</td>
                                        <td>
                                            <FloatingLabel controlId="floatingInput" label="S Port" className="mb-3">
                                                <Field
                                                    type="number"
                                                    name="src_l4port"
                                                    id="src_l4port"
                                                    size="sm"
                                                    className="form-control"
                                                    style={{ height: '50px' }}
                                                    value={isMatchAll ? "" : brokerRequestBody?.src_l4port}
                                                    disabled={isMatchAll}
                                                    onChange={(e) => {
                                                        setBrokerRequestBody({
                                                            ...brokerRequestBody,
                                                            src_l4port: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </FloatingLabel>
                                        </td>
                                        <td>
                                            <FloatingLabel controlId="floatingInput" label="D Port" className="mb-3">
                                                <Field
                                                    type="number"
                                                    name="dst_l4port"
                                                    id="dst_l4port"
                                                    size="sm"
                                                    className="form-control"
                                                    style={{ height: '50px' }}
                                                    value={isMatchAll ? "" : brokerRequestBody?.dst_l4port}
                                                    disabled={isMatchAll}
                                                    onChange={(e) => {
                                                        setBrokerRequestBody({
                                                            ...brokerRequestBody,
                                                            dst_l4port: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </FloatingLabel>
                                        </td>
                                        <td>
                                            <FloatingLabel controlId="floatingInput" label="Protocol" className="mb-3">
                                                <Field
                                                    type="text"
                                                    name="protocol"
                                                    id="protocol"
                                                    size="sm"
                                                    className="form-control"
                                                    style={{ height: '50px' }}
                                                    value={isMatchAll ? "" : brokerRequestBody?.protocol}
                                                    disabled={isMatchAll}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const alphabeticValue = inputValue.replace(/[^a-zA-Z]/g, '');
                                                        setBrokerRequestBody({
                                                            ...brokerRequestBody,
                                                            protocol: alphabeticValue,
                                                        });
                                                    }}
                                                />
                                            </FloatingLabel>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <br />
                        <Row>
                            <Col>
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="secondary"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Col>
                            <Col>
                                <>
                                    {isAdmin && (
                                        <div className="d-grid gap-2">
                                            <Button
                                                variant="primary"
                                                onClick={handleSubmit}
                                            >
                                                {isRuleUpdated ? 'Update Rule' : 'Add Rule'}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default FilterCriteriaForm;
