import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    UncontrolledTooltip,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { ErrorModal } from "./Error_Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useParams } from "react-router-dom";
const Error_index = (props) => {
    const deviceIpAddress = useParams().id;
    const [modalProps, setModalProps] = useState({ section: "" });
    const [showModal, setShowModal] = useState(false);
    return (
        <React.Fragment>
            <div>
                <>
                </>
                <>
                    <div className="d-flex flex-wrap gap-3 justify-content-around px-2">

                        return (
                        <div
                            onClick={() => {
                                setModalProps({ section: 'Error_500' });
                                setShowModal(true);

                            }}
                        >
                            <div className="d-flex align-items-center flex-column justify-content-between">

                                <div className="text-center">
                                    <p className="mb-0">
                                        <strong>POrtchannel</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        );
                    </div>

                    <ErrorModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        modalProps={modalProps}
                    />
                </>
            </div>

        </React.Fragment >
    );
};

export default Error_index;