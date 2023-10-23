import React, { useCallback, useState, useRef, useEffect } from "react";
import { Grid, _ } from 'gridjs-react';
import { useSelector, useDispatch } from "react-redux";
// actions
import {
    deleteRuleData,
    getRuleData,
  } from "../../../store/PacketProker/action";

const GridTable = ({mapid,tabledata}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRuleData(1001))
      }, [dispatch]);
    const deleteRules = (deleteid) => {
        console.log(mapid.map_name,deleteid)
        dispatch(deleteRuleData(mapid.map_name,deleteid))
        dispatch(getRuleData(1001))
    }
    const editRules = (editid) => {
        
    }

    return (
            <Grid
                data={tabledata}
                columns={[{
                    name: 'Rule Id',
                    formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                },
                    "Filters",
                {
                    name: 'stats',
                    formatter: (cell) => _(<a href="/#"> {cell} </a>)
                },
                {
                    name: 'Actions',
                    width: '80px',
                    formatter: (cell,row) => _(<td>
                                                        <div className="d-flex gap-2">
                                                            <div className="edit">
                                                                <button className="btn btn-sm btn-success edit-item-btn" onClick={()=>alert(row._cells[0].data)}
                                                                    data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                            </div>
                                                            <div className="remove">
                                                                <button className="btn btn-sm btn-danger remove-item-btn" onClick={()=>deleteRules(row._cells[0].data)} data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Del</button>
                                                            </div>
                                                        </div>
                                                    </td>)
                },
                ]}
                search={true}
                sort={true}
                pagination={{ enabled: false, limit: 20, }}
            />
    );
};

export default GridTable;
