import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as Yup from 'yup'; // Import Yup for validation
import { getInterfaceData } from "../../../store/Interfaces/action";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN, PORT_8081, PROTOCOL } from '../../../helpers/url_helper';
import axios from 'axios';
import { toast } from 'react-toastify';
const GeneralTab = (props) => {

    const dispatch = useDispatch();
    const fromArr = props.EditMapData && props.EditMapData.from ? props.EditMapData.from.split(",") : [];
    const toArr = props.EditMapData && props.EditMapData.to ? props.EditMapData.to.split(",") : [];
    const fromArrWithLabels = fromArr.map((value) => ({ value, label: value }));
    const toArrWithLabels = toArr.map((value) => ({ value, label: value }));
    const [selectedFromOptions, setSelectedFromOptions] = useState(fromArrWithLabels);
    const [selectedToOptions, setSelectedToOptions] = useState(toArrWithLabels);
    const deviceIpAddress = useParams().id;
    const isAdmin = props?.isAdmin

    const [createMapformData, setCreateMapFormData] = useState({
        deviceId: deviceIpAddress,
        mapId: '',
        description: '',
        isUpdate: false,
    });
    const [hasOtherFieldsModified, setHasOtherFieldsModified] = useState(false);
    useEffect(() => {
        if (props?.EditMapData) {
            setCreateMapFormData((prevState) => ({
                ...prevState,
                mapId: props?.EditMapData?.mapId || "",
                from: props?.EditMapData?.from || "",
                to: props?.EditMapData?.to || "",
                description: props?.EditMapData?.description || "",
                isUpdate: props?.EditMapData?.mapId ? true : false
            }));
        }
    }, [props.EditMapData]);

    let interfaceList = useSelector((state) => {
        const interfaceData = state?.Interface_reducer?.interfaceData;
        const combinedList = [
            ...(interfaceData?.interfaceList || []),
            ...(interfaceData?.portChannelDTOList || [])
        ];
        return combinedList;
    });

    const interfaceNamesArray = interfaceList ? interfaceList.map((interfaceItem) => interfaceItem?.name) : [];

    useEffect(() => {
        dispatch(getInterfaceData(deviceIpAddress));
    }, [deviceIpAddress]);

    const networkPortsOptions = interfaceNamesArray?.filter((name) => !createMapformData?.from?.includes(name)).map((name) => ({ value: name, label: name }));

    const toolPortsOptions = interfaceNamesArray?.filter((name) => !createMapformData?.to?.includes(name)).map((name) => ({ value: name, label: name }));

    const handleFormInputChange = (event) => {
        const { name, value } = event.target;

        // const hasMissingField = !createMapformData.mapId || !createMapformData.from || !createMapformData.to;

        // if (hasMissingField) {
        //     setHasOtherFieldsModified(true);
        //     const missingFields = [];

        //     if (!createMapformData.mapId) {
        //         missingFields.push('Map ID');
        //     }
        //     console.log(missingFields, hasMissingField)
        //     if (missingFields.length > 0) {
        //         const errorMessage = `Please add Mandatory field${missingFields.length > 1 ? 's' : ''}: (${missingFields.join(', ')})`;
        //         toast.error(`${errorMessage}`, {
        //             autoClose: 3000,
        //         });
        //     }
        // }

        setCreateMapFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleNetworkPortsChange = (selectedOptions) => {
        setSelectedFromOptions(selectedOptions)
        const selectedValues = selectedOptions?.map((option) => option.value).join(',');
        setCreateMapFormData((prevData) => ({
            ...prevData,
            from: selectedValues,
        }));
    };


    const handleToolPortsChange = (selectedOptions) => {
        setSelectedToOptions(selectedOptions)
        const selectedValues = selectedOptions.map((option) => option.value).join(',');
        setCreateMapFormData((prevData) => ({
            ...prevData,
            to: selectedValues
        }));
    };
    const mapIdValidationData = useSelector((state) => state?.PacketProker_reducer?.coOrdinateDataSet.map((mapid) => (mapid.mapId)));
    const InputMapId = createMapformData?.mapId
    const isMapIdValid = mapIdValidationData.includes(InputMapId);

    const handleCreateMap = async (event) => {
        const apiUrl = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/map`;

        try {
            const response = await axios.post(apiUrl, createMapformData);
            if (response.statusCode === 200) {
                setTimeout(() => {
                    props.onCloseModal();
                }, 700);
                toast.success(response.message, {
                    autoClose: 3000 // Display for 3 seconds
                });
            } else {
                toast.error("An error occurred while configuring the map.", {
                    autoClose: 3000 // Display for 3 seconds
                });
            }
            setCreateMapFormData({
                mapId: '',
                from: '',
                to: '',
                description: '',
                isUpdate: false
            });


        } catch (error) {
            toast.error("An error occurred while configuring the map.");
        }

    };

    const validationSchema = Yup.object().shape({
        mapId: Yup.string().nullable().required('Map ID is required'),
        description: Yup.string().nullable().required('Description is required'),
    });


    return (
        <Formik
            initialValues={{
                mapId: "",
                networkPorts: [],
                toolPorts: [],
                description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleCreateMap}

        >
            {({ isSubmitting }) => (
                <><Form >
                    <Row className="d-flex flex-column justify-content-between">
                        <Row>
                            <div className="col-2">
                                <label>Map ID</label>
                                <FloatingLabel>
                                    <Field
                                        required
                                        type="text"
                                        className="form-control"
                                        name="mapId"
                                        as={Form.Control}
                                        style={{ height: '40px' }} // Adjust the height value as needed
                                        value={createMapformData.mapId}
                                        readOnly={props?.EditMapData !== null}
                                        onChange={handleFormInputChange} />

                                    {/* <ErrorMessage name="mapId" component="div" className="text-danger" /> */}
                                </FloatingLabel>
                            </div>
                            <div className="col-5">
                                <label>Network Port</label>
                                <FloatingLabel>
                                    <Select
                                        isMulti
                                        placeholder="Select network ports"
                                        options={toolPortsOptions}
                                        value={selectedFromOptions}
                                        onChange={handleNetworkPortsChange}
                                    />
                                </FloatingLabel>
                            </div>
                            <div className="col-5">
                                <label>Tool Port</label>
                                <FloatingLabel>
                                    <Select
                                        isMulti
                                        placeholder="Select tool ports"
                                        options={networkPortsOptions}
                                        value={selectedToOptions}
                                        onChange={handleToolPortsChange} />
                                </FloatingLabel>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 mt-2">
                                <FloatingLabel controlId="floatingInput" label="Description">
                                    <Field
                                        as="textarea"
                                        placeholder="description"
                                        name="description"
                                        className="form-control"
                                        value={createMapformData.description}
                                        onChange={handleFormInputChange} />
                                    {/* <ErrorMessage name="description" component="div" className="text-danger" /> */}
                                </FloatingLabel>
                            </div>

                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            <>
                                {isAdmin && (
                                    <div className="d-grid gap-2 mt-2">
                                        <Button variant="primary" type="submit" disabled={isSubmitting} onClick={handleCreateMap} >
                                            {props.EditMapData ? 'Update' : 'Create'}
                                        </Button>
                                    </div>
                                )}
                            </>
                        </Col>
                    </Row>
                </Form></>
            )}
        </Formik>
    );
};

export default GeneralTab;
