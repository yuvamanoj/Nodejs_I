import { call, put, takeEvery } from 'redux-saga/effects';

import { postRegistrationSuccess, postRegistrationFailure } from '../actions/registration';
import { POST_REGISTRATION } from '../actionTypes/registration';

// import apiClient from '../api/client';

const baseUrl = 'https://cerberus-tab-bff-xpp.apps-priv.dal09-dev-ocp-01.cl.sec.ibm.com';
const Url = `${process.env.REACT_APP_BASE_URL}`;

export const postRegReq = async (reqData) => {
    console.log('Reg Req Data =>', reqData);
    // return (await apiClient).apis.default.registerUser(null, {
    //     requestBody: reqData
    // });
};

export function* postRegistrationRequestSaga(action) {
  const { regData } = action;
  console.log('Reg Req Dataaaa =>', regData, Url);
  try {
    // const result = yield call(postRegReq, regData);
    const result = yield call(fetch, `${baseUrl}/register`, {
      method: "POST",
      headers: { 'Authorization': 'Token tokenid',
                "Content-Type": "application/json",},
      body : JSON.stringify(regData)
    });
    console.log("RESULT", result);
    if (result.status === 200 || result.status === 201) {
      yield put(postRegistrationSuccess(result));
    } else {
      yield put(postRegistrationFailure({message: 'request failed'}));
    }
  } catch (e) {
    console.log('err', e);
    yield put(postRegistrationFailure(e));
  }
}

export const postRegRequestSaga = takeEvery(POST_REGISTRATION, postRegistrationRequestSaga);
