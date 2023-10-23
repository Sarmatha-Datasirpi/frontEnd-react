import React, { useState } from 'react';
import FilterCriteriaForm from './filterCriteriaform';
import FilterCriteriaTable from './filterCriteriaTable';

const FilterCriteriaTab = (props) => {
    
    const [editRuleFormData, setEditRuleFormData] = useState(null);
    const [submitEvent, setSubmitEvent] = useState();


    const handleGetOneRuleData = (data) => {
        setEditRuleFormData(data);
    };

    const handleRuleSubmit = (event) => {
        setSubmitEvent(event)
    };

    const resetEditRuleFormData = () => {
        setEditRuleFormData(null);
    };

    return (
        <>
            <div className='row'>
                {props.isAdmin ? (
                    <div className='col-4'>
                        <FilterCriteriaForm mapId={props.EditMapData?.mapId} getOneRule={editRuleFormData} handleRuleSubmit={handleRuleSubmit} refresh={resetEditRuleFormData} isAdmin = {props?.isAdmin} />
                    </div>
                ) : null}
                <div className={props.isAdmin === false ? 'col-12' : 'col-8'}>
                    <FilterCriteriaTable mapId={props.EditMapData?.mapId} onGetOneRuleData={handleGetOneRuleData} submitEvent={submitEvent} isAdmin = {props?.isAdmin} />
                </div>

            </div>
        </>
    );
};

export default FilterCriteriaTab;
