import React, { useState, useEffect } from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useParams } from 'react-router-dom';
import { FaEdit, FaEye } from 'react-icons/fa';
import { isEmpty } from "lodash";
import { deleteMapData, getInterfacesData } from '../../../store/PacketProker/action';
import DynamicFilterModal from './PacketBrockerModal';

const PocketBrockerMaplist = () => {
    const dispatch = useDispatch();
    const deviceIpAddress = useParams().id;
    const [showModal, setShowModal] = useState(false);
    const [editMap, setEditMap] = useState(null);
    const [deleteMapId, setDeleteMapId] = useState(null);
    const [showFilterCriteria, setShowFilterCriteria] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const CreateMapMessage = useSelector((state) => state?.PacketProker_reducer?.mapCreationResponse);
    const PacketProkerMapList = useSelector((state) => state?.PacketProker_reducer?.coOrdinateDataSet);
    const [filteredMaps, setFilteredMaps] = useState(PacketProkerMapList);
    const showDeleteConfirmationModal = (mapId) => {
        setDeleteMapId(mapId);
    };

    // Function to hide the delete confirmation modal
    const hideDeleteConfirmationModal = () => {
        setDeleteMapId(null);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        dispatch(getInterfacesData(deviceIpAddress));
    }, [showModal]);

    const handleCreateMap = (data) => {
        setShowFilterCriteria(false);
        setEditMap(null)
        openModal();
    };

    const handleEditMap = (MapData) => {
        setShowFilterCriteria(true);
        setEditMap(MapData)
        openModal();
    };

    const handleDeleteMap = async (mapId) => {

        await dispatch(deleteMapData({ mapId: mapId, deviceId: deviceIpAddress }));
        let timerId;
        if (!timerId) {
            timerId = setTimeout(async () => {
                await dispatch(getInterfacesData(deviceIpAddress));
                timerId = null;
            }, 2000);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const { user } = useSelector(state => ({
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
        }
    }, [user]);

    useEffect(() => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        const filteredData = PacketProkerMapList.filter(cardData => {
            const { mapId, id, isCLI, from, to, description } = cardData;

            if (lowerCaseSearchQuery === 'nms') {
                return !isCLI;
            }

            if (lowerCaseSearchQuery === 'other') {
                return isCLI;
            }

            return (
                mapId?.includes(lowerCaseSearchQuery) ||
                from?.toLowerCase().includes(lowerCaseSearchQuery) ||
                to?.toLowerCase().includes(lowerCaseSearchQuery) ||
                description?.toLowerCase().includes(lowerCaseSearchQuery)
            );
        });

        setFilteredMaps(filteredData);
    }, [PacketProkerMapList, searchQuery]);


    const { usersDataList } = useSelector((state) => ({
        usersDataList: state.Users.usersDataList,
    }));


    const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
    const sessionUsername = sessionstoragedata.username
    const currentUser = usersDataList.find((user) => user.username === sessionUsername);
    const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");


    return (
        <><ToastContainer autoClose={false} />
            <div className="row">
                <div className="d-flex justify-content-between align-items-center w-100">

                    <div className="search-box ms-2">
                        <input
                            type="text"
                            className="form-control search"
                            placeholder="Search Through Maps"
                            id="searchbymapid"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <i className="ri-search-line search-icon"></i>
                    </div>
                    <div className="d-flex">
                        {isAdmin && (
                            <button
                                id="create-map"
                                onClick={handleCreateMap}
                                className="btn btn-success create-map-btn"
                                style={{ width: "auto", minWidth: "100px", marginRight: "10px" }}
                            >
                                <i class="ri-pin-distance-fill" style={{ marginRight: "0.5em" }}></i>
                                Create Map
                            </button>
                        )}
                    </div>
                </div>
                <div className="">
                    <div className=''>
                        <div className='row'>

                            {filteredMaps?.map((cardData, index) => (
                                <div key={index} className='col-lg-4 col-md-6 col-sm-12'>
                                    <div className='card card-margin mt-5'>

                                        <div className="card-header no-border d-flex justify-content-between">
                                            <p className="card-text">Map ID:<b>{cardData.mapId}</b>  </p>

                                            <div className='d-flex justify-content-end gap-2'>
                                                {isAdmin ? (
                                                    <button
                                                        className="btn btn-primary btn-sm rounded-circle"
                                                        onClick={() => handleEditMap(cardData)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary btn-sm rounded-circle"
                                                        onClick={() => handleEditMap(cardData)}
                                                    >
                                                        <FaEye />
                                                    </button>
                                                )}
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => showDeleteConfirmationModal(cardData.mapId)}
                                                        className="btn btn-danger btn-sm rounded-circle "
                                                    >
                                                        <i className="ri-delete-bin-3-fill" style={{ marginRight: '1px' }}></i>
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                Network Ports
                                                {cardData.from?.split(',').map((item, index) => (
                                                    <span key={index} className="from-item">
                                                        {index > 0 && ','} {item.trim()} {/* Use .trim() to remove any leading/trailing whitespaces */}
                                                    </span>
                                                ))}
                                            </p>
                                            <p className="card-text">
                                                Tool Ports:
                                                {cardData.to?.split(',').map((item, index) => (
                                                    <span key={index} className="to-item">
                                                        {index > 0 && ','} {item.trim()} {/* Use .trim() to remove any leading/trailing whitespaces */}
                                                    </span>
                                                ))}
                                            </p>
                                            <p className="card-text">
                                                Description: {cardData.description}
                                            </p>
                                            <p className="card-text">
                                                Created From: {cardData.isCLI === false && <span >NMS</span> || cardData.isCLI === true && <span >Others</span>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
                {showModal && <DynamicFilterModal showModal={showModal} closeModal={closeModal} buttonId="create-map" MapData={editMap} showFilterCriteria={showFilterCriteria} />}

            </div>
            {/* Delete Confirmation Modal */}
            <div
                className={`modal ${deleteMapId ? 'show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{
                    display: deleteMapId ? 'block' : 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                }}
            >
                <div className="modal-dialog" role="document" style={{ margin: '10% auto', maxWidth: '500px' }}>
                    <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div className="modal-header" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px 10px 0 0' }}>
                            <h5 className="modal-title h4" style={{ color: '#343a40' }}>Confirm Delete</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" onClick={hideDeleteConfirmationModal} style={{ color: '#343a40', opacity: '0.7' }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body h5" style={{ padding: '20px', color: '#343a40' }}>
                            <p>Are you sure you want to delete this map?</p>
                        </div>
                        <div className="modal-footer" style={{ borderRadius: '0 0 10px 10px', padding: '10px' }}>
                            <button type="button" className="btn btn-light btn-sm" onClick={hideDeleteConfirmationModal} style={{ marginRight: '10px', border: 'none' }}>Cancel</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                                handleDeleteMap(deleteMapId);
                                hideDeleteConfirmationModal();
                            }} style={{ color: '#fff', backgroundColor: '#dc3545', border: 'none' }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default PocketBrockerMaplist;