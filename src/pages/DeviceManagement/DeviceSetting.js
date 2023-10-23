import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceSetting, getDeviceCredentials, verifyLicenseKeyAction } from "../../store/actions";
import { useParams } from "react-router-dom";

export default function DeviceSetting(props) {

  const [deviceUserInfo, setDeviceUserInfo] = useState({});
  const [licenseKey, setLicenseKey] = useState("");
  const [isLicenseKeyChanged, setIsLicenseKeyChanged] = useState(false);
  const dispatch = useDispatch();
  const deviceId = useParams().id;

  useEffect(() => {
    dispatch(getDeviceCredentials({ deviceId: deviceId }));
  }, []);

  const deviceUserDetails = useSelector(
    (state) => state.DevicesListData.deviceCredentials
  );
  const LicenseKeyStatus = useSelector(
    (state) => state.DevicesListData?.LicenseKeyStatus?.statusCode
  );

  const handleVerifyChange = (event) => {
    setLicenseKey(event.target.value);
    setIsLicenseKeyChanged(true);
  };

  const handleVerify = () => {
    dispatch(verifyLicenseKeyAction({ deviceId: deviceId, license: licenseKey }));
  };

  useEffect(() => {
    let key = "statusCode";
    if (
      Object.prototype.hasOwnProperty.call(deviceUserDetails, key) &&
      deviceUserDetails.statusCode === 200
    ) {
      return
    } else {
      setDeviceUserInfo(deviceUserDetails);
    }
  }, [deviceUserDetails]);

  const deviceSetting = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: deviceUserInfo,
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {

      values.id = deviceId;
      dispatch(updateDeviceSetting(values));
      props.setDeviceSettingModal(!props.deviceSettingModal);
    },
  });

  return (
    <div className="d-flex justify-content-start">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          deviceSetting.handleSubmit();
        }}
        className="w-100"
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="username"
            onChange={deviceSetting.handleChange}
            onBlur={deviceSetting.handleBlur}
            value={deviceSetting.values.username || ""}
            invalid={
              deviceSetting.touched.username && deviceSetting.errors.username
                ? true
                : false
            }
          />
          {deviceSetting.touched.username && deviceSetting.errors.username ? (
            <FormFeedback type="invalid">
              {deviceSetting.errors.username}
            </FormFeedback>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            onChange={deviceSetting.handleChange}
            onBlur={deviceSetting.handleBlur}
            value={deviceSetting.values.password || ""}
            invalid={
              deviceSetting.touched.password && deviceSetting.errors.password
                ? true
                : false
            }
          />
          {deviceSetting.touched.password && deviceSetting.errors.password ? (
            <FormFeedback type="invalid">
              {deviceSetting.errors.password}
            </FormFeedback>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label style={{ display: 'flex', alignItems: 'center' }}>
            License Key
            {isLicenseKeyChanged && (
              <button onClick={handleVerify} style={{ backgroundColor: 'Green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginLeft: 'auto' }}>Verify</button>
            )}
          </Form.Label>

          <Form.Control
            type="text"
            name="License Key"
            placeholder="License Key"
            value={licenseKey}
            onChange={handleVerifyChange}
            className={LicenseKeyStatus === 200 ? 200 : ""}
          />
          {LicenseKeyStatus === 200 && (
            <div className="text-success" >
              <h5>✓ Verification successful</h5>
            </div>
          )}

          {LicenseKeyStatus === 400 && (
            <div className="text-danger">
              ✗ Verification failed
            </div>
          )}
        </Form.Group>


        <div className="d-flex justify-content-center">
          <Button class="btn btn-success" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
