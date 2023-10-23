import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteRuleData, getOneRuleData, getRuleData } from '../../../store/actions';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { DOMAIN, ENVIRONMENT_URL, PORT_8081, PROTOCOL } from '../../../helpers/url_helper';
import {
    UncontrolledTooltip,
} from "reactstrap";

const FilterCriteriaTable = (props) => {

    const dispatch = useDispatch();
    const deviceIpAddress = useParams().id;
    const [getRule_red, setgetRule_red] = useState();
    const [getOneRule_red, setOnegetRule_red] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const ruleSuccess = useSelector((state) => state?.PacketProker_reducer?.setRule_red);
    const DeleteRule = useSelector((state) => state?.PacketProker_reducer?.delRule_red);
    const [ruleIdSortDirection, setRuleIdSortDirection] = useState('ASC');
    const [statsSortDirection, setStatsSortDirection] = useState('ASC');

    const isAdmin = props?.isAdmin

    const fetchRuleData = (sortDirection, column) => {
        const url = `${ENVIRONMENT_URL}/packet-broker/rule/list`;
        const requestBody = {
            mapId: props.mapId,
            deviceId: deviceIpAddress,
            pageNo: currentPage,
            pageSize: 10,
            sortBy: column === undefined ? 'ruleId' : column,
            sortOrder: sortDirection === undefined ? 'ASC' : sortDirection,
            ruleId: searchQuery === '' ? null : searchQuery,
        };

        axios.post(url, requestBody)
            .then((response) => {
                setgetRule_red(response?.ruleResponseListDTO);
                setTotalCount(response?.totalSize);
            })
            .catch((error) => {
                console.error('Error fetching rules:', error);
            });
    };

    useEffect(() => {
        fetchRuleData(ruleIdSortDirection, 'ruleId');
    }, [props.mapId, currentPage, deviceIpAddress, ruleIdSortDirection, ruleSuccess, DeleteRule]);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = (e) => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const totalPages = Math.ceil(totalCount / 10);

    const handleSort = (column) => {
        if (column === 'ruleId') {
            const newDirection = ruleIdSortDirection === 'ASC' ? 'DESC' : 'ASC';
            setRuleIdSortDirection(newDirection);
            fetchRuleData(newDirection, column);
        } else if (column === 'counters') {
            const newDirection = statsSortDirection === 'ASC' ? 'DESC' : 'ASC';
            setStatsSortDirection(newDirection);
            fetchRuleData(newDirection, column);
        }
    };

    var rulesList;
    if (getRule_red != []) {
        rulesList = getRule_red;
    }
    var configFilter = [];
    var mapidconfig;

    if (rulesList && rulesList != undefined) {
        Object.keys(rulesList).map((key) => {
            mapidconfig = rulesList[key];
            var insertArr = [];
            var filtersArr = [];
            var ruleIdArr = [];
            var statsArr = [];
            Object.keys(rulesList[key]).map((keys) => {
                if (keys == "ruleId") {
                    ruleIdArr.push(rulesList[key][keys]);
                } else if (keys == "counters") {
                    statsArr.push(rulesList[key][keys] === null ? "0" : rulesList[key][keys]);
                } else if (keys != "counters") {
                    let result1 = [];
                    result1 = [rulesList[key]].map(
                        ({ ruleId, counters, ...rest }) => ({ ...rest })
                    );
                    // if(rulesList[key] != null)
                    filtersArr.push(JSON.stringify(result1));
                }
            });
            configFilter?.push([
                ...insertArr,
                ruleIdArr,
                statsArr,
                JSON.stringify(JSON.parse(filtersArr[0])[0]),
            ]);
            insertArr = [];
        });
    }

    const onEditRules = async (id) => {
        setOnegetRule_red();
        let mapID = props?.mapId
        const apiUrl = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/rule/id`;

        const requestData = {
            mapId: mapID,
            ruleId: id.toString(),
            deviceId: deviceIpAddress,
        };

        axios.post(apiUrl, requestData)
            .then(response => {

                mapID = null;
                setOnegetRule_red(response)
            })
            .catch(error => {
                console.error('API error:', error);
            });
    };

    props?.onGetOneRuleData(getOneRule_red);

    const deleteRule = (ruleid) => {

        let ruleDataForDelete = {
            mapId: props?.mapId,
            ruleId: ruleid.toString(),
            deviceId: deviceIpAddress,
        };

        dispatch(deleteRuleData(ruleDataForDelete));
    };

    const handleClearCounters = (ruleId) => {
        const Url = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/clear/rule-counters`;

        const requestBody = {
            mapId: props?.mapId,
            ruleId: ruleId?.toString(),
            deviceId: deviceIpAddress,
        };

        axios.post(Url, requestBody)
            .then((response) => {
                console.log('Counters cleared successfully', response);
                fetchRuleData()
            })
            .catch((error) => {
                console.error('Error clearing counters:', error);
            });
    };

    const handleClearAllCounters = () => {
        const Url = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/packet-broker/clear/map-counters`;

        const requestBody = {
            mapId: props?.mapId,
            deviceId: deviceIpAddress,
        };

        axios.post(Url, requestBody)
            .then((response) => {
                console.log('Counters cleared successfully', response);
                fetchRuleData()
            })
            .catch((error) => {
                console.error('Error clearing counters:', error);
            });
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        fetchRuleData();
    };

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            handleSearchClick();
        }
    };
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    const generatePaginationItems = () => {
        const paginationItems = [];

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(
                    <Pagination.Item
                        key={i}
                        active={currentPage === i}
                        onClick={() => handlePagination(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            // Determine the range of pages to display
            let startPage = currentPage - halfMaxPagesToShow;
            let endPage = currentPage + halfMaxPagesToShow;

            if (currentPage < halfMaxPagesToShow) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage > totalPages - halfMaxPagesToShow) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            }

            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(
                    <Pagination.Item
                        key={i}
                        active={currentPage === i}
                        onClick={() => handlePagination(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        }

        return paginationItems;
    };

    return (
        <>
            <div className="search-box-container d-flex align-items-center">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search by Rule Id"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterKey}
                />
                <button className="btn btn-primary" onClick={handleSearchClick}>
                    <i className="ri-search-line"></i>
                </button>
                <div style={{ marginLeft: 'auto' }}>
                    <button id='clear_all_stats' className="btn btn-secondary" onClick={handleClearAllCounters}>
                        Clear All Stats
                    </button>
                    <UncontrolledTooltip
                        placement="bottom"
                        target="clear_all_stats"
                    >
                        Clear All Stats For this Map
                    </UncontrolledTooltip>
                </div>

            </div>


            {configFilter && (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('ruleId')} style={{ width: '8%' }}>
                                    <div className="sortable-header">
                                        Rule Id
                                        <span className={`sort-icon ${ruleIdSortDirection === 'ASC' ? 'asc' : 'desc'}`}>
                                            {ruleIdSortDirection === 'ASC' ? '▲' : '▼'}
                                        </span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('counters')}>
                                    <div className="sortable-header">
                                        Stats
                                        <span className={`sort-icon ${statsSortDirection === 'ASC' ? 'asc' : 'desc'}`}>
                                            {statsSortDirection === 'ASC' ? '▲' : '▼'}
                                        </span>
                                    </div>
                                </th>
                                <th>Filters</th>
                                <>
                                    {isAdmin && (<th>Actions</th>)}
                                </>
                            </tr>
                        </thead>
                        <tbody>
                            {configFilter.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{row[0]}</td>
                                    <td>
                                        {row[1] === null ? (
                                            '0'
                                        ) : (
                                            <span>{row[1]}</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="d-flex flex-row align-items-center justify-content-between overflow-auto">
                                            <div>
                                                {(() => {
                                                    try {
                                                        const parsedData = JSON.parse(row[2]);

                                                        return Object.keys(parsedData).map((d, index) => (
                                                            <React.Fragment key={index}>
                                                                {parsedData[d] !== null && (
                                                                    <>
                                                                        <span className="fw-bold">{d.toUpperCase()}</span> :{' '}
                                                                        <span>{typeof parsedData[d] === 'boolean' ? parsedData[d].toString() : parsedData[d]}</span>,{' '}
                                                                    </>
                                                                )}
                                                            </React.Fragment>
                                                        ));
                                                    } catch (error) {
                                                        return '';
                                                    }
                                                })()}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="d-flex justify-content-around align-items-center">
                                        <>
                                            {isAdmin && (
                                                <div className="edit">
                                                    <button
                                                        className="btn btn-sm btn-success edit-item-btn"
                                                        onClick={() => {
                                                            onEditRules(row[0]);
                                                        }}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showModal"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                        <>
                                            {isAdmin && (
                                                <div id='clear_stats123' className="clear_counnter" style={{ marginLeft: '10px', marginRight: '10px' }}>
                                                    <button
                                                        className="btn btn-sm btn-warning clear-item-btn"
                                                        onClick={() => handleClearCounters(row[0])}
                                                    >
                                                        clr stats
                                                    </button>
                                                    <UncontrolledTooltip
                                                        placement="bottom"
                                                        target="clear_stats123"
                                                    >
                                                        Clear Stats For this Rule
                                                    </UncontrolledTooltip>
                                                </div>
                                            )}
                                        </>
                                        <>
                                            {isAdmin && (
                                                <div className="remove" style={{ marginLeft: '10px', marginRight: '10px' }}>
                                                    <button
                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                        onClick={() => deleteRule(row[0])}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteRecordModal"
                                                    >
                                                        Del
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                        <Pagination>
                            <Pagination.First onClick={() => handlePagination(1)} disabled={currentPage === 1} />
                            <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
                            {generatePaginationItems()}
                            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => handlePagination(totalPages)} disabled={currentPage === totalPages} />
                        </Pagination>
                        <span className="ml-2">Total Pages: {totalPages}</span>
                    </div>
                </>
            )}
        </>
    );
};
export default FilterCriteriaTable;
