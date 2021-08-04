import { POST_REGISTRATION, POST_REGISTRATION_SUCCESS, POST_REGISTRATION_FAILED } from '../actionTypes/registration';

export const initialState = {
    reqData: {},
    isFetching: false,
    isRegistered: false,
    isError: false,
    status: ''
};

const reducer = (state = initialState, action) => {
    console.log('Registration', action);
    switch (action.type) {
        case POST_REGISTRATION:
            return { ...state, requestId: '', isFetching: true, isRegistered: false, isError: false };
        case POST_REGISTRATION_SUCCESS:
            return { ...state, status: action.registrationResp.status, isFetching: false, isRegistered: true, isError: false };
        case POST_REGISTRATION_FAILED:
            return { ...state, error: action.error, isError: true, isFetching: false, isRegistered: false };
        default:
            return { ...state };
    }
};

export default reducer;
