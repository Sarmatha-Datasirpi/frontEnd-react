import moment from "moment";
import { React, useEffect, useState } from "react";
import Loader from "../../Components/Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Card, Col } from "react-bootstrap";
import { getAlarmsData } from "../../store/TopologyLogs/action";

const TopologyLogs = (props) => {
  document.title = "DPB-NMS | Events";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const tableHeaders = ["Timestamp", "Device", "Event Type", "Description"];

  useEffect(() => {
    dispatch(getAlarmsData());
  }, []);

  const AlarmsLogData = useSelector((state) => {
    return state.TopologyLogsData?.getAlarmsData;
  });

  useEffect(() => {
    
    if (AlarmsLogData?.length > 0) {
      setLoading(false);
    }
  }, [AlarmsLogData]);

  return (
    <>
      <Container fluid className="mt-4 ">
        <Row>
          <Col lg={12} className="mt-4">
            <Card>
              <div className="table-responsive table-card mb-1 mt-4">
                <table
                  className="table align-middle table-nowrap"
                  id="customerTable"
                >
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
                    {Array.isArray(AlarmsLogData)
                      ? AlarmsLogData.map((log, index) => (
                          <tr key={index} className="hover-effect">
                            <td align="center">
                              {moment(log?.createdDate).format("MMM DD, YYYY @ hh:mm:ss A")}
                            </td>
                            <td align="center">{log?.deviceId || "-"}</td>
                            <td align="center">{log?.alarmType}</td>
                            <td align="center">
                              {log?.description === " null" ? "-" : log?.description}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                  
                  )}
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TopologyLogs;
