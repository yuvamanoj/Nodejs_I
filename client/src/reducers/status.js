import { GET_STATUS, GET_STATUS_SUCCESS, GET_STATUS_FAILED, GET_STATUS_DETAILS, GET_STATUS_DETAILS_SUCCESS, GET_STATUS_DETAILS_FAILED } from '../actionTypes/status';

export const initialState = {
    statusData: [],
    statusDetails: [],
    isFetching: false,
    isError: false,
    isStatus: false,
    isStatusDetails: false
};

const reducer = (state = initialState, action) => {
    console.log('status', action);
    switch (action.type) {
        case GET_STATUS:
            return { ...state, isFetching: true };
        case GET_STATUS_DETAILS:
                return { ...state, isFetching: true };    
        case GET_STATUS_SUCCESS:
            return { ...state, statusData: action.statusResp, isFetching: false, isStatus: true };
        case GET_STATUS_DETAILS_SUCCESS:
                return { ...state, statusDetails: action.statusDetailResp, isFetching: false, isStatusDetails: true };    
        case GET_STATUS_FAILED:
            return { ...state, error: action.error, isFetching: false, isError: true, isStatus: false };
        case GET_STATUS_DETAILS_FAILED:
                return { ...state, error: action.error, isFetching: false, isError: true, isStatusDetails: false };    
        default:
            return { ...state };
    }
};

export default reducer;
