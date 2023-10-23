import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { ENVIRONMENT_URL } from '../../../helpers/url_helper';
import { useParams } from "react-router-dom";
const HorizontalBarChart = (props) => {
    const deviceIpAddress = useParams().id;
    const [mode, setMode] = useState('select');
    const [topN, setTopN] = useState(5);
    const [ruleIdsInput, setRuleIdsInput] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const handleModeChange = (event) => {
        const newMode = event.target.value;
        setMode(newMode);

        if (newMode === 'select') {
            setRuleIdsInput('');
        } else if (newMode === 'search') {
            setTopN(5);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `${ENVIRONMENT_URL}/packet-broker/rule/stats`;

            const baseRequest = {
                deviceId: deviceIpAddress,
                mapId: props.MapId,
            };

            const ruleIds = ruleIdsInput.trim() !== '' ? ruleIdsInput.split(',').map(Number) : [];

            if (mode === 'select') {
                baseRequest.count = topN;
                delete baseRequest.ruleList;
            } else if (mode === 'search') {
                baseRequest.ruleList = ruleIds;
                delete baseRequest.count;
            }

            try {
                const response = await axios.post(apiUrl, baseRequest);
                setData(response);
                setError(null);
            } catch (error) {
                console.error('Error calling API:', error);
                setError('Error fetching data.');
                setData([]);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [topN, props.MapId, ruleIdsInput, mode]);


    useEffect(() => {
        // Sort the data once when it is fetched
        const sortedData = [...data].sort((a, b) => b.counters - a.counters);
        setData(sortedData);
    }, [data]);

    const getTopCounters = (option) => {
        if (option === 'all') {
            return data.map((item) => item.counters);
        } else {
            const topN = parseInt(option, 10);
            return data.slice(0, topN).map((item) => item.counters);
        }
    };

    const handleTopNInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setTopN(value);
    };

    const getChartData = () => {
        const chartData = [];
        chartData.push({ name: 'Filter', data: getTopCounters(topN) });
        return chartData;
    };

    const tooltipContent = ({ seriesIndex, dataPointIndex, w }) => {
        const dataItem = data[dataPointIndex];
        let tooltipContent = '<div class="horizontal-tooltip">'; // Add a class for styling

        let fieldCount = 0; // Counter for the number of fields displayed
        let rowContent = ''; // Content for the current row
        for (const key in dataItem) {
            const value = dataItem[key];
            if (value !== null && fieldCount < 5) { // Display up to four fields
                rowContent += `
                    <div class="tooltip-item">
                        <span class="tooltip-label me-2">${key}:</span>
                        <span class="tooltip-value me-5">${value}, </span>
                    </div>
                `;
                fieldCount++;

                // Check if we've displayed four fields or there are no more fields left
                if (fieldCount === 5 || Object.keys(dataItem).length === fieldCount) {
                    tooltipContent += `<div class="tooltip-row">${rowContent}</div>`;
                    rowContent = ''; // Clear row content
                    fieldCount = 0; // Reset field count
                }
            }
        }

        tooltipContent += '<div style="width: 10px;"></div>';

        return tooltipContent;
    };

    const chartOptions = {
        chart: {
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            categories: data.map((item) => `RULE ID ${item.ruleId}`),
            title: {
                text: 'Pocket Count', // Label for the x-axis
                offsetY: 10,
                style: {
                    fontSize: '14px',
                    fontWeight: 600,
                },
            },
            offsetY: 10,
            offsetX: 0,
        },
        colors: ['#355C7D'],
        tooltip: {
            enabled: true,
            custom: tooltipContent,
            followCursor: false,
        },
    };


    const chartSeries = getChartData();

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="option-container">
                        <div className="option">
                            <label className="option-label">Select Options:</label>
                        </div>
                        <div className="option">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="select"
                                    checked={mode === 'select'}
                                    onChange={handleModeChange} />
                                <input
                                    type="number"
                                    value={topN}
                                    placeholder="Enter Count"
                                    min="1"
                                    style={{ maxWidth: '500px' }}
                                    className="form-control"
                                    onChange={handleTopNInputChange}
                                    disabled={mode === 'search'} // Disable if mode is 'search'
                                />
                            </label>
                        </div>
                        <div className="option">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="search"
                                    checked={mode === 'search'}
                                    onChange={handleModeChange} />
                                <input
                                    type="text"
                                    value={ruleIdsInput}
                                    style={{ maxWidth: '500px' }}
                                    placeholder="Enter Rule id separate by comma"
                                    className="form-control"
                                    onChange={(event) => setRuleIdsInput(event.target.value)}
                                    disabled={mode === 'select'} // Disable if mode is 'select'
                                />

                            </label>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    {mode === 'select' ? (
                        <span className='radio-label' style={{ marginRight: "10px" }}><b>Top {isNaN(topN) ? '' : topN} Active Flows</b></span>
                    ) : mode === 'search' ? (
                        <span className='radio-label' style={{ marginRight: "10px" }}><b>Stats of Specified Rules</b></span>
                    ) : null}
                </div>
                {/* <div className='col'>
        <div className="input-section">{renderInput()}</div></div> */}
                <div className="chart-container">
                    <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
                </div>
            </div></>
    );
};

export default HorizontalBarChart;
