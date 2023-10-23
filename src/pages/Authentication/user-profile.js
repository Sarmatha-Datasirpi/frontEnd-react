import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";

import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

// import avatar from "../../assets/images/users/avatar-1.jpg";
// // actions
import { editProfile, resetProfileFlag, changePassword } from "../../store/actions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [] = useState();
  const [email, setemail] = useState();
  const [id, setUserId] = useState("");
  const [username, setUserName] = useState();
  const [roles, setrole ] = useState();
  const [newPassword, setnewpassword] = useState();

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
      setemail(obj.email);
      setrole(obj.roles);
      setTimeout(() => {
        dispatch(changePassword());
      }, 3000);
    }
  }, [dispatch, user]);
  



  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      userId: id,
      newPassword: "",
    },
    onSubmit: (values) => {
      dispatch(changePassword(values));
    }
  });

  document.title = "DPB-NMS | Profile";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">Username Updated To </Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        // src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{username}</h5>
                        <p className="mb-1">Email Id : {email}</p>
                        <p className="mb-1">Role : {roles}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={id} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card> */}

          <h4 className="card-title mb-4">Change Password for {username}</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Input name="id" value={id} type="hidden"/>
                <div className="form-group">
                  <Label className="form-label">Change Password</Label>
                  <Input
                    name="newPassword"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Your New Password"
                    type="text"
                    onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
