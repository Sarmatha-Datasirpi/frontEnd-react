import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {
    RiDeleteBin5Fill,
    RiRestartLine,
    RiInformationFill,
} from "react-icons/ri";

const AlarmsConfigTab = (props) => {
    const deviceIpAddress = useParams().id;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [getAlarmsData, setAlarmsData] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedOption, setSelectedOption] = useState("teams");
    const [editId, setEditId] = useState("");
    const [editValue, setEditValue] = useState("");
    const [isNew, setIsNew] = useState(true);
    const [editedData, setEditedData] = useState({
        id: "",
        type: "",
        value: "",
    });
    console.log(isNew, selectedOption)
    useEffect(() => {
        fetchData(currentPage);
    }, [deviceIpAddress, currentPage]);

    useEffect(() => {
        if (props.selectedItem) {
            setSelectedOption(props.selectedItem.type);
            setEditId(props.selectedItem.id);
            setEditValue(props.selectedItem.value);
            setIsNew(false);
        }
    }, [props.selectedItem]);

    const fetchData = async (page) => {
        try {
            const requestBody = {
                deviceId: deviceIpAddress,
                pageNo: page,
                pageSize: pageSize,
                sortBy: 'value',
                sortOrder: 'ASC',
            };

            const response = await axios.post(
                'http://localhost:8081/alert-list',
                requestBody
            );

            const data = response?.userAlertDTOList;
            const totalSize = response?.totalSize;
            const totalPages = Math.ceil(totalSize / pageSize);
            setAlarmsData(data);
            setTotalPages(totalPages);
            setIsNew(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const reset = () => {
        setIsNew(true);
        setEditedData({
            id: "",
            type: "",
            value: "",
        });
    };
    const handleFormSubmit = async (e) => {
        try {
            const payload = {
                deviceId: deviceIpAddress,
                id: isNew ? undefined : editedData.id,
                type: isNew ? selectedOption : editedData.type,
                value: editedData.value,
            };
            console.log(payload);
            if (isNew) {
                delete payload.id;
            }
            const response = await axios.post("http://localhost:8081/alert", payload);
            setEditedData({
                id: "",
                type: "",
                value: "",
            });
            setSelectedOption(selectedOption);
            setIsNew(true);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setEditedData({
            id: item?.id,
            type: item?.type,
            value: item?.value,
        });
        setIsNew(false);
        setSelectedOption(item?.type);
    };
    const handleDeleteClick = async (item) => {
        try {
            const payload = {
                deviceId: deviceIpAddress,
                id: item.id,
                type: item.type,
                value: item.value,
            };

            const response = await axios.delete("http://localhost:8081/alert", {
                data: payload,
            });
            fetchData(currentPage);
        } catch (error) {
            console.error("API Error:", error);
            fetchData(currentPage);
        }
    };

    const renderPaginationButtons = () => {
        return (
            <Pagination>
                <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index} active={index + 1 === currentPage}>
                        <PaginationLink onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                </PaginationItem>
            </Pagination>
        );
    };

    return (
        <>
            <div className='row'>
                <div className='col-6'>
                    <div>
                        <div className="table-responsive">
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th colSpan={4}> Alarms Configuration
                                            <select
                                                className="custom-select"
                                                value={selectedOption}
                                                onChange={(e) => setSelectedOption(e.target.value)}
                                                disabled={!isNew}
                                            >
                                                <option value="teams">Teams</option>
                                                <option value="slack">Slack</option>
                                                <option value="memory">Memory</option>
                                                <option value="cpu">CPU</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr rowSpan={4}>
                                        <td>{selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}</td>
                                        <td colSpan={3}>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="srcmac"
                                                        id="srcmac"
                                                        size="sm"
                                                        className="form-control"
                                                        style={{ height: '50px' }}
                                                        value={editedData.value}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            setEditedData((prevData) => ({
                                                                ...prevData,
                                                                value: newValue,
                                                            }));
                                                        }}
                                                    />

                                                </td>
                                                <td>
                                                    <Button
                                                        variant="primary"
                                                        onClick={handleFormSubmit}
                                                        style={{ height: '50px' }}
                                                    >
                                                        {isNew ? "Add Configuration" : "Update Configuration"}
                                                    </Button>
                                                </td>
                                                {!isNew && (
                                                    <td>
                                                        <Button
                                                            variant="success"
                                                            onClick={reset}
                                                            style={{ height: '50px' }}
                                                        >
                                                            Reset
                                                        </Button>
                                                    </td>
                                                )}
                                            </tr>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                        <br />
                    </div>
                </div>

                <div className='col-6'>
                    <Container fluid>
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Alarms Configuration</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <Table className="table-striped table-nowrap align-middle mb-0">
                                                {getAlarmsData.length > 0 ? (
                                                    <>
                                                        <thead>
                                                            <tr>
                                                                <th align='center'>Type</th>
                                                                <th align='center'>Value</th>
                                                                <th align='center'>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {getAlarmsData.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td align='center'>{item.type}</td>
                                                                    <td align='center'>{item.value}</td>
                                                                    <td align='center'>
                                                                        <div className="d-flex gap-2">
                                                                            <div className="edit">
                                                                                <button
                                                                                    className="btn btn-sm btn-success edit-item-btn"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#showModal"
                                                                                    id="viewdeviceinfo343"
                                                                                    onClick={() => handleEditClick(item)}
                                                                                >
                                                                                    Edit
                                                                                </button>
                                                                            </div>
                                                                            <>

                                                                                <div className="remove">
                                                                                    <button
                                                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                                                        data-bs-toggle="modal"
                                                                                        data-bs-target="#deleteRecordModal"
                                                                                        onClick={() => handleDeleteClick(item)}
                                                                                    >
                                                                                        <RiDeleteBin5Fill
                                                                                            style={{
                                                                                                color: "white",
                                                                                                width: 20,
                                                                                                height: 20,
                                                                                            }}
                                                                                        />
                                                                                    </button>
                                                                                </div>

                                                                            </>
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </>
                                                ) : (
                                                    <caption>No Information found</caption>
                                                )}
                                            </Table>
                                        </div>
                                        {totalPages > 1 && renderPaginationButtons()}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        </>
    );
};

export default AlarmsConfigTab;
