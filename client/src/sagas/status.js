import { call, put, takeEvery } from 'redux-saga/effects';

import { getStatusSuccess, getStatusFailure, getStatusDetailsSuccess, getStatusDetailsFailure } from '../actions/status';
import { GET_STATUS, GET_STATUS_DETAILS } from '../actionTypes/status';

// import apiClient from '../api/client';
const url = 'https://cerberus-tab-bff-xpp.apps-priv.dal09-dev-ocp-01.cl.sec.ibm.com';
// const url = process.env.REACT_APP_BASE_URL;


export function* getStatusSaga(action) {
  const { uid } = action;
  // console.log('Status Req Dataaaa =>', uid);
  try {
    const result = yield call(fetch, `${url}/status/${uid}`, {
      method: "GET"
    });

    const statusResp = yield result.json();
    console.log("RESULT", statusResp);
    
    if (result.status === 200 || result.status === 201) {      
        yield put(getStatusSuccess(statusResp));        
    } else {
        yield put(getStatusFailure(statusResp.code));
    }
    
  } catch (e) {
    yield put(getStatusFailure(e));
  }
}

export function* getStatusDetailsSaga(action) {
  const { cid } = action;
  // console.log('StatusDetails Req Dataaaa =>', cid);
  try {
    const result = yield call(fetch, `${url}/statusdetails/${cid}`, {
      method: "GET"
    });

    const statusDetailsResp = yield result.json();
    console.log("RESULT", statusDetailsResp);
    
    if (result.status === 200 || result.status === 201) {      
        yield put(getStatusDetailsSuccess(statusDetailsResp));        
    }
    
  } catch (e) {
    yield put(getStatusDetailsFailure(e));
  }
}

export const getStatusReqSaga = takeEvery(GET_STATUS, getStatusSaga);
export const getStatusDetailSaga = takeEvery(GET_STATUS_DETAILS, getStatusDetailsSaga);
