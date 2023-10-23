import React, { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
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
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import List from "list.js";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//redux
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  addUserData,
  getUserData,
  updateUserDataById,
  deleteUserData,
  getUserDataById,
} from "../../store/user/action";

const UserManagement = (props) => {
  document.title = "DPB-NMS | User Management";
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
  const [usersDataListSearch, setUsersDataListSearch] = useState([]);
  const [userDataList, setUserDataList] = useState([]);
  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
  };
  const [modal_edit, setmodal_edit] = useState(false);
  const tog_edit = () => {
    editUserData.userId = "";
    editUserData.userName = "";
    editUserData.email = "";
    editUserData.phoneNumber = "";
    setmodal_edit(!modal_edit);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };
  const [modal_update, setmodal_update] = useState(false);
  const tog_update = () => {
    setmodal_update(!modal_update);
  };
  useEffect(() => { }, [dispatch]);

  const userEdit = async (userId) => {
    await dispatch(getUserDataById(parseInt(userId)));
    dispatch(getUserData());
    setmodal_edit(!modal_edit);
  };

  const deleteUser = async (userId) => {
    await dispatch(deleteUserData(parseInt(userId)));
    dispatch(getUserData());
    setTimeout(() => {
      dispatch(getUserData());
    }, 3000);
  };
  const userAddData = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: false,
    initialValues: {
      username: "",
      email: "",
      role: [],
      password: "",
      phoneNumber: "",
    },
    onSubmit: async (values) => {
      values.role = values.role.split();
      await dispatch(addUserData(values));
      await dispatch(getUserData());
      setTimeout(() => {
        dispatch(getUserData());
      }, 3000);
      setmodal_list(false);
    },
  });

  const {
    usersDataList,
    editUserData,
    deleteUserDataList,
    updateUserDataList,
  } = useSelector((state) => ({
    usersDataList: state.Users.usersDataList,
    editUserData: state.Users.editUserData,
    deleteUserDataList: state.Users.deleteUserDataList,
    updateUserDataList: state.Users.updateUserDataList,
  }));

  useEffect(() => {
    setUsersDataListSearch(usersDataList);
    setUserDataList(usersDataList);
  }, [usersDataList]);

  const [admins, users] = [
    usersDataList?.filter((user) => user.roles === "ROLE_ADMIN"),
    usersDataList?.filter((user) => user.roles === "ROLE_USER"),
  ];


  const userUpdateData = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: editUserData !== undefined ? editUserData.username : "",
      userId: editUserData !== undefined ? editUserData.userId : null,
      email: editUserData !== undefined ? editUserData.email : "",
      phoneNumber: editUserData !== undefined ? editUserData.phoneNumber : "",
      newPassword: null,
      roles: editUserData !== undefined ? editUserData.roles : "",
    },
    onSubmit: async (values) => {
      setmodal_edit(!modal_edit);

      const editedFields = Object.keys(values).filter(
        (key) => values[key] !== editUserData[key]
      );
      const editedValues = editedFields.reduce(
        (obj, key) => ({ ...obj, [key]: values[key] }),
        {}
      );

      if (values.newPassword !== "") {
        editedValues.newPassword = values.newPassword;
      }

      editedValues.userId = values.userId;

      await dispatch(updateUserDataById(editedValues));
      dispatch(getUserData());
      setTimeout(() => {
        dispatch(getUserData());
      }, 3000);
    },
  });

  const reloadData = () => {
    dispatch(getUserData());
  };
  const userOnEdit = (userid) => {
    setmodal_update(!modal_update);
    dispatch(getUserDataById(userid));
    setTimeout(() => {
      dispatch(getUserData());
    }, 3000);
  };

  const userEditData = useFormik({
    enableReinitialize: false,
    initialValues: {
      username: "",
      userId: "",
      email: "",
      phoneNumber: "",
      role: "",
    },
    onSubmit: (values) => {
      setmodal_update(!modal_update);
      dispatch(getUserDataById(values));
    },
  });


  const [updateFields, setUpdateFields] = useState({
    userId: editUserData !== undefined ? editUserData.userId : null,
    username: editUserData !== undefined ? editUserData.username : "",
    email: editUserData !== undefined ? editUserData.email : "",
    phoneNumber: editUserData !== undefined ? editUserData.phoneNumber : "",
    roles: editUserData !== undefined ? editUserData.roles : "",
  });

  useEffect(() => {
    dispatch(updateUserDataById());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    const attroptions = {
      valueNames: [
        "name",
        "born",
        {
          data: ["id"],
        },
        {
          attr: "src",
          name: "image",
        },
        {
          attr: "href",
          name: "link",
        },
        {
          attr: "data-timestamp",
          name: "timestamp",
        },
      ],
    };

    const existOptionsList = {
      valueNames: ["contact-name", "contact-message"],
    };

    new List("contact-existing-list", existOptionsList);

    new List("fuzzysearch-list", {
      valueNames: ["name"],
    });


    new List("pagination-list", {
      valueNames: ["pagi-list"],
      page: 3,
      pagination: true,
    });
  });

  const headerConfig = [
    { label: "Name", key: "username" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Role", key: "roles" },
    { label: "Action", key: "action" },
  ];

  const handleRefresh = () => {
    dispatch(getUserData());
  };

  const searchByUsername = (val) => {
    if (!val) {
      setUserDataList(usersDataList);
    } else {
      setUserDataList(
        usersDataListSearch?.filter((user) => user?.username.includes(val))
      );
    }
  };

  const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
  const sessionUserId = sessionstoragedata?.id
  const sessionUsername = sessionstoragedata?.username

  const currentUser = usersDataList.find((user) => user.username === sessionUsername);

  const isAdmin = currentUser && currentUser?.roles.includes("ROLE_ADMIN");
  const Role = userUpdateData?.values?.roles?.replace("ROLE_", "")
  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-18 mb-1">
                Total Users ({usersDataList?.length}){" "}
                <Badge color="warning" id="reachabledevice">
                  <span>Admin</span> {" : "} {admins?.length}
                </Badge>
                <UncontrolledTooltip
                  placement="bottom"
                  target="reachabledevice"
                >
                  Admin
                </UncontrolledTooltip>
                &nbsp;
                <Badge color="primary" id="unreachabledevices">
                  <span>User</span> {" : "} {users?.length}
                </Badge>
                <UncontrolledTooltip
                  placement="bottom"
                  target="unreachabledevices"
                >
                  User
                </UncontrolledTooltip>
              </h4>

            </div>
            <div className="mt-3 mt-lg-0">
              <form action="#">
                <Row className="g-3 mb-0 align-items-center">
                  <div className="col-auto"></div>

                  <div className="col-auto">
                    <Col className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search..."
                            id="searchdevicelist"
                            onChange={(e) => searchByUsername(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                      <UncontrolledTooltip
                        placement="bottom"
                        target="searchdevicelist"
                      >
                        Search User
                      </UncontrolledTooltip>
                    </Col>
                  </div>
                  <>
                    {isAdmin && (
                      <div className="col-auto">

                        <button
                          type="button"
                          className="btn btn-success d-flex align-items-center gap-1"
                          onClick={() => tog_list()}
                          id="addnewdevices"
                        >
                          <i class="ri-user-add-fill"></i> Add
                        </button>

                        <UncontrolledTooltip placement="bottom" target="addnewdevices">
                          Add New User
                        </UncontrolledTooltip>
                      </div>
                    )}
                  </>
                  <>
                    {isAdmin && (
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
                          Delete All Users
                        </UncontrolledTooltip>
                      </div>
                    )}
                  </>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-primary btn-icon waves-effect waves-light layout-rightside-btn"
                      onClick={handleRefresh}
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
            <CardBody>
              <div id="customerList">
                <Row className="g-4 mb-3">
                </Row>
                <div className="table-responsive table-card mt-3 mb-1">
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
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
                            />
                          </div>
                        </th>
                        {headerConfig.map((column) => (
                          <th
                            className="sort"
                            data-sort={column?.key}
                            key={column?.key}
                          >
                            {column?.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {(userDataList || []).map((user) => {
                        return (
                          <tr key={user}>
                            <th scope="row" key={user}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td className="id" style={{ display: "none" }}>
                              <Link
                                to="#"
                                className="fw-medium link-primary"
                                key={user}
                              >
                                {user?.userId}
                              </Link>
                            </td>
                            <td
                              className="name"
                              key={user}
                              style={{ fontSize: "15px" }}
                            >
                              {user?.username}
                            </td>
                            <td
                              className="email"
                              key={user}
                              style={{ fontSize: "15px" }}
                            >
                              {user?.email}
                            </td>
                            <td
                              className="phone"
                              key={user}
                              style={{ fontSize: "15px" }}
                            >
                              {user?.phoneNumber}
                            </td>
                            <td className="role">
                              <span
                                className={`badge ${user?.roles === "ROLE_USER"
                                  ? "badge-soft-danger"
                                  : "badge-soft-success"
                                  } text-uppercase`}
                                key={user}
                                style={{ fontSize: "12px" }}
                              >
                                {user?.roles.substring(5)}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                {isAdmin && (
                                  <div className="edit">
                                    <button
                                      onClick={() => userEdit(user?.userId)}
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                )}
                                {isAdmin && (
                                  <div className="remove">
                                    <button
                                      onClick={() => deleteUser(user.userId)}
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      disabled={user.username === currentUser.username}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}></div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

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
          Add User{" "}
        </ModalHeader>
        <form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            userAddData.handleSubmit();
            return false;
          }}
          action="#"
        >
          <ModalBody>
            <div className="mb-3" id="modal-id" style={{ display: "none" }}>
              <label htmlFor="id-field" className="form-label">
                ID
              </label>
              <input
                type="text"
                id="id-field"
                className="form-control"
                placeholder="ID"
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                onChange={userAddData.handleChange}
                onBlur={userAddData.handleBlur}
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                onChange={userAddData.handleChange}
                onBlur={userAddData.handleBlur}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                id="password"
                className="form-control"
                onChange={userAddData.handleChange}
                onBlur={userAddData.handleBlur}
                placeholder="Enter Password."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control"
                onChange={userAddData.handleChange}
                onBlur={userAddData.handleBlur}
                placeholder="Enter Phone no.with country code +91 8888888888"
                pattern="[+]{1}[0-9]{1,3} [0-9]{7,15}"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                data-trigger
                name="role"
                onChange={userAddData.handleChange}
                onBlur={userAddData.handleBlur}
                id="role"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
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
              <button type="submit" className="btn btn-success" id="add-btn">
                Add New User
              </button>
              {/*<button type="button" className="btn btn-success" id="edit-btn">Update</button>*/}
            </div>
          </ModalFooter>
        </form>
      </Modal>
      <ToastContainer />
      {/* Edit Modal */}
      <Modal
        isOpen={modal_edit}
        toggle={() => {
          tog_edit();
        }}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={tog_edit}>
          Edit User <br /> Username: {editUserData?.username}
        </ModalHeader>
        <form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            userUpdateData.handleSubmit();
            return false;
          }}
          action="#"
        >
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={editUserData?.email}
                onChange={userUpdateData.handleChange}
                className="form-control"
                onBlur={userUpdateData.handleBlur}
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={editUserData.phoneNumber}
                onChange={userUpdateData.handleChange}
                className="form-control"
                onBlur={userUpdateData.handleBlur}
                placeholder="Enter Phone no. with country code +91 8888888888"
                pattern="[+]{1}[0-9]{1,3} [0-9]{7,15}"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  className="form-control"
                  onChange={userUpdateData.handleChange}
                  onBlur={userUpdateData.handleBlur}
                  placeholder="Enter Password."
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-control"
                data-trigger
                name="role"
                // value={userUpdateData.values.roles}
                onChange={userUpdateData.handleChange}
                onBlur={userUpdateData.handleBlur}
                id="role"
              >
                <option value="">{Role}</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setmodal_edit(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                Update
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

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
    </React.Fragment>
  );
};

export default UserManagement;
