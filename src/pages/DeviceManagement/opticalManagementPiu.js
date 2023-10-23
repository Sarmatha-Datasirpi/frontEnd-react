

import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Container, Col } from "react-bootstrap";
import Select from 'react-select';
import { Table } from "reactstrap";

function OpticalMonitoringPiu(props) {
    const [selectedHeaders, setSelectedHeaders] = useState([
        "Name",
        "Admin Status",
        "oper Status",
        "Hostif 1 signal-rate",
        "lib Tai-version",
        "Hostif 2 signal-rate",
        "TxLaser Frequency",
        "OutputPower",
        "Modulation Format"]);
    const tableHeaders = [
        "Name",
        "Admin Status",
        "Ber Period",
        "ch1Frequency",
        "Netify LoopbackType",
        "Modulation Format",
        "OutputPower",
        "Prbs Type",
        "Pulse Shaping",
        "TxDisable",
        "TxLaser Frequency",
        "Hostif 1 loopback-type",
        "Hostif 1 signal-rate",
        "Hostif 1 Fec-type",
        "Hostif 2 loopback-type",
        "Hostif 2 signal-rate",
        "Hostif 2 Fec-type",
        "Location",
        "Vendor Name",
        "VendorPart#",
        "Vendor Serial #",
        "Filmware Version",
        "oper Status",
        "Temperature",
        "Power",
        "No of Host Interfaces",
        "No of Network Interfaces",
        "lib Tai-version",

        "Tx Fine Tune Laser Frequency",
        "Line Rate",
        "Differential Encoding",
        "Tx Grid Spacing",
        "Current OutputPower",
        "Current PreFecBer",
        "NetIf Oper Status",
        "min Laser Frequency",
        "Max Laser Frequency",
        "Laser Grid Support",
        "Current TxLaser Frequency",
        "Current InputPower",
        "Current Chromatic Dispersion",
        "Current Differential GroupDelay",
        "Current Snr",
        "RxLos",
        "UnCorrected BlockCount"

    ];

    const handleHeaderSelection = (selectedOptions) => {
        const selectedHeaderValues = selectedOptions.map(option => option.value);
        setSelectedHeaders(selectedHeaderValues);
    };

    const dropdownOptions = tableHeaders.map(header => ({
        value: header,
        label: header
    }));

    const OpticalMonitorData = useSelector(
        (state) => state?.OpticalMonitor_reducer?.opticalMonitorData
    );

    return (
        <Container fluid>
            <label style={{ fontSize: "20px", marginLeft: "-20px" }}>Real time monitoring</label>
            <Row>
                <Row>
                    <div className="dropdown-container">

                        <Select
                            id="headerDropdown"
                            options={dropdownOptions}
                            isMulti
                            onChange={handleHeaderSelection}
                            value={dropdownOptions?.filter(option => selectedHeaders.includes(option.value))}
                            className="dropdown-select"
                        />
                    </div>
                </Row>
                <Col lg={12}>
                    <div className="table-responsive">
                        <div>
                            <Table className="table-striped table-nowrap align-middle mb-0">
                                <thead>
                                    <tr>
                                        {selectedHeaders.map((header, index
                                        ) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {OpticalMonitorData?.piuList?.map((rowData, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {selectedHeaders.map((header, columnIndex) => (
                                                <td key={columnIndex} >
                                                    {header === 'Name' ? rowData?.name :
                                                        header === 'Admin Status' ? (rowData?.adminStatus ? 'True' : 'False') :
                                                            header === 'Ber Period' ? rowData?.berPeriod :
                                                                header === 'ch1Frequency' ? rowData?.ch1Frequency :
                                                                    header === 'Netify LoopbackType' ? rowData?.loopbackType :
                                                                        header === 'Modulation Format' ? rowData?.modulationFormat :
                                                                            header === 'OutputPower' ? rowData?.outputPower :
                                                                                header === 'Prbs Type' ? rowData?.prbsType :
                                                                                    header === 'Pulse Shaping' ? (rowData?.pulseShaping ? 'True' : 'False') :
                                                                                        header === 'TxDisable' ? (rowData?.txDisable ? 'True' : 'False') :
                                                                                            header === 'TxLaser Frequency' ? rowData?.txLaserFrequency :
                                                                                                header === 'Hostif 1 loopback-type' ? rowData?.hostIf[0]?.state['loopback-type'] :
                                                                                                    header === 'Hostif 1 signal-rate' ? rowData?.hostIf[0]?.state['signal-rate'] :
                                                                                                        header === 'Hostif 1 Fec-type' ? rowData?.hostIf[0]?.state['fec-type'] :
                                                                                                            header === 'Hostif 2 loopback-type' ? rowData?.hostIf[1]?.state['loopback-type'] :
                                                                                                                header === 'Hostif 2 signal-rate' ? rowData?.hostIf[1]?.state['signal-rate'] :
                                                                                                                    header === 'Hostif 2 Fec-type' ? rowData?.hostIf[1]?.state['fec-type'] :
                                                                                                                        header === 'Location' ? rowData?.location :
                                                                                                                            header === 'Vendor Name' ? rowData?.vendorName :
                                                                                                                                header === 'VendorPart#' ? rowData?.vendorPartNumber :
                                                                                                                                    header === 'Vendor Serial #' ? rowData?.vendorSerialNumber :
                                                                                                                                        header === 'Filmware Version' ? rowData?.filmwareVersion :
                                                                                                                                            header === 'oper Status' ? rowData?.operStatus :
                                                                                                                                                header === 'Temperature' ? rowData?.temp :
                                                                                                                                                    header === 'Power' ? rowData?.power :
                                                                                                                                                        header === 'No of Host Interfaces' ? rowData?.numHostInterfaces :
                                                                                                                                                            header === 'No of Network Interfaces' ? rowData?.numNetworkInterfaces :
                                                                                                                                                                header === 'lib Tai-version' ? rowData?.libTaiVersion :
                                                                                                                                                                    header === 'Tx Fine Tune Laser Frequency' ? rowData?.txFineTuneLaserFrequency :
                                                                                                                                                                        header === 'Line Rate' ? rowData?.lineRate :
                                                                                                                                                                            header === 'Differential Encoding' ? rowData?.differentialEncoding :
                                                                                                                                                                                header === 'Tx Grid Spacing' ? rowData?.txGridSpacing :
                                                                                                                                                                                    header === 'Current OutputPower' ? rowData?.currentOutputPower :
                                                                                                                                                                                        header === 'Current PreFecBer' ? rowData?.currentPreFecBer :
                                                                                                                                                                                            header === 'NetIf Oper Status' ? rowData?.netIfOperStatus :
                                                                                                                                                                                                header === 'NetIf Oper Status' ? rowData?.netIfOperStatus :
                                                                                                                                                                                                    header === 'min Laser Frequency' ? rowData?.minLaserFrequency :
                                                                                                                                                                                                        header === 'Max Laser Frequency' ? rowData?.maxLaserFrequency :
                                                                                                                                                                                                            header === 'Laser Grid Support' ? rowData?.laserGridSupport :
                                                                                                                                                                                                                header === 'Current TxLaser Frequency' ? rowData?.currentTxLaserFrequency :
                                                                                                                                                                                                                    header === 'Current InputPower' ? rowData?.currentInputPower :
                                                                                                                                                                                                                        header === 'Current Chromatic Dispersion' ? rowData?.currentChromaticDispersion :
                                                                                                                                                                                                                            header === 'Current Differential GroupDelay' ? rowData?.currentDifferentialGroupDelay :
                                                                                                                                                                                                                                header === 'Current Snr' ? rowData?.currentSnr :
                                                                                                                                                                                                                                    header === 'RxLos' ? rowData?.rxLos :
                                                                                                                                                                                                                                        header === 'UnCorrected BlockCount' ? rowData?.unCorrectedBlockCount :
                                                                                                                                                                                                                                            rowData[header.toLowerCase()]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default OpticalMonitoringPiu;