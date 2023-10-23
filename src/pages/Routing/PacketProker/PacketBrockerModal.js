import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import GeneralTab from './modelGentalTab';
import FilterCriteriaTab from './modelFilterCriteriaTab';
import HorizontalBarChart from './rulesStatisticsView';
import { useSelector } from 'react-redux';
import { isEmpty } from "lodash";

const DynamicFilterModal = (props) => {

    


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
    const { usersDataList } = useSelector((state) => ({
        usersDataList: state.Users.usersDataList,
    }));

    const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
    const sessionUsername = sessionstoragedata.username
    const currentUser = usersDataList.find((user) => user.username === sessionUsername);
    const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");

    const [key, setKey] = useState( isAdmin === true ? 'general' : 'filterCriteria');

    return (
        <Modal
            show={props.showModal}
            onHide={props.closeModal}
            fullscreen="true"
            size="xl"
            className="packetproker-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Dynamic Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => {
                        setKey(k);
                    }}
                    className="mb-3"
                >
                    {isAdmin ? (
                        <Tab eventKey="general" title="General">
                            <GeneralTab onCloseModal={props.closeModal} EditMapData={props.MapData} isAdmin={isAdmin} />
                        </Tab>
                    ) : null}

                    {/* Conditionally render the "Filter Criteria" tab based on showFilterCriteria */}
                    {props.showFilterCriteria && (
                        <Tab eventKey="filterCriteria" title="Filter Criteria">
                            <FilterCriteriaTab sectionName="filterCriteria" EditMapData={props.MapData}  isAdmin={isAdmin}/>
                        </Tab>

                    )}
                    <Tab eventKey="Statistics" title="Statistics">
                        <HorizontalBarChart MapId={props?.MapData?.mapId} />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default DynamicFilterModal;
