import { postRegistrationSuccess, postRegistrationFailure } from '../actions/registration';
import reducer, { initialState } from './registration';

describe('registration reducer', () => {
    const error = 'error';

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

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle postRegistrationSuccess', () => {
        expect(reducer([], postRegistrationSuccess(registrationResp))).toHaveProperty('isFetching', false);
    });

    it('should handle postRegistrationFailure', () => {
        expect(reducer([], postRegistrationFailure(error))).toHaveProperty('isRegistered', false);
    });
});