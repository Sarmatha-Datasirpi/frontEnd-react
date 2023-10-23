import { useEffect, useState, useRef } from "react";
import Loader from "../../Components/Common/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Badge,
    Card,
    CardBody,
    Col,
    Row,
    Container,
    UncontrolledTooltip,
} from "reactstrap";

import List from "list.js";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { DOMAIN, PROTOCOL, PORT_8081 } from "../../helpers/url_helper";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { postLogsData } from "../../store/TopologyLogs/action";
const SyslogyLogs_logs = (props) => {
    const [deviceList, setDeviceList] = useState([]);
    const [deviceListSearch, setDeviceListSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [UnknowncurrentPage, setUnknownCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const deviceId = useParams().id;
    const dispatch = useDispatch();
    const fetchDevices = async (searchQuery = "") => {
        setIsLoading(true);
        try {
            const requestBody = {
                deviceId: deviceId,
                pageNo: currentPage,
                pageSize: 10,
                sortBy: "date",
                sortOrder: "ASC",
                searchBy: searchQuery,
            };
            setDeviceList([]);

            const response = await axios.post(
                `${PROTOCOL}://${DOMAIN}:${PORT_8081}/logs`,
                requestBody
            );
            setDeviceList(response?.eventList);
            setTotalCount(response?.totalSize);
        } catch (error) {
            console.error("Error fetching Logs data:", error);
        }
        setIsLoading(false);
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = (e) => {
        setUnknownCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const totalPages = Math.ceil(totalCount / 10);

    useEffect(() => {
        fetchDevices();
    }, [UnknowncurrentPage, currentPage]);



    const filteredDevicesList = useSelector(
        (state) => state.DevicesListData.getDevicesData
    );


    useEffect(() => {
        setDeviceList(filteredDevicesList);
    }, [filteredDevicesList]);


    const searchByDeviceId = (val) => {
        if (!val) {
            setDeviceList(deviceListSearch);
        } else {
            fetchDevices(val);
        }
    };

    function isEmpty(obj) {
        return obj == null || Object.keys(obj).length === 0;
    }

    const maxVisiblePages = 5;



    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        if (pageNumbers.length <= maxVisiblePages) {
            return pageNumbers.map((page) => (
                <Pagination.Item
                    key={page}
                    active={currentPage === page}
                    onClick={() => handlePagination(page)}
                >
                    {page}
                </Pagination.Item>
            ));
        } else {
            const leftEllipsis = currentPage > maxVisiblePages / 2 + 1;
            const rightEllipsis = currentPage < pageNumbers.length - maxVisiblePages / 2;

            if (!leftEllipsis) {
                const visiblePages = pageNumbers.slice(0, maxVisiblePages - 1);
                return (
                    <>
                        {visiblePages.map((page) => (
                            <Pagination.Item
                                key={page}
                                active={currentPage === page}
                                onClick={() => handlePagination(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        <Pagination.Ellipsis disabled />
                        <Pagination.Item onClick={() => handlePagination(pageNumbers.length)}>
                            {pageNumbers.length}
                        </Pagination.Item>
                    </>
                );
            } else if (!rightEllipsis) {
                const visiblePages = pageNumbers.slice(-maxVisiblePages + 1);
                return (
                    <>
                        <Pagination.Item onClick={() => handlePagination(1)}>1</Pagination.Item>
                        <Pagination.Ellipsis disabled />
                        {visiblePages.map((page) => (
                            <Pagination.Item
                                key={page}
                                active={currentPage === page}
                                onClick={() => handlePagination(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                    </>
                );
            } else {
                const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                const endPage = Math.min(pageNumbers.length, startPage + maxVisiblePages - 1);
                return (
                    <>
                        <Pagination.Item onClick={() => handlePagination(1)}>1</Pagination.Item>
                        <Pagination.Ellipsis disabled />
                        {pageNumbers.slice(startPage - 1, endPage).map((page) => (
                            <Pagination.Item
                                key={page}
                                active={currentPage === page}
                                onClick={() => handlePagination(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        <Pagination.Ellipsis disabled />
                        <Pagination.Item onClick={() => handlePagination(pageNumbers.length)}>
                            {pageNumbers.length}
                        </Pagination.Item>
                    </>
                );
            }
        }
    };

    return (
        <div>
            <Container fluid className="mt-4">
                <Row className="mb-4">
                    <Col xs={12} className="mt-4">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="mt-3 mt-lg-0">
                                <form action="#">
                                    <Row className="g-3 mb-0 align-items-center">
                                        <div className="col-auto">
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input
                                                            type="text"
                                                            className="form-control search"
                                                            placeholder="Search..."
                                                            id="searchdevicelist"
                                                            onChange={(e) => searchByDeviceId(e.target.value)}
                                                        />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                                <UncontrolledTooltip
                                                    placement="bottom"
                                                    target="searchdevicelist"
                                                >
                                                    Search By Source or Message
                                                </UncontrolledTooltip>
                                            </Col>
                                        </div>
                                    </Row>
                                </form>
                            </div>
                        </div>


                        <div id="deviceList">
                            <div className="table-responsive table-card mb-1 mt-4">
                                <Table
                                    className="table table-bordered"
                                >
                                    <thead className="table-light" align="center">
                                        <tr>
                                            <th align="center" >
                                                DATE
                                            </th>
                                            <th align="center" >
                                                SOURCE
                                            </th>
                                            <th align="center">
                                                PRIORITY
                                            </th>
                                            <th align="center" >
                                                PROGRAM
                                            </th>
                                            <th align="center">
                                                FACILITY
                                            </th>
                                            <th align="center" >
                                                Message
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="list form-check-all">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    <Loader />
                                                </td>
                                            </tr>
                                        ) : (
                                            deviceList?.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td className="date">{item?.date}</td>
                                                        <td className="source">
                                                            {item.source}
                                                        </td>
                                                        <td className="priority">{item?.priority}</td>
                                                        <td className="mac_address">
                                                            {item.program}
                                                        </td>
                                                        <td className="model">
                                                            {item?.facility}
                                                        </td>
                                                        <td className="message_" align="center">{item?.message}</td>
                                                    </tr>
                                                );
                                                return null;
                                            })
                                        )}
                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-end">
                                    <Pagination>
                                        <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1}>
                                            Previous
                                        </Pagination.Prev>
                                        {renderPageNumbers()}
                                        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages}>
                                            Next
                                        </Pagination.Next>
                                    </Pagination>
                                </div>
                                <div className="noresult" style={{ display: "none" }}>
                                    <div className="text-center">
                                        <lord-icon
                                            src="https://cdn.lordicon.com/msoeawqm.json"
                                            trigger="loop"
                                            colors="primary:#121331,secondary:#08a88a"
                                            style={{ width: "75px", height: "75px" }}
                                        ></lord-icon>
                                        <h5 className="mt-2">Sorry! No Result Found</h5>
                                        <p className="text-muted mb-0">
                                            We've searched more than 150+ Orders We did not find any
                                            orders for you search.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </Col>
                </Row >
            </Container>
        </div >
    );
};

export default SyslogyLogs_logs;
