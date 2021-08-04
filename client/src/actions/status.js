import * as types from '../actionTypes/status';

export const getStatus = (uid) => ({
  type: types.GET_STATUS,
  uid
});

export const getStatusSuccess = (statusResp) => ({
  type: types.GET_STATUS_SUCCESS,
  statusResp
});

export const getStatusFailure = (error) => ({
  type: types.GET_STATUS_FAILED,
  error
});

export const getStatusDetails = (cid) => ({
  type: types.GET_STATUS_DETAILS,
  cid
});

export const getStatusDetailsSuccess = (statusDetailResp) => ({
  type: types.GET_STATUS_DETAILS_SUCCESS,
  statusDetailResp
});

export const getStatusDetailsFailure = (error) => ({
  type: types.GET_STATUS_DETAILS_FAILED,
  error
});
