import moment from "moment";
import { React, useEffect, useState } from "react";
import Loader from "../../Components/Common/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Col, Pagination } from "react-bootstrap";
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
const Alarms_Config = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const deviceId = useParams().id;
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage, setLogsPerPage] = useState(10);
    const [totalSize, setTotalSize] = useState(0);
    const pagesToShow = 5; // Number of pages to show
    const pagesAroundCurrent = 2; // Number of pages around the current page

    const AlarmsEventsData = useSelector((state) => {
        return {
            alarmEventEntityList: state.TopologyLogsData.postdevicealarmsdata?.alarmEventEntityList,
            totalSize: state.TopologyLogsData.postdevicealarmsdata?.totalSize
        };
    });
    const SysLogData = AlarmsEventsData?.alarmEventEntityList;

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
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Alarms_Config;
