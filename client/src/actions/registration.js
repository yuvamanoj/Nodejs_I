import * as types from '../actionTypes/registration';

export const postRegistration = (regData) => ({ type: types.POST_REGISTRATION, regData });

export const postRegistrationSuccess = (registrationResp) => ({
  type: types.POST_REGISTRATION_SUCCESS,
  registrationResp
});

export const postRegistrationFailure = (error) => ({
  type: types.POST_REGISTRATION_FAILED,
  error
});
