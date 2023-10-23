import React, {Fragment,useCallback, useState, useRef, useEffect, } from 'react';
import { useForm, Form } from '../../Formfields/useForm'
import Controls from '../../Formfields/Controls'
import MaterialUI from '../../Formfields/MaterialUI'
import {setMapData} from '../../../store/PacketProker/action'
//redux
import { useSelector, useDispatch } from "react-redux";
import { getMapConfigData,setMapConfigData, getMapData, setRuleData } from "../../../store/PacketProker/action";


const MapRulesconfig = (mappedData) => {
    console.log("inside mapped port")
    console.log(mappedData)
    const [value, setValue] = useState('year');
    const [selected, setSelected] = useState(true)
    const dispatch = useDispatch();
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const currentYear = new Date().getFullYear();
    const Years = [];
    const Quarters = [];
    for (let i = 2015; i < currentYear + 1; i++) {
        Years.push(i);
        Quarters.push(i + "/" + (i + 1));
    }
    const initialFValues = {
        map_name:'',
        map_id:'',
        map_push_vlan:''
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFValues, true, validate);
    const changeRadio = (event) => {
        setValue(event.target.value);
        setSelected(false)
    };

    useEffect(() => {
      }, [dispatch]);

    const manageFilters = () => {
        const data = {
            "from":"Ethernet67,Ethernet68",
            "to":"Ethernet70",
            "push-vlan":"20"
    }    
        dispatch(getMapData())
        dispatch(setMapData(1012,data))
        console.log('successs')
    }
  return (
    <Fragment>
        <Form >
            <MaterialUI.Grid container>
                <MaterialUI.Grid item xs={12} md={5}>
                    <MaterialUI.FormControl component="fieldset">
                        <MaterialUI.RadioGroup row aria-label="year" name="year1" defaultValue="top" value={value} onChange={changeRadio}>
                           
                            {/* <Controls.Input name="map_name"
                                            label="Map Name"
                                            value={values.paymentReason} onChange={handleInputChange}
                                            error={errors.paymentReason} />
                            <Controls.Input name="map_id"
                                            label="ID"
                                            value={values.paymentReason} onChange={handleInputChange}
                                            error={errors.paymentReason} /> */}
                            <Controls.Input name="map_push_vlan"
                                            label="Push Vlan"
                                            value={values.map_push_vlan} onChange={handleInputChange}
                                            error={errors.map_push_vlan} />
                        </MaterialUI.RadioGroup>
                    </MaterialUI.FormControl>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                    <MaterialUI.Box mt={1}>
                        <Controls.Button text="Add map" size="small" color="primary" onClick={manageFilters} />
                    </MaterialUI.Box>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
        </Form>
    </Fragment>
  )
};

export default MapRulesconfig;
