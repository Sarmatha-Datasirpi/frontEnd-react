import {
    GET_OPTICAL_MONITOR_DATA_FAIL,
    GET_OPTICAL_MONITOR_DATA_SUCCESS
} from './actionTypes'

const INIT_STATE = {
    opticalMonitorData: []
};


const OpticalMonitor_reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_OPTICAL_MONITOR_DATA_SUCCESS:
            return {
                ...state,
                opticalMonitorData: action.payload,
            };
        case GET_OPTICAL_MONITOR_DATA_FAIL:
            return {
                ...state,
                error: action.payload,
            };



        default:
            return state;
    }

};

export default OpticalMonitor_reducer;
