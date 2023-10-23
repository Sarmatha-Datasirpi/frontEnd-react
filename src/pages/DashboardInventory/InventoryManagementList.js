import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Badge,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

import add_device from "../../assets/images/docs/add_device.PNG";
import delete_devices from "../../assets/images/docs/delete_devices.PNG";
import manage_devices from "../../assets/images/docs/manage_devices.PNG";
import device_terminal from "../../assets/images/docs/device_terminal.PNG";
import device_status from "../../assets/images/docs/device_status.PNG";
import device_delete from "../../assets/images/docs/device_delete.PNG";
import register_unknown_device from "../../assets/images/docs/register_unknown_device.PNG";
import single_device_delete from "../../assets/images/docs/Single_Device_Delete_Button.png";
import multiple_device_delete from "../../assets/images/docs/selected_devices_delete_button.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { verifyLicenseKeyAction } from "../../store/actions";
import { AiTwotoneStar } from "react-icons/ai";
import { VscDebugConsole } from "react-icons/vsc";
import {
  RiDeleteBin5Fill,
  RiRestartLine,
  RiInformationFill,
} from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useParams } from "react-router-dom";
import List from "list.js";
//Import Flatepicker
import RebootModal from "./sonicRebootModal";
//redux
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  deleteDevicesData,
  getDevicesData,
  setDevicePollingInterval,
  setDeviceProcessInterval,
  setDevicePolling,
  getDevicePolling,
  registerDeviceaction,
  syslogDeviceaction,
} from "../../store/DevicesList/action";
import {ToastContainer} from "react-toastify";

import { InputGroup, Form,} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { getUserData } from "../../store/user/action";
import { DOMAIN, PROTOCOL, PORT_8081, DELETE_DEVICES_DATA } from "../../helpers/url_helper";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { postlatestalarmeventdata } from "../../store/TopologyLogs/action";
import Loader from "../../Components/Common/Loader";


