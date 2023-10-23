import moment from "moment";
import { React, useEffect, useState } from "react";
import Loader from "../../Components/Common/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Card, Col, Pagination } from "react-bootstrap";
import { getAlarmsData, getsyslogData } from "../../store/TopologyLogs/action";
import Flatpickr from "react-flatpickr";
import { AiOutlineClear } from "react-icons/ai";

const SyslogyLogs_Logs_notification = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const tableHeaders = [
        "DATE",
        "SOURCEIP",
        "SOURCE",
        "PRIORITY",
        "PROGRAM",
        "HOST",
        "FACILITY",
        "MESSAGE",
    ];
    const deviceId = useParams().id;
    const [devices, setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [searchByDate, setSearchByDate] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage, setLogsPerPage] = useState(50);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const filterLogs = () => {
        if (!SysLogData || !Array.isArray(SysLogData)) {
            setFilteredLogs([]);
            return;
        } else {
            const filtered = SysLogData.filter((log) => {
                const logString = `${log.date} ${log.sourceip} ${log.source} ${log.program} ${log.host} ${log.facility} ${log.message}`.toLowerCase();
                const query = searchQuery.toLowerCase();
                const logDate = moment(log.date, "MMM D HH:mm:ss");
                const matchesQuery = logString.includes(query);
                const matchesDeviceId = log.sourceip === deviceId;

                if (startDate === null && endDate === null) {
                    return (searchQuery === "" || matchesQuery);
                } else if (startDate !== null && endDate !== null) {
                    const isAfterStartDate = logDate.isSameOrAfter(startDate);
                    const isBeforeEndDate = logDate.isSameOrBefore(endDate);
                    return (searchQuery === "" || matchesQuery) && isAfterStartDate && isBeforeEndDate;
                } else if (startDate !== null) {
                    const isAfterStartDate = logDate.isSameOrAfter(startDate);
                    return (searchQuery === "" || matchesQuery) && isAfterStartDate;
                } else {
                    const isBeforeEndDate = logDate.isSameOrBefore(endDate);
                    return (searchQuery === "" || matchesQuery) && isBeforeEndDate;
                }
            });
            setFilteredLogs(filtered);
        }
    };

    useEffect(() => {
        dispatch(getsyslogData());
    }, []);

    const SysLogData = useSelector((state) => {
        return state.TopologyLogsData?.getSysLogData?.eventList;
    });

    useEffect(() => {
        if (SysLogData?.length > 0) {
            setLoading(false);
            filterLogs();
        }
    }, [SysLogData, searchQuery, startDate, endDate]);

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <>
            <Container fluid className="mt-4">
                <Row>
                    <Col lg={12} className="mt-4">
                        <div className="mt-4"></div>
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">

                            <div className="d-flex justify-content-sm-end">
                                <div className="search-box ms-2 me-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Keyword"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <AiOutlineClear
                                            style={{
                                                cursor: "pointer",
                                                position: "absolute",
                                                top: "50%",
                                                right: "10px",
                                                transform: "translateY(-50%)",
                                                color: "gray",
                                            }}
                                            onClick={() => setSearchQuery("")}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive table-card mb-1 mt-4">
                            <table className="table table-bordered" id="syslogtable">
                                <thead align="center" className="table-light">
                                    <tr>
                                        {tableHeaders.map((header) => (
                                            <th key={header}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                {loading ? (
                                    <td colSpan={8}>
                                        <Loader />
                                    </td>
                                ) : (
                                    <tbody className="list form-check-all">
                                        {currentLogs.map((log, index) => (
                                            <tr key={index} className="hover-effect">
                                                <td align="center">{log?.date}</td>
                                                <td align="center">{log?.sourceip}</td>
                                                <td align="center">{log?.source}</td>
                                                <td align="center">{log?.priority}</td>
                                                <td align="center">{log?.program}</td>
                                                <td align="center">{log?.host}</td>
                                                <td align="center">{log?.facility}</td>
                                                <td align="center">{log?.message}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                        <Pagination className="mt-3">
                            <Pagination.First
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(1)}
                            />
                            <Pagination.Prev
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            />
                            {Array.from({ length: totalPages > 10 ? 10 : totalPages }).map(
                                (_, index) => {
                                    const pageNumber =
                                        (currentPage - 5 > 0
                                            ? currentPage - 5
                                            : 1) + index;
                                    return (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === currentPage}
                                            onClick={() => setCurrentPage(pageNumber)}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    );
                                }
                            )}
                            <Pagination.Next
                                disabled={currentPage === totalPages}
                                onClick={handleNextPage}
                            />
                            <Pagination.Last
                                disabled={currentPage === totalPages}
                                onClick={handleLastPage}
                            />
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SyslogyLogs_Logs_notification;
