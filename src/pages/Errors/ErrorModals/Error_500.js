import { Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import { useParams } from "react-router-dom";
import error500 from "../../../assets/images/error500.png"
function Error_500(props) {
    const deviceIpAddress = useParams().id;
    const closeModal = () => props.setShowModal(false);
    return (
        <>
            <Modal
                show={props.showModal}
                onHide={closeModal}
                dialogClassName="modal-90w"
                size="xl"
                fullscreen="true"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Error 500</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <label className="form-label fw-bold badge fs-4 bg-info">
                    </label>{" "}
                    <Modal.Body>
                        <Formik
                        >
                            {({ }) => (
                                <Form>
                                    <Row>
                                        <div className="col">
                                            <img src={error500} height={350} width={400} />
                                        </div>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default Error_500;
