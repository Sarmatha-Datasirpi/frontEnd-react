import moment from "moment";
import { React, useEffect, useState } from "react";
import Loader from "../../Components/Common/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Col, Pagination, Breadcrumb } from "react-bootstrap";
import { postdevicealarmeventdata } from "../../store/TopologyLogs/action";
import { AiOutlineClear } from "react-icons/ai";
import { TbHttpDelete } from "react-icons/tb";
import { FcDeleteDatabase } from "react-icons/fc";
import { TfiReload } from "react-icons/tfi";
import axios from "axios";
import { isEmpty } from "lodash";
import {
    UncontrolledTooltip,
    Tooltip
} from "reactstrap";
import { postlatestalarmeventdata } from "../../store/TopologyLogs/action";
import { DOMAIN, PROTOCOL, PORT_8081, PORT_8082 } from "../../helpers/url_helper";
import AlarmsConfigTab from "./Alarmsconfig/Alarm_Form_Table";
import SyslogyLogs_logs from "../DeviceManagement/";
const SyslogyLogs_alarms = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const tableHeaders = [
        "COMPONENT",
        "STATUS",
        "SEVERITY",
        "FIRSTEVENT",
        "LASTEVENT",
        "VALUE",
        "ACTION"
    ];
    const deviceId = useParams().id;
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage, setLogsPerPage] = useState(10);
    const [totalSize, setTotalSize] = useState(0);
    const [selectedComponent, setSelectedComponent] = useState("Alarms");
    const pagesToShow = 5;
    const pagesAroundCurrent = 2;

    const AlarmsEventsData = useSelector((state) => {
        return {
            alarmEventEntityList: state.TopologyLogsData.postdevicealarmsdata?.alarmEventEntityList,
            totalSize: state.TopologyLogsData.postdevicealarmsdata?.totalSize
        };
    });
    const SysLogData = AlarmsEventsData?.alarmEventEntityList;
    const handleComponentSelect = (component) => {
        setSelectedComponent(component);
    };
    useEffect(() => {
        dispatch(
            postdevicealarmeventdata({
                pageNo: currentPage,
                pageSize: logsPerPage,
                deviceId: deviceId,
                isLatest: false,
            })
        );
        dispatch(postlatestalarmeventdata({
            pageNo: currentPage,
            pageSize: 1000,
            isLatest: true
        }));
        setLoading(false);
    }, [dispatch, currentPage, logsPerPage, deviceId, totalSize]);


    useEffect(() => {
        if (AlarmsEventsData?.totalSize) {
            setTotalSize(AlarmsEventsData?.totalSize);
        }
    }, [AlarmsEventsData, SysLogData]);

    const totalPages = Math.ceil(totalSize / logsPerPage);
    const startIndex = (currentPage - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    const currentLogs = AlarmsEventsData?.alarmEventEntityList?.slice(startIndex, endIndex);

    const handlePagination = (pageNumber) => {
        if (pageNumber === "first") {
            setCurrentPage(1);
        } else if (pageNumber === "last") {
            setCurrentPage(totalPages);
        } else {
            setCurrentPage(pageNumber);
        }
    };
    const handleNext10Pages = () => {
        const next10Pages = Math.min(currentPage + 10, totalPages);
        setCurrentPage(next10Pages);
    };

    const handlePrev10Pages = () => {
        const prev10Pages = Math.max(currentPage - 10, 1);
        setCurrentPage(prev10Pages);
    };

    const DeleteAllAlarm = (deviceId, name) => {
        const requestBody = {
            deviceId: deviceId,
        };

        axios.delete(`${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`, { data: requestBody })
            .then((response) => {
                PostAlarmEvents()
            })
            .catch((error) => {
                PostAlarmEvents()
                console.error("DELETE request failed:", error);
            });
    };
    const DeleteParticularAlarm = (deviceId, name) => {
        const requestBody = {
            name: name,
            deviceId: deviceId,
        };

        axios.delete(`${PROTOCOL}://${DOMAIN}:${PORT_8081}/alarm/events`, { data: requestBody })
            .then((response) => {
                PostAlarmEvents();
            })
            .catch((error) => {
                console.error("DELETE request failed:", error);
                PostAlarmEvents();

            });
    };


    const PostAlarmEvents = async () => {
        dispatch(postdevicealarmeventdata({
            pageNo: currentPage,
            pageSize: 10,
            deviceId: deviceId,
            isLatest: false
        }));
        dispatch(postlatestalarmeventdata({
            pageNo: currentPage,
            pageSize: 1000,
            isLatest: true
        }));
    };

    const { user } = useSelector(state => ({
        user: state.Profile.user,
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
        usersDataList: state.Users?.usersDataList,
    }));


    const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
    const sessionUsername = sessionstoragedata?.username
    const currentUser = usersDataList.find((user) => user?.username === sessionUsername);
    const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");
    const startPage = Math.max(currentPage - pagesAroundCurrent, 1);
    const endPage = Math.min(currentPage + pagesAroundCurrent, totalPages);
    return (
        <>
            <Container fluid className="mt-4">
                <Row>
                    <Col lg={12} className="mt-4">

                        <div className="d-flex align-items-center w-100">
                            {/* <div>
                                <Breadcrumb>
                                    <Breadcrumb.Item >
                                        <div >Alarms</div>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item class={`nav-link ${selectedComponent === "Alarms Config" ? "active" : ""}`}

                                        onClick={() => handleComponentSelect("Alarms Config")}>
                                        <div >Alarms Config</div>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item class={`nav-link ${selectedComponent === "Logs" ? "active" : ""}`}

                                        onClick={() => handleComponentSelect("Logs")}>
                                        <div >Logs</div>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div> */}
                            <div className="d-flex flex-grow-1 justify-content-end align-items-center">
                                <div className="search-box ms-2 me-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            dispatch(postdevicealarmeventdata({
                                                pageNo: currentPage,
                                                pageSize: 10,
                                                isLatest: false,
                                                ...(e.target.value && { keyword: e.target.value }),
                                            }));
                                        }}
                                    />
                                    <i className="ri-search-line search-icon"></i>

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
                                <div className="d-flex gap-2">
                                    <div className="d-flex">
                                        <button
                                            id="refresh-alarms"
                                            className="btn btn-sm btn-success open-item-btn"
                                            style={{ width: "auto", minWidth: "100px", marginRight: "10px" }}
                                            onClick={() => PostAlarmEvents()}
                                        >
                                            < TfiReload style={{
                                                color: "white",
                                                width: 20,
                                                height: 20,
                                            }} />
                                        </button>
                                        <UncontrolledTooltip
                                            placement="bottom"
                                            target="refresh-alarms"
                                        >
                                            Refresh Alarms Data of This Devices
                                        </UncontrolledTooltip>
                                    </div>
                                    {isAdmin && (
                                        <div className="d-flex">
                                            <button
                                                id="delete-alarms"
                                                className="btn btn-sm btn-danger open-item-btn"
                                                style={{ width: "auto", minWidth: "100px", marginRight: "10px" }}
                                                onClick={() => DeleteAllAlarm(deviceId)}
                                            >
                                                <FcDeleteDatabase style={{
                                                    color: "white",
                                                    width: 20,
                                                    height: 20,
                                                }} />
                                            </button>
                                            <UncontrolledTooltip
                                                placement="bottom"
                                                target="delete-alarms"
                                            >
                                                Delete Alarms Data of All Devices
                                            </UncontrolledTooltip>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive table-card mb-1 mt-4">
                            <table className="table table-bordered" id="syslogtable">
                                <thead align="center" className="table-light">
                                    <tr>
                                        {tableHeaders.map((header) => (
                                            <th key={header}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                {loading ? (
                                    <td colSpan={8}>
                                        <Loader />
                                    </td>
                                ) : (
                                    <tbody className="list form-check-all">
                                        {currentLogs?.map((log, index) => {
                                            return (
                                                <tr key={index} className="hover-effect">
                                                    <td align="center">{log?.name}</td>
                                                    <td align="center">
                                                        <span
                                                            className={`badge ${log?.currentStatus?.toLowerCase() === "on" ? "bg-success" : "bg-danger"}`}
                                                        >
                                                            {log?.currentStatus}
                                                        </span>

                                                    </td>
                                                    <td align="center">
                                                        <span
                                                            className={`badge ${log?.severity?.toLowerCase() === "warning" ? "bg-warning" : "bg-success"}`}
                                                        >
                                                            {log?.severity}
                                                        </span>

                                                    </td>
                                                    <td align="center">{log?.firstEvent}</td>
                                                    <td align="center">{log?.lastEvent}</td>

                                                    <td align="center">{log?.value}</td>
                                                    <>
                                                        {isAdmin && (
                                                            <td className="d-flex justify-content-around align-items-center">
                                                                <div className="remove" style={{ marginLeft: '10px', marginRight: '10px' }}>
                                                                    <button
                                                                        id="delete_particular_alarm"
                                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#deleteRecordModal"
                                                                        onClick={() => DeleteParticularAlarm(log?.deviceId, log?.name)}
                                                                    >
                                                                        Del
                                                                    </button>
                                                                    <UncontrolledTooltip
                                                                        placement="bottom"
                                                                        target="delete_particular_alarm"
                                                                    >
                                                                        Delete This Alarm
                                                                    </UncontrolledTooltip>
                                                                </div>
                                                            </td>
                                                        )}
                                                    </>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                )}
                            </table>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Pagination>
                                <Pagination.First onClick={() => handlePagination("first")} />
                                <Pagination.Prev onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1} />

                                <Pagination.Item onClick={handlePrev10Pages}>-10</Pagination.Item>

                                {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                                    <Pagination.Item
                                        key={startPage + index}
                                        active={currentPage === startPage + index}
                                        onClick={() => handlePagination(startPage + index)}
                                    >
                                        {startPage + index}
                                    </Pagination.Item>
                                ))}

                                <Pagination.Item onClick={handleNext10Pages}>+10</Pagination.Item>

                                <Pagination.Next onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages} />
                                <Pagination.Last onClick={() => handlePagination("last")} />
                            </Pagination>

                        </div>
                    </Col>
                </Row>

            </Container>
            {/* <div>
                {selectedComponent === "Alarms Config" && <AlarmsConfigTab />}
                {selectedComponent === "Logs" && <SyslogyLogs_logs />}
            </div> */}
        </>
    );
};

export default SyslogyLogs_alarms;
