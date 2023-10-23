import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import { createCustumField, getOidList } from '../../store/actions';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { getOpticalMonitorData } from "../../store/OpticalManagement/action";
import { isEmpty } from "lodash";
import { getUserData } from "../../store/user/action";


const DynamicGraph = () => {
    const dispatch = useDispatch();
    const deviceIdforform = useParams().id;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({ name: '', oid: '' });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const handleInputChange = (e) => {
        setFormValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        setIsSubmitDisabled(!(formValues?.name !== '' && formValues?.oid !== ''));
    }, [formValues]);

    let Payload = {
        deviceId: deviceIdforform,
        name: formValues.name,
        oid: formValues.oid
    }

    useEffect(() => {
        dispatch(getOidList(deviceIdforform));


    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValues.name.trim() !== '' && formValues.oid.trim() !== '') {
            try {
                await dispatch(createCustumField(Payload));
                setModalIsOpen(false);
                dispatch(getOpticalMonitorData(deviceIdforform, null));
                await dispatch(getOidList(deviceIdforform));
                await setFormValues({ name: '', oid: '' });
                await setIsSubmitDisabled(true);

            } catch (error) {
                // Handle error if needed
            }
        }
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
            setUserId(obj.id);
            setUserName(obj.username);
            setRole(obj.roles);
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
        <div>
            {isAdmin && (
                <Button variant="primary" style={{ width: '188px' }} onClick={() => setModalIsOpen(true)}>
                    Add OID
                </Button>
            )}
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title> Create  Graph FieldList</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-5'>
                                <div className='row'>
                                    <div className='col-12 mt-3'>
                                        <label className='form-label fw-bold'><h4>Device ID:</h4></label>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <label className='form-label fw-bold'> <h4>Name*:</h4></label>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <label className='form-label fw-bold'>
                                            <h4>OID*:</h4></label>
                                    </div>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            value={deviceIdforform}

                                        />
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="oid"
                                            value={formValues.oid}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            {isSubmitDisabled ? (
                                <OverlayTrigger
                                    placement='top'
                                    overlay={<Tooltip id='tooltip'>Please fill in both fields.</Tooltip>}
                                >
                                    <span>
                                        <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                                            Submit
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                            ) : (
                                <Button variant="primary" type="submit" disabled={isSubmitDisabled} onClick={handleSubmit}>
                                    Submit
                                </Button>
                            )}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};



export default DynamicGraph;