const InventoryManagementList = (props) => {
  const [modal_list, setmodal_list] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(false);
  const [pollingIntervalVal, setPollingIntervalVal] = useState(0);
  const [processInterval, setProcessInterval] = useState(true);
  const [processIntervalVal, setProcessIntervalVal] = useState(0);
  const [showBtn, setShowBtn] = useState(true);
  const [deviceType, setDeviceType] = useState("S");
  const [deviceList, setDeviceList] = useState([]);
  const [unknownDeviceList, setUnknownDeviceList] = useState([]);
  const [deviceListSearch, setDeviceListSearch] = useState([]);
  const [checkedDevices, setCheckedDevices] = useState([]);
  const [checkedUnknownDevices, setCheckedUnknownDevices] = useState([]);
  const [deviceSettingModal, setDeviceSettingModal] = useState(false);
  const [pollingData, setPollingData] = useState([]);
  const [upsDowns, setupsDowns] = useState([]);
  const [knownupsDowns, setknownupsDowns] = useState([]);
  const [unknownupsDowns, setunknownupsDowns] = useState([]);
  const [syslogMgmtIP, setSyslogMgmtIP] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [isLicenseKeyChanged, setIsLicenseKeyChanged] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [UnknowncurrentPage, setUnknownCurrentPage] = useState(1);
  const [UnknowntotalCount, setUnknownTotalCount] = useState(0);
  const [unknownSearchQuery, setUnknownSearchQuery] = useState("");
  const [knownSearchQuery, setknownSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalKnownUpCount, setTotalKnownUpCount] = useState(0);
  const [totalKnownDownCount, setTotalKnownDownCount] = useState(0);
  const [totalUNKnownUpCount, setTotalUNKnownUpCount] = useState(0);
  const [totalUNKnownDownCount, setTotalUNKnownDownCount] = useState(0);

  const deviceId = useParams().id;
  const dispatch = useDispatch();
  const history = useNavigate();
  const tog_list = () => {
    setmodal_list(!modal_list);
  };
  const tableRef = useRef(null);

  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const options = {
        valueNames: [
          "device_ip",
          "vendor",
          "os_version",
          "mac_address",
          "model",
          "state",
        ],
        item: '<tr class="list-item"><td></td></tr>',
      };

      new List(tableRef.current, options);
    }
  }, [deviceList]);
  const [showUnknownTable, setShowUnknownTable] = useState(false);
  const [rebootModalOpen, setrebootModalOpen] = useState(false);
  const [rebootingDeviceId, setRebootingDeviceId] = useState(null);
  const [modalINS, setModalINS] = useState(false);

  const toggle = () => setModalINS(!modalINS);

  const handleRebootButton = (item) => {
    setRebootingDeviceId(item);
    setrebootModalOpen(true);
  };
  const handleRebootOpenModal = (deviceId) => {
    setRebootingDeviceId(deviceId);
    setrebootModalOpen(true);
  };
  const handleRebootCloseModal = () => {
    setRebootingDeviceId(null);
    setrebootModalOpen(false);
  };

  const toggleAccordion = () => {
    setShowUnknownTable(!showUnknownTable);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };

  const deviceManagementForm = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      ipAddress: "",
      startIpAddress: "",
      endIpAddress: "",
      username: "",
      password: "",
      endIpAddress: "",
    },
    validationSchema: Yup.object({
      ipAddress: Yup.string().required("Please Enter IP Address"),
    }),
    onSubmit: (values) => {
      // dispatch(userForgetPassword(values, props.history));
    },
  });

  const handleChange = (event) => {
    setDeviceType(event.target.value);
  };
  const token = JSON.parse(sessionStorage.getItem("authUser"))
    ? JSON.parse(sessionStorage.getItem("authUser")).token
    : null;

  const handleSubmit = (event) => {
    setShowBtn(false);
    event.preventDefault();
    let formData;
    if (event.target.elements["device-type-field"].value === "S") {
      formData = {
        ipAddress: event.target.elements["ip-address-field"].value,
        username: event.target.elements["username"].value,
        password: event.target.elements["password"].value,
        licenseKey: event.target.elements["License Key"].value,
      };
    } else if (event.target.elements["device-type-field"].value === "M") {
      formData = {
        startIp: event.target.elements["start-ip-field"].value,
        endIp: event.target.elements["end-ip-field"].value,
        username: event.target.elements["username"].value,
        password: event.target.elements["password"].value,
        licenseKey: event.target.elements["License Key"].value,
      };
    }

    setIsLoading(true);
    setDeviceList([]);
    fetch(`${PROTOCOL}://${DOMAIN}:${PORT_8081}/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then(() => {
      setmodal_list(false);
      setTimeout(() => {

        setIsLoading(true);
        fetchDevices();
        fetchUnknownDevices();
        setIsLoading(false);
      }, 3000);
    });
  };

  const fetchDevices = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        pageNo: currentPage,
        pageSize: 10,
        sortBy: "deviceId",
        sortOrder: "ASC",
        deviceId: knownSearchQuery === "" ? null : knownSearchQuery,
      };

      setDeviceList([]);

      const response = await axios.post(
        `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/list`,
        requestBody
      );

      setDeviceList(response?.deviceListResponseDTO);
      console.log(response);
      setTotalCount(response?.totalSize);
      setTotalKnownUpCount(response?.reachableCount);
      setTotalKnownDownCount(response?.unreachableCount);
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
    setIsLoading(false);
  };

  const fetchUnknownDevices = async () => {
    setIsLoading(true);
    setCheckedUnknownDevices([])
    try {
      const requestBody = {
        pageNo: UnknowncurrentPage,
        pageSize: 10,
        sortBy: "deviceId",
        sortOrder: "ASC",
        deviceId: unknownSearchQuery === "" ? null : unknownSearchQuery,
      };
      setUnknownDeviceList([]);
      const response = await axios.post(
        `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/unknown/list`,
        requestBody
      );
      setUnknownDeviceList(response?.deviceListResponseDTO);
      setUnknownTotalCount(response?.totalSize);
      setTotalUNKnownUpCount(response?.reachableCount);
      setTotalUNKnownDownCount(response?.unreachableCount);
    } catch (error) {
      console.error("Error fetching device data:", error);
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

  const handleUnknownPagination = (pageNumber) => {
    setUnknownCurrentPage(pageNumber);
  };

  const handleUnknownPreviousPage = () => {
    setUnknownCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleUnknownNextPage = (e) => {
    setUnknownCurrentPage((prevPage) =>
      Math.min(prevPage + 1, UnknownTotalPages)
    );
  };

  const UnknownTotalPages = Math.ceil(UnknowntotalCount / 10);

  useEffect(() => {
    fetchDevices();
    fetchUnknownDevices();
    dispatch(getDevicePolling());
  }, [UnknowncurrentPage, currentPage]);

  const deleteDevicesById = () => { };

  const deleteDevices = async (deviceId) => {
    setTotalCount(10);
    setIsLoading(true);

    setUnknownDeviceList([]);


    await dispatch(deleteDevicesData([deviceId]));

    // dispatch(getDevicesData());
    const fetchAndReset = async () => {
      setIsLoading(true);
      setDeviceList([]);

      await fetchDevices();
      setIsLoading(false);
      setUnknownDeviceList([]);
      await fetchUnknownDevices();
    };

    // Perform async tasks after dispatches
    setTimeout(fetchAndReset, 4000);
  };
  const deleteAllKnown = async () => {

    setTotalCount(10);
    setIsLoading(true);
    setDeviceList([]);
    await dispatch(deleteDevicesData(checkedDevices));
    //dispatch(getDevicesData());

    const fetchAndReset = async () => {

      setIsLoading(true);
      setDeviceList([]);
      await fetchDevices();
      setCheckedDevices([]);
      setIsLoading(false);
      setDeviceList([]);
     await fetchDevices();
    
    };
    //Perform async tasks after dispatches
    setTimeout(fetchAndReset, 4000);
  };



const deleteAll = async () => {

    setTotalCount(10);
    setIsLoading(true);
    setUnknownDeviceList([]);
    await dispatch(deleteDevicesData(checkedUnknownDevices));
    //dispatch(getDevicesData());

    const fetchAndReset = async () => {

      setIsLoading(true);
      setDeviceList([]);
      await fetchDevices();
      setCheckedUnknownDevices([]);
      setIsLoading(false);
      setUnknownDeviceList([]);
     await fetchUnknownDevices();
    
    };
    //Perform async tasks after dispatches
    setTimeout(fetchAndReset, 4000);
  };


  // const onEditRules = async (id) => {
  //   setOnegetRule_red();
  //   let mapID = props?.mapId
  //   const apiUrl = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/rule/id`;

  //   const requestData = {
  //     mapId: mapID,
  //     ruleId: id.toString(),
  //     deviceId: deviceIpAddress,
  //   };

  //   axios.post(apiUrl, requestData)
  //     .then(response => {

  //       mapID = null;
  //       setOnegetRule_red(response)
  //     })
  //     .catch(error => {
  //       console.error('API error:', error);
  //     });
  // };

  //const deleteAll = async () => {

    // const payload = { deviceId: checkedUnknownDevices }
    // console.log("Device Delete", payload)
    // const apiUrl = DELETE_DEVICES_DATA;
    // axios.delete(apiUrl, payload)
    //   .then(response => {

    //     consoleurl.log("DELETE ALL RESPONSE :", response)
    //   })
    //   .catch(error => {
    //     console.error('API error:', error);
    //   });


    //   const deldev = "172.1.1.122";
    //   try{
    //   const deviceDeleteResponse= await axios.delete(
    //     DELETE_DEVICES_DATA,
    //     {
    //       "deviceId": [
    //           "172.1.1.127"
    //       ]
    //   }
    //     );
    //     if (deviceDeleteResponse.statusCode === 200) {

    //       toast.success(deviceDeleteResponse.data.message, {
    //           autoClose: 3000 // Display for 3 seconds
    //       });
    //   } else {
    //       toast.error("An error occurred while configuring the map.", {
    //           autoClose: 3000 // Display for 3 seconds
    //       });
    //   }
    // } catch (error) {
    //   console.error("An error occurred while making the request:", error);

    // }



    //   const result =await dispatch(deleteDevicesData(checkedUnknownDevices));
    // //   //console.log(result);
    // //   // dispatch(getDevicesData());
    //   const fetchAndReset = async () => {
    //     setIsLoading(true);
    //     setDeviceList([]);

  //       await fetchDevices();
  //       setCheckedUnknownDevices([]);
  //       setIsLoading(false);
  //       setUnknownDeviceList([]);
  //       await fetchUnknownDevices();
  //   };

  //   // Perform async tasks after dispatches
  //   setTimeout(fetchAndReset, 4000);

  // }




  const RegisterDevices = async (deviceId) => {
    setUnknownTotalCount(10);
    // Clear the list immediately
    setUnknownDeviceList([]);

    // Dispatch actions synchronously
    await dispatch(registerDeviceaction(deviceId));
    dispatch(getDevicesData());

    // Use local variables to manage async tasks
    const fetchAndReset = async () => {
      await fetchDevices();
      await fetchUnknownDevices();
    };

    // Perform async tasks after dispatches
    setTimeout(fetchAndReset, 4000);
  };

  const filteredDevicesList = useSelector(
    (state) => state.DevicesListData.getDevicesData
  );

  const pollingValue = useSelector(
    (state) => state.DevicesListData.devicePolling
  );
  const LicenseKeyStatus = useSelector(
    (state) => state.DevicesListData?.LicenseKeyStatus?.statusCode
  );

  const handleVerifyChange = (event) => {
    setLicenseKey(event.target.value);
    setIsLicenseKeyChanged(true);
  };

  const handleVerify = (event) => {
    dispatch(
      verifyLicenseKeyAction({ deviceId: deviceId, license: licenseKey })
    );
  };
  useEffect(() => {
    let key = "statusCode";
    if (
      Object.prototype.hasOwnProperty.call(pollingValue, key) &&
      pollingValue.statusCode === 200
    ) {
      dispatch(getDevicePolling());
      setPollingData(pollingValue[0]);
    } else {
      setPollingData(pollingValue[0]);
    }
  }, [pollingValue]);

  useEffect(() => {
    setDeviceList(filteredDevicesList);
  }, [filteredDevicesList]);

  // useEffect(() => {
  //   let key = "status";
  //   if (
  //     Object.prototype.hasOwnProperty.call(deviceList, key) &&
  //     deviceList.status === 500
  //   ) {
  //     setupsDowns([[0], [0]]);
  //   } else {
  //     setupsDowns([
  //       deviceList?.filter((device) => device?.status == "Reachable" && device?.osVersion !== "unknown" && device?.osVersion !== null && device?.osVersion !== ""),
  //       deviceList?.filter((device) => device?.status != "Reachable" && device?.osVersion !== "unknown" && device?.osVersion !== null && device?.osVersion !== ""),
  //     ]);
  //   }
  // }, [deviceList]);
  useEffect(() => {
    dispatch(
      postlatestalarmeventdata({
        pageNo: 1,
        pageSize: 1000,
        isLatest: true,
      })
    );

    const dispatchAfter3Seconds = setTimeout(() => {
      dispatch(getUserData());
      dispatch(
        postlatestalarmeventdata({
          pageNo: 1,
          pageSize: 1000,
          isLatest: true,
        })
      );
    }, 3000);

    const dispatchAfter5Seconds = setTimeout(() => {
      dispatch(getUserData());
      dispatch(
        postlatestalarmeventdata({
          pageNo: 1,
          pageSize: 1000,
          isLatest: true,
        })
      );
    }, 5000);

    return () => {
      clearTimeout(dispatchAfter3Seconds);
      clearTimeout(dispatchAfter5Seconds);
    };
  }, [dispatch]);

  useEffect(() => {
    let key = "status";
    if (
      Object.prototype.hasOwnProperty.call(deviceList, key) &&
      deviceList.status === 500
    ) {
      setknownupsDowns([[0], [0]]);
    } else {
      setknownupsDowns([
        deviceList?.filter(
          (device) =>
            device?.status == "Reachable" &&
            device?.osVersion.toLowerCase() !== "unknown" &&
            device?.osVersion !== null &&
            device?.osVersion !== ""
        ),
        deviceList?.filter(
          (device) =>
            device?.status != "Reachable" &&
            device?.osVersion.toLowerCase() !== "unknown" &&
            device?.osVersion !== null &&
            device?.osVersion !== ""
        ),
      ]);
    }
  }, [deviceList]);

  useEffect(() => {
    let key = "status";
    if (
      Object.prototype.hasOwnProperty.call(deviceList, key) &&
      deviceList.status === 500
    ) {
      setunknownupsDowns([[0], [0]]);
    } else {
      setunknownupsDowns([
        unknownDeviceList?.filter(
          (device) =>
            device?.status == "Reachable" &&
            (device?.osVersion.toLowerCase() === "unknown" ||
              device?.osVersion === null ||
              device?.osVersion === "")
        ),
        unknownDeviceList?.filter(
          (device) =>
            device?.status != "Reachable" &&
            (device?.osVersion.toLowerCase() === "unknown" ||
              device?.osVersion === null ||
              device?.osVersion === "")
        ),
      ]);
    }
  }, [deviceList]);

  const searchByDeviceId = (val) => {
    if (!val) {
      setDeviceList(deviceListSearch);
    } else {
      setDeviceList(
        deviceListSearch?.filter((device) => device?.deviceId.includes(val))
      );
    }
  };
  var consoleurl = "http://127.0.0.1:2222/ssh/host/";

  const updatePollingInterval = (e) => {
    dispatch(setDevicePollingInterval(pollingData?.devicePollingInterval));
    let pollingResData = {
      devicePollingId: pollingData?.id,
      devicePollingInterval: pollingData?.devicePollingInterval,
      devicePollingProcessInterval: pollingData?.deviceProcessPollingInterval,
      syslogId: pollingData?.syslogId,
    };
    dispatch(setDevicePolling(pollingResData));
    setDeviceSettingModal(false);
  };

  const updateProcessInterval = (e) => {
    dispatch(
      setDeviceProcessInterval(pollingData?.deviceProcessPollingInterval)
    );
    let procesResData = {
      devicePollingId: pollingData?.id,
      devicePollingInterval: pollingData?.devicePollingInterval,
      devicePollingProcessInterval: pollingData?.deviceProcessPollingInterval,
      syslogId: pollingData?.syslogId,
    };
    dispatch(setDevicePolling(procesResData));
    setDeviceSettingModal(false);
  };

  const handleDeviceSettingModal = () => {
    setDeviceSettingModal(true);
  };

  const handleSyslogChange = (event) => {
    setSyslogMgmtIP(event.target.value);
  };

  const SyslogMgmtIP = () => {
    dispatch(syslogDeviceaction(syslogMgmtIP));
  };

  const knownOsDevices = deviceList.filter(
    (device) =>
      device.osVersion.toLowerCase() !== "unknown" &&
      device.osVersion !== null &&
      device.osVersion !== ""
  );
  const totalKnownOsDevices = knownOsDevices.length;
  const unknownOsDevices = deviceList.filter(
    (device) =>
      device.osVersion === null ||
      device.osVersion === "" ||
      device.osVersion.toLowerCase() === "unknown"
  );
  const totalUnknownOsDevices = unknownDeviceList.totalSize;

  const { usersDataList } = useSelector((state) => ({
    usersDataList: state?.Users?.usersDataList,
  }));

  const { user } = useSelector((state) => ({
    user: state?.Profile?.user,
  }));

  const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
  const sessionUsername = sessionstoragedata?.username;

  const currentUser = usersDataList?.find(
    (user) => user?.username === sessionUsername
  );

  const isAdmin = sessionstoragedata?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));

      if (user && !isEmpty(user)) {
        obj.data.username = user.username;
        sessionStorage.removeItem("authUser");
        sessionStorage.setItem("authUser", JSON.stringify(obj));

        setUserId(obj.id);
        setUserName(obj.username);
        setRole(obj.roles);
      }
    }
  }, [user]);

  function isEmpty(obj) {
    return obj == null || Object.keys(obj).length === 0;
  }
  const checkAllUnknown = (e) => {
    setCheckedUnknownDevices([]);
    if (e.target.checked) {
      const deviceList1 = unknownDeviceList.map((unknownDevices) => unknownDevices.deviceId);
      setCheckedUnknownDevices(deviceList1);
    }
  };
  const checkAllKnown = (e) => {
    setCheckedDevices([]);
    if (e.target.checked) {
      const deviceList1 = deviceList.map((knownDevices) => knownDevices.deviceId);
      setCheckedDevices(deviceList1);
    }
  };

  const handleInputChange = (e) => {
    setUnknownSearchQuery(e.target.value);
    handleKnownSearchClick();
  };
  const handleknownInputChange = (e) => {
    setknownSearchQuery(e.target.value);
  };
  useEffect(() => {
    handleKnownSearchClick();
  }, [knownSearchQuery]);
  //knownSearchQuery
  const handleSearchClick = () => {
    fetchUnknownDevices();
  };

  const handleKnownSearchClick = () => {
    fetchDevices();
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      handleSearchClick();
    }
  };
  const handleKnownEnterKey = (e) => {
    if (e.keyCode === 13) {
      handleKnownSearchClick();
    }
  };
  // Pagination Related things
  const maxVisiblePages = 5;
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(
      1,
      UnknowncurrentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(UnknownTotalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

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
      const rightEllipsis =
        currentPage < pageNumbers.length - maxVisiblePages / 2;

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
            <Pagination.Item
              onClick={() => handlePagination(pageNumbers.length)}
            >
              {pageNumbers.length}
            </Pagination.Item>
          </>
        );
      } else if (!rightEllipsis) {
        const visiblePages = pageNumbers.slice(-maxVisiblePages + 1);
        return (
          <>
            <Pagination.Item onClick={() => handlePagination(1)}>
              1
            </Pagination.Item>
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
        const startPage = Math.max(
          1,
          currentPage - Math.floor(maxVisiblePages / 2)
        );
        const endPage = Math.min(
          pageNumbers.length,
          startPage + maxVisiblePages - 1
        );
        return (
          <>
            <Pagination.Item onClick={() => handlePagination(1)}>
              1
            </Pagination.Item>
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
            <Pagination.Item
              onClick={() => handlePagination(pageNumbers.length)}
            >
              {pageNumbers.length}
            </Pagination.Item>
          </>
        );
      }
    }
  };

  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <div className="fs-18 mb-1">
                <span
                  style={{
                    position: "absolute",
                    marginTop: "28px",
                    fontSize: "14px", // Increased font size to 14px
                    fontWeight: "bold", // Added font weight to make it bold
                    color: "#777777",
                  }}
                >
                  Network Devices running Disaggregated Packet Broker{" "}
                  <RiInformationFill
                    color="danger"
                    size={24}
                    onClick={toggle}
                  />{" "}
                  {/* Increased icon size to 24 */}
                </span>
                Total Devices ({totalCount}){" "}
                <Badge color="success" id="reachabledevice">
                  {totalKnownUpCount} <i className="ri-arrow-up-line"></i>
                </Badge>
                <UncontrolledTooltip
                  placement="bottom"
                  target="reachabledevice"
                >
                  Reachable Devices
                </UncontrolledTooltip>
                &nbsp;
                <Badge color="danger" id="unreachabledevices">
                  {totalKnownDownCount} <i className="ri-arrow-down-line"></i>
                </Badge>
                <UncontrolledTooltip
                  placement="bottom"
                  target="unreachabledevices"
                >
                  Unreachable Devices
                </UncontrolledTooltip>{" "}
              </div>
            </div>

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
                            value={knownSearchQuery}
                            onKeyDown={handleKnownEnterKey}
                            onChange={handleknownInputChange}
                          // onInput={handleknownInputChange}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                      <UncontrolledTooltip
                        placement="bottom"
                        target="searchdevicelist"
                      >
                        Search Device IP Address
                      </UncontrolledTooltip>
                    </Col>
                  </div>
                  <>
                    {isAdmin && (
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => {
                            setShowBtn(true);
                            tog_list();
                          }}
                          id="addnewdevices"
                        >
                          <i className="ri-add-circle-line align-middle me-1"></i>{" "}
                          Add Device
                        </button>
                        <UncontrolledTooltip
                          placement="bottom"
                          target="addnewdevices"
                        >
                          Add New Devices
                        </UncontrolledTooltip>
                      </div>
                    )}
                  </>
                  {/* <>
                    {isAdmin && (
                      <div
                        className="col-auto"
                        onClick={() => handleDeviceSettingModal()}
                      >
                        <i
                          class="ri-settings-3-line fs-3 bg-warning rounded p-2"
                          id="deviceSetting"
                        ></i>
                        <UncontrolledTooltip
                          placement="bottom"
                          target="deviceSetting"
                        >
                          Device Setting
                        </UncontrolledTooltip>
                      </div>
                    )}
                  </> */}
                  <>
                    {isAdmin && (
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-danger btn-icon waves-effect waves-light layout-rightside-btn"
                          onClick={deleteAllKnown}
                          id="deletedevices"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                        <UncontrolledTooltip
                          placement="bottom"
                          target="deletedevices"
                        >
                          Delete Devices
                        </UncontrolledTooltip>
                      </div>
                    )}
                  </>
                  {/* Hidden for demo purpose only */}
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-primary btn-icon waves-effect waves-light layout-rightside-btn"
                      onClick={() => fetchDevices()}
                      id="tooltipBottom"
                    >
                      <i className="ri-refresh-line"></i>
                    </button>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="tooltipBottom"
                    >
                      Refresh
                    </UncontrolledTooltip>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            {/* <CardHeader>
              <h4 className="card-title mb-0">Inventory Management</h4>
              <Row className="g-3 mb-0 align-items-center">
                <div className="col-sm-auto">
                  <div className="input-group">
                    <Flatpickr
                      className="form-control border-0 dash-filter-picker shadow"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                        defaultDate: ["01 Jan 2022", "31 Jan 2022"],
                      }}
                    />
                    <div className="input-group-text bg-primary border-primary text-white">
                      <i className="ri-calendar-2-line"></i>
                    </div>
                  </div>
                </div>
                <div className="col-auto"></div>

                <div className="col-auto">
                  <Col className="col-sm">
                    <div className="d-flex justify-content-sm-end">
                      <div className="search-box ms-2">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </div>
                  </Col>
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => tog_list()}
                    id="addnewdevices"
                  >
                    <i className="ri-add-circle-line align-middle me-1"></i> Add
                    Device
                  </button>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="addnewdevices"
                  >
                    Add New Devices
                  </UncontrolledTooltip>
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-danger btn-icon waves-effect waves-light layout-rightside-btn"
                    onClick={props.rightClickBtn}
                    id="deletedevices"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="deletedevices"
                  >
                    Delete Devices
                  </UncontrolledTooltip>
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-primary btn-icon waves-effect waves-light layout-rightside-btn"
                    onClick={props.rightClickBtn}
                    id="tooltipBottom"
                  >
                    <i className="ri-refresh-line"></i>
                  </button>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="tooltipBottom"
                  >
                    Refresh
                  </UncontrolledTooltip>
                </div>
              </Row>
            </CardHeader> */}

            <CardBody>
              <div id="deviceList">
                {/* <Row className="g-4 mb-3">
                  <Col className="col-sm-auto">
                    <div>
                      <Button
                        color="success"
                        className="add-btn me-1"
                        onClick={() => tog_list()}
                        id="create-btn"
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                      </Button>
                      <Button
                        className="btn btn-soft-danger"
                        // onClick="deleteMultiple()"
                      >
                        <i className="ri-delete-bin-2-line"></i>
                      </Button>
                    </div>
                  </Col>
                  <Col className="col-sm">
                    <div className="d-flex justify-content-sm-end">
                      <div className="search-box ms-2">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </div>
                  </Col>
                </Row> */}

                <div className="table-responsive table-card p-2 mb-1">
                  <Table
                    className="table align-middle table-nowrap"
                    ref={tableRef}
                  >
                    <thead className="table-light">
                      <tr>
                        <th scope="col" style={{ width: "50px" }}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkAll"
                              value="option"
                              checked={
                                deviceList.length===
                                checkedDevices.length
                              }
                              onClick={(e)=> checkAllKnown(e)}
                            />
                          </div>
                        </th>
                        <th className="sort" data-sort="device_ip">
                          Node IP
                        </th>
                        <th className="sort" data-sort="vendor">
                          Vendor
                        </th>
                        <th className="sort" data-sort="os_version">
                          OS
                        </th>
                        <th className="sort" data-sort="mac_address">
                          MAC Address
                        </th>
                        <th className="sort" data-sort="model">
                          Model
                        </th>
                        <th className="sort" data-sort="os_version">
                          System Info
                        </th>
                        <th className="sort" data-sort="state">
                          State
                        </th>

                        <th className="action">Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {isLoading ? ( // Check if isLoading is true
                        <tr>
                          <td colSpan="8" className="text-center">
                            <Loader />
                          </td>
                        </tr>
                      ) : (
                        deviceList?.map((item, index) => {
                          // if (item.osVersion && item.osVersion.toString().toLowerCase() === "unknown")
                          if (
                            item?.osVersion &&
                            item.osVersion.toString().toLowerCase() !==
                            "unknown"
                          ) {
                            return (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value={item.deviceId}
                                      checked={checkedDevices.includes(item.deviceId)}
                                      onChange={(event) => {
                                        setCheckedDevices((dvs) => {
                                          return dvs.includes(
                                            event.target.value
                                          )
                                            ? dvs.filter((device) => {
                                              return (
                                                device !== event.target.value
                                              );
                                            })
                                            : [
                                              ...checkedDevices,
                                              event.target.value,
                                            ];
                                        });
                                        deleteDevicesById();
                                      }}
                                    />
                                  </div>
                                </th>
                                <td className="device_ip">{item?.deviceId}</td>
                                <td className="vendor">
                                  {item.osVersion === "sonic" ? (
                                    <>{item?.systemInfo?.vendorName}</>
                                  ) : (
                                    item?.systemInfo?.vendor
                                  )}
                                </td>
                                <td className="os_version">
                                  {item?.osVersion}
                                </td>
                                <td className="mac_address">
                                  {item.osVersion === "sonic" ? (
                                    <>
                                      {item?.systemInfo?.baseMacAddress}{" "}
                                      {item?.macAddress}
                                    </>
                                  ) : (
                                    item?.systemInfo?.mac
                                  )}
                                </td>
                                <td className="model">
                                  {item?.systemInfo?.["platformName"]}
                                </td>
                                <td className="sys_info">{item?.osVersion}</td>
                                <td className="state">
                                  {item?.status.toLowerCase() ===
                                    "reachable" ? (
                                    <>
                                      <Badge
                                        color="success"
                                        id="reachabledevice_1234"
                                        style={{ fontSize: "14px" }}
                                      >
                                        <i className="ri-arrow-up-line"></i>
                                      </Badge>
                                      {/* <UncontrolledTooltip placement="bottom" target="reachabledevice_1234">
                                      Device is reachable
                                    </UncontrolledTooltip> */}
                                    </>
                                  ) : (
                                    <>
                                      <Badge
                                        color="danger"
                                        id="unreachabledevice_1234"
                                        style={{ fontSize: "14px" }}
                                      >
                                        <i className="ri-arrow-down-line"></i>
                                      </Badge>{" "}
                                      {/* <UncontrolledTooltip placement="bottom" target="unreachabledevice_1234">
                                      Device is unreachable
                                    </UncontrolledTooltip> */}
                                    </>
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                        id="viewdeviceinfo343"
                                        onClick={() => {
                                          history(
                                            `/device/${item?.deviceId}/${item?.osVersion}`
                                          );
                                        }}
                                      >
                                        Manage
                                      </button>
                                      <UncontrolledTooltip
                                        placement="bottom"
                                        target="viewdeviceinfo343"
                                      >
                                        Manage Device
                                      </UncontrolledTooltip>
                                    </div>
                                    <>
                                      {isAdmin && (
                                        <div
                                          className="console"
                                          id="console897"
                                        >
                                          <Link
                                            to={consoleurl + item?.deviceId}
                                            target="_blank"
                                          >
                                            <button
                                              className="btn btn-sm btn-warning open-item-btn"
                                            // onClick={openConsoleTab}
                                            >
                                              <VscDebugConsole
                                                style={{
                                                  color: "white",
                                                  width: 20,
                                                  height: 20,
                                                }}
                                              />
                                            </button>
                                          </Link>
                                          <UncontrolledTooltip
                                            placement="bottom"
                                            target="console897"
                                          >
                                            Open console
                                          </UncontrolledTooltip>
                                        </div>
                                      )}
                                    </>
                                    <>
                                      {isAdmin && (
                                        <div>
                                          {item.osVersion === "sonic" && (
                                            <div
                                              className="reboot"
                                              id="reboot-div"
                                            >
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-info open-item-btn"
                                                onClick={() => {
                                                  handleRebootButton(
                                                    item.deviceId
                                                  );
                                                }}
                                              >
                                                <RiRestartLine
                                                  style={{
                                                    color: "white",
                                                    width: 20,
                                                    height: 20,
                                                  }}
                                                />
                                              </button>
                                              <UncontrolledTooltip
                                                placement="bottom"
                                                target="reboot-div"
                                              >
                                                Reboot Device
                                              </UncontrolledTooltip>
                                            </div>
                                          )}
                                          {rebootModalOpen && (
                                            <RebootModal
                                              onClose={handleRebootCloseModal}
                                              rebootingDevice={
                                                rebootingDeviceId
                                              }
                                            />
                                          )}
                                        </div>
                                      )}
                                    </>
                                    <>
                                      {isAdmin && (
                                        <div className="remove">
                                          <button
                                            className="btn btn-sm btn-danger remove-item-btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteRecordModal"
                                            onClick={() =>
                                              deleteDevices(item.deviceId)
                                            }
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
                                      )}
                                    </>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })
                      )}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-end">
                    <Pagination>
                      <Pagination.Prev
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Pagination.Prev>
                      {renderPageNumbers()}
                      <Pagination.Next
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
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
            </CardBody>
          </Card>
        </Col>
      </Row>

      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-header" onClick={toggleAccordion}>
            <h5 className="accordion-header" id="panelsStayOpen-headingOne">
              <button
                className={`accordion-button ${showUnknownTable ? "collapsed" : ""
                  }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded={showUnknownTable ? "true" : "false"}
                aria-controls="panelsStayOpen-collapseOne"
                style={{ background: "#ffffff" }}
                id="unknowndevice123"
              >
                Unknown Devices
              </button>
            </h5>
          </div>
          {showUnknownTable && (
            <div className="ms-3 mt-2">
              <div className="accordion-panel">
                <Row>
                  <Row className="mb-3 pb-1">
                    <Col xs={7}>
                      <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                          <div className="fs-18 mb-1">
                            Total Devices({UnknowntotalCount}){" "}
                            <Badge color="success" id="reachabledevice">
                              {totalUNKnownUpCount}{" "}
                              <i className="ri-arrow-up-line"></i>
                            </Badge>
                            {/* <UncontrolledTooltip
                            placement="bottom"
                            target="reachabledevice"
                          >
                            Reachable Devices
                          </UncontrolledTooltip> */}
                            &nbsp;
                            <Badge color="danger" id="unreachabledevices">
                              {totalUNKnownDownCount}{" "}
                              <i className="ri-arrow-down-line"></i>
                            </Badge>
                            {/* <UncontrolledTooltip
                            placement="bottom"
                            target="unreachabledevices"
                          >
                            Unreachable Devices
                          </UncontrolledTooltip>{" "} */}
                          </div>
                        </div>

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
                                        value={unknownSearchQuery}
                                        onKeyDown={handleEnterKey}
                                        onChange={handleInputChange}
                                      />
                                      <i className="ri-search-line search-icon"></i>
                                    </div>
                                  </div>
                                  <UncontrolledTooltip
                                    placement="bottom"
                                    target="searchdevicelist"
                                  >
                                    Search Device IP Address
                                  </UncontrolledTooltip>
                                </Col>
                              </div>
                              <div className="col-auto">
                                <button
                                  type="button"
                                  className="btn btn-danger btn-icon waves-effect waves-light layout-rightside-btn"
                                  onClick={deleteAll}
                                  id="deletedevices"
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                                <ToastContainer/>
                                <UncontrolledTooltip
                                  placement="bottom"
                                  target="deletedevices"
                                >
                                  Delete Devices
                                </UncontrolledTooltip>
                              </div>
                              <div className="col-auto">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-icon waves-effect waves-light layout-rightside-btn"
                                  onClick={() => fetchUnknownDevices()}
                                  id="tooltipBottom"
                                >
                                  <i className="ri-refresh-line"></i>
                                </button>
                                <UncontrolledTooltip
                                  placement="bottom"
                                  target="tooltipBottom"
                                >
                                  Refresh
                                </UncontrolledTooltip>
                              </div>
                            </Row>
                          </form>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col lg={7}>
                    <Card>
                      <CardBody>
                        <div id="deviceList">
                          <div className="table-responsive table-card p-2 mb-1">
                            <table
                              className="table align-middle table-nowrap"
                              ref={tableRef}
                            >
                              <thead className="table-light">
                                <tr>
                                  <th scope="col" style={{ width: "50px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                        checked={
                                          unknownDeviceList.length ===
                                          checkedUnknownDevices.length
                                        }
                                        onClick={(e) => checkAllUnknown(e)}
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="device_ip">
                                    Node IP
                                  </th>
                                  <th className="sort" data-sort="state">
                                    State
                                  </th>
                                  {isAdmin && (
                                    <th className="sort" data-sort="action">
                                      Action
                                    </th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {isLoading ? (
                                  <tr>
                                    <td colSpan="4">
                                      <Loader />
                                    </td>{" "}
                                    {/* Render a loading message */}
                                  </tr>
                                ) : (
                                  unknownDeviceList?.map((item, index) => {
                                    if (
                                      item.osVersion &&
                                      item.osVersion
                                        .toString()
                                        .toLowerCase() === "unknown"
                                    ) {
                                      return (
                                        <tr key={index}>
                                          <th scope="row">
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="chk_child"
                                                value={item.deviceId}
                                                checked={checkedUnknownDevices.includes(
                                                  item.deviceId
                                                )}
                                                onChange={(event) => {
                                                  setCheckedUnknownDevices(
                                                    (dvs) => {
                                                      return dvs.includes(
                                                        event.target.value
                                                      )
                                                        ? dvs.filter(
                                                          (device) => {
                                                            return (
                                                              device !==
                                                              event.target
                                                                .value
                                                            );
                                                          }
                                                        )
                                                        : [
                                                          ...checkedUnknownDevices,
                                                          event.target.value,
                                                        ];
                                                    }
                                                  );
                                                  deleteDevicesById();
                                                }}
                                              />
                                            </div>
                                          </th>
                                          <td
                                            style={{ fontSize: "15px" }}
                                            className="device_ip"
                                          >
                                            {item?.deviceId}
                                          </td>
                                          <td className="state">
                                            {item?.status.toLowerCase() ===
                                              "reachable" ? (
                                              <>
                                                <Badge
                                                  color="success"
                                                  id="reachable123"
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  Reachable{" "}
                                                  <i className="ri-arrow-up-line"></i>
                                                </Badge>
                                                <UncontrolledTooltip
                                                  placement="bottom"
                                                  target="reachable123"
                                                >
                                                  Device is reachable
                                                </UncontrolledTooltip>
                                              </>
                                            ) : (
                                              <>
                                                <Badge
                                                  color="danger"
                                                  id="unreachable123"
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  Unreachable{" "}
                                                  <i className="ri-arrow-down-line"></i>
                                                </Badge>{" "}
                                                <UncontrolledTooltip
                                                  placement="bottom"
                                                  target="unreachable123"
                                                >
                                                  Device is unreachable
                                                </UncontrolledTooltip>
                                              </>
                                            )}
                                          </td>
                                          {isAdmin && (
                                            <td>
                                              <div className="d-flex gap-2">
                                                <div className="remove">
                                                  <button
                                                    className="btn btn-sm btn-danger remove-item-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#deleteRecordModal"
                                                    onClick={() =>
                                                      deleteDevices(
                                                        item.deviceId
                                                      )
                                                    }
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
                                              </div>
                                            </td>
                                          )}
                                        </tr>
                                      );
                                    }
                                    return null;
                                  })
                                )}
                              </tbody>
                            </table>
                            <div
                              className="noresult"
                              style={{ display: "none" }}
                            >
                              <div className="text-center">
                                <lord-icon
                                  src="https://cdn.lordicon.com/msoeawqm.json"
                                  trigger="loop"
                                  colors="primary:#121331,secondary:#08a88a"
                                  style={{ width: "75px", height: "75px" }}
                                ></lord-icon>
                                <h5 className="mt-2">Sorry! No Result Found</h5>
                                <p className="text-muted mb-0">
                                  We've searched more than 150+ Orders We did
                                  not find any orders for you search.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <div className="pagination-container">
                              <ul className="pagination">
                                <li className="page-item">
                                  <button
                                    className="page-link"
                                    onClick={handleUnknownPreviousPage}
                                    disabled={UnknowncurrentPage === 1}
                                  >
                                    Previous
                                  </button>
                                </li>

                                {UnknowncurrentPage >= maxVisiblePages &&
                                  5 != UnknownTotalPages && (
                                    <li className="page-item">
                                      <button
                                        className="page-link"
                                        onClick={() =>
                                          handleUnknownPagination(1)
                                        }
                                      >
                                        1
                                      </button>
                                    </li>
                                  )}

                                {UnknowncurrentPage > maxVisiblePages - 1 &&
                                  5 != UnknownTotalPages && (
                                    <li className="page-item disabled">
                                      <span className="page-link">...</span>
                                    </li>
                                  )}

                                {getPageNumbers().map((page) => (
                                  <li
                                    key={page}
                                    className={`page-item ${UnknowncurrentPage === page
                                        ? "active"
                                        : ""
                                      }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        handleUnknownPagination(page)
                                      }
                                    >
                                      {page}
                                    </button>
                                  </li>
                                ))}

                                {UnknownTotalPages - UnknowncurrentPage >=
                                  maxVisiblePages - 2 &&
                                  ![4, 5].includes(UnknownTotalPages) && (
                                    <li className="page-item disabled">
                                      <span className="page-link">...</span>
                                    </li>
                                  )}

                                {UnknowncurrentPage < UnknownTotalPages - 2 &&
                                  ![4, 5].includes(UnknownTotalPages) && (
                                    <li className="page-item">
                                      <button
                                        className="page-link"
                                        onClick={() =>
                                          handleUnknownPagination(
                                            UnknownTotalPages
                                          )
                                        }
                                      >
                                        {UnknownTotalPages}
                                      </button>
                                    </li>
                                  )}

                                <li className="page-item">
                                  <button
                                    className="page-link"
                                    onClick={handleUnknownNextPage}
                                    disabled={
                                      UnknowncurrentPage === UnknownTotalPages
                                    }
                                  >
                                    Next
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            tog_list();
          }}
        >
          {" "}
          Add Device{" "}
        </ModalHeader>
        <form
          className="tablelist-form"
          onSubmit={(event) => handleSubmit(event)}
        // onSubmit={(e) => {
        //   e.preventDefault()
        //   deviceManagementForm.handleSubmit()
        // return false;
        // }}
        >
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="device-type-field" className="form-label">
                Type
              </label>
              <span className="text-danger ps-1" style={{ fontSize: "0.5rem" }}>
                <AiTwotoneStar />
              </span>
              <select
                className="form-select"
                data-trigger
                name="device-type-field"
                id="device-type-field"
                onChange={handleChange}
                required
              >
                <option value="S">Single Device</option>
                <option value="M">Device Range</option>
              </select>
            </div>
            {deviceType === "S" && (
              <div className="mb-3">
                <label htmlFor="ip-address-field" className="form-label">
                  IP Address
                </label>
                <span
                  className="text-danger ps-1"
                  style={{ fontSize: "0.5rem" }}
                >
                  <AiTwotoneStar />
                </span>
                <input
                  type="text"
                  id="ip-address-field"
                  name="ipAddress"
                  className="form-control"
                  placeholder="Enter IP Address"
                />
              </div>
            )}
            {deviceType === "M" && (
              <>
                <div className="mb-3">
                  <label htmlFor="start-ip-field" className="form-label">
                    Start Addres
                  </label>
                  <span
                    className="text-danger ps-1"
                    style={{ fontSize: "0.5rem" }}
                  >
                    <AiTwotoneStar />
                  </span>
                  <input
                    type="text"
                    id="start-ip-field"
                    className="form-control"
                    placeholder="Enter Start IP Address"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="end-ip-field" className="form-label">
                    End Address
                  </label>
                  <span
                    className="text-danger ps-1"
                    style={{ fontSize: "0.5rem" }}
                  >
                    <AiTwotoneStar />
                  </span>
                  <input
                    type="text"
                    id="end-ip-field"
                    className="form-control"
                    placeholder="Enter End IP Address"
                  />
                </div>
              </>
            )}
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="username"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="password" type="password" />
            </FormGroup>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label style={{ display: "flex", alignItems: "center" }}>
                License Key
                {/* {isLicenseKeyChanged && (
                  <button onClick={handleVerify} style={{ backgroundColor: 'Green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginLeft: 'auto' }}>Verify</button>
                )} */}
              </Form.Label>

              <Form.Control
                type="text"
                name="License Key"
                placeholder="License Key"
              // value={licenseKey}
              // onChange={handleVerifyChange}
              // className={LicenseKeyStatus === 200 ? 200 : ""}
              />
              {/* {LicenseKeyStatus === 200 && (
                <div className="text-success" >
                  <h5>✓ Verification successful</h5>
                </div>
              )}

              {LicenseKeyStatus === 400 && (
                <div className="text-danger">
                  ✗ Verification failed
                </div>
              )} */}
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setmodal_list(false)}
              >
                Close
              </button>
              <button
                type="submit"
                disabled={!showBtn}
                className="btn btn-success"
                id="add-btn"
              >
                Add Devices
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        className="modal fade zoomIn"
        id="deleteRecordModal"
        centered
      >
        <ModalHeader
          toggle={() => {
            tog_delete();
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Record ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => setmodal_delete(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* Device Setting Modal */}
      <Modal
        isOpen={deviceSettingModal}
        toggle={() => setDeviceSettingModal(!deviceSettingModal)}
      >
        <ModalHeader toggle={() => setDeviceSettingModal(!deviceSettingModal)}>
          <label>Device Setting</label>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column justify-content-around align-items-start mt-2">
            {/* {pollingInterval ? (
              <h4 className="fs-4 mb-3 text-dark">
                Fast Poll: 0{" "}
                <i
                  class="ri-pencil-line bg-warning p-1 rounded"
                  id="pollingInterval"
                  onClick={() => setPollingInterval(false)}
                ></i>
                <UncontrolledTooltip placement="right" target="pollingInterval">
                  Traffic and topology information
                </UncontrolledTooltip>
              </h4>
            ) : ( */}
            <>
              <Form.Label htmlFor="pollingInterval" className="fs-5">
                Fast Poll{" "}
                <p className="fs-6 mb-2 text-muted">
                  Traffic and topology information
                </p>
              </Form.Label>
              <InputGroup className="mb-4">
                <Form.Control
                  id="pollingInterval"
                  placeholder=""
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={pollingData?.devicePollingInterval}
                  onChange={(event) =>
                    setPollingData({
                      ...pollingData,
                      devicePollingInterval: event.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  id="updatePollingInterval"
                  class="btn btn-secondary bg-light"
                  onClick={() => updatePollingInterval()}
                >
                  <span>
                    <i class="ri-save-2-line fs-4 text-dark"></i>
                  </span>
                </button>
                <UncontrolledTooltip
                  placement="bottom"
                  target="updatePollingInterval"
                >
                  Save
                </UncontrolledTooltip>
              </InputGroup>
            </>
            {/* )}{" "} */}
            {/* {processInterval ? (
              <h4 className="fs-4 mb-3 text-dark">
                System Poll interval: 0{" "}
                <i
                  class="ri-pencil-line bg-warning p-1 rounded"
                  id="processInterval"
                  onClick={() => setProcessInterval(false)}
                ></i>
                <UncontrolledTooltip placement="right" target="processInterval">
                  Polling Interval for CPU, Memory, Transponder Info
                </UncontrolledTooltip>
              </h4>
            ) : ( */}
            <>
              <Form.Label htmlFor="processInterval" className="fs-5">
                System Poll Interval
                <p className="fs-6 mb-2 text-muted">
                  Polling Interval for CPU, Memory, Transponder Info
                </p>
              </Form.Label>
              {/* <Form.Text className="text-muted fs-6">
                Polling Interval for CPU, Memory, Transponder Info
              </Form.Text> */}
              <InputGroup className="mb-4">
                <Form.Control
                  id="processInterval"
                  placeholder=""
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={pollingData?.deviceProcessPollingInterval}
                  onChange={(event) =>
                    setPollingData({
                      ...pollingData,
                      deviceProcessPollingInterval: event.target.value,
                    })
                  }
                />
                <Button
                  variant="outline-secondary"
                  id="updateProcessInterval"
                  className="bg-light"
                  onClick={() => updateProcessInterval()}
                >
                  <span>
                    <i class="ri-save-2-line fs-4 text-dark"></i>
                  </span>
                </Button>
                <UncontrolledTooltip
                  placement="bottom"
                  target="updateProcessInterval"
                >
                  Save
                </UncontrolledTooltip>
              </InputGroup>
            </>
            <>
              <Form.Label htmlFor="syslogserverip" className="fs-5">
                NMS MGMT IP{" "}
                <p className="fs-6 mb-2 text-muted">
                  NMS MGMT IP to receive logs from device.
                </p>
              </Form.Label>
              {/* <Form.Text className="text-muted fs-6">
                Polling Interval for CPU, Memory, Transponder Info
              </Form.Text> */}
              <InputGroup className="mb-4">
                <Form.Control
                  id="processInterval"
                  placeholder=""
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={pollingData?.syslogId}
                  onChange={(event) =>
                    setPollingData({
                      ...pollingData,
                      syslogId: event.target.value,
                    })
                  }
                />
                <Button
                  variant="outline-secondary"
                  id="updateProcessInterval"
                  className="bg-light"
                  onClick={() => updateProcessInterval()}
                >
                  <span>
                    <i class="ri-save-2-line fs-4 text-dark"></i>
                  </span>
                </Button>
                <UncontrolledTooltip
                  placement="bottom"
                  target="updateProcessInterval"
                >
                  Save
                </UncontrolledTooltip>
              </InputGroup>
            </>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Instructions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="devices"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="devices" title="Devices">
              <h2>Devices</h2>
              <b>1.</b> Network Devices running disaggregated{" "}
              <b>Packet Broker</b>.<br></br>
              <b>2.</b> click on <img src={add_device} height={40} /> button to
              add new device into NMS.
              <br></br>
              {/* <b>3.</b> Select devices from list of devices and click on
              settings toggle <img src={device_settings} height={40} /> to set
              device polling interval and management IP.
              <br></br> */}
              <b>3.</b> To delete multiple devices from the list, select the
              devices and click (Last one){" "}
              <img src={delete_devices} height={40} />.<br></br>
              <b>4.</b> Click on manage button{" "}
              <img src={manage_devices} height={40} /> to edit device
              configurations.
              <br></br>
              <b>5.</b> Click on open console button{" "}
              <img src={device_terminal} height={40} /> to open device console.
              <br></br>
              <b>6.</b> State <img src={device_status} height={40} /> shows the
              current state of device.
              <br></br>
              <b>7.</b> Click on delete (Last one){" "}
              <img src={device_delete} height={40} /> in device tray to delete
              that device from NMS
              <h2>Unknown Devices</h2>
              <b>1.</b> Devices containing unknown OS.
              <br></br>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      {/* instructions */}
      <Modal isOpen={modalINS} toggle={toggle}>
        <ModalHeader toggle={toggle}>Instructions</ModalHeader>
        <ModalBody>
          <h2>Devices</h2>
          <b>1.</b> Network Devices running disaggregated <b>Packet Broker</b>.
          <br></br>
          <b>2.</b> click on <img src={add_device} height={40} /> button to add
          new device into NMS.
          <br></br>
          {/* <b>3.</b> Select devices from list of devices and click on settings
          toggle <img src={device_settings} height={40} /> to set device polling
          interval and management IP.
          <br></br> */}
          <b>3.</b> To delete multiple devices from the list, select the devices
          and click <img src={multiple_device_delete} height={40} />.<br></br>
          <b>4.</b> Click on manage button{" "}
          <img src={manage_devices} height={40} /> to edit device
          configurations.
          <br></br>
          <b>5.</b> Click on open console button{" "}
          <img src={device_terminal} height={40} /> to open device console.
          <br></br>
          <b>6.</b> State <img src={device_status} height={40} /> shows the
          current state of device.
          <br></br>
          <b>7.</b> Click on delete{" "}
          <img src={single_device_delete} height={40} /> in device tray to
          delete that device from NMS
          <h2>Unknown Devices</h2>
          <b>1.</b> Devices containing unknown OS.
          <br></br>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InventoryManagementList;
