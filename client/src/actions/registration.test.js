import * as types from '../actionTypes/registration';
import * as actions from './registration';

describe('Registration action creators', () => {
    const regData = {
        companyName: 'Test',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com',
        phoneNumber: '1234567890',
        platform: 'ibmCloudRoks',
        region: 'west',
        resourceGroup: 'test1',
        clusterId: '123456789',
        toolset: 'pcc',
        apiKey: 'test',
        licenseKey: 'testlicense'
    };

    const registrationResp = {
        companyName: 'Test',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com',
        phoneNumber: '1234567890',
        platform: 'ibmCloudRoks',
        region: 'west',
        resourceGroup: 'test1',
        clusterId: '123456789',
        toolset: 'pcc',
        apiKey: 'test',
        licenseKey: 'testlicense'
    };

    it('should create an action for registration', () => {
        const expectedAction = {
          type: types.POST_REGISTRATION,
          regData
        };
        expect(actions.postRegistration(regData)).toEqual(expectedAction);
    });

    it('should create an action for registration with success', () => {
        const expectedAction = {
          type: types.POST_REGISTRATION_SUCCESS,
          registrationResp
        };
        expect(actions.postRegistrationSuccess(registrationResp)).toEqual(expectedAction);
    });

    it('should create an action for registration with failure', () => {
        const error = jest.fn();
        const expectedAction = {
          type: types.POST_REGISTRATION_FAILED,
          error
        };
        expect(actions.postRegistrationFailure(error)).toEqual(expectedAction);
    });

});