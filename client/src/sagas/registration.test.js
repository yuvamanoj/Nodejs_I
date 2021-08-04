import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { postRegistrationSuccess, postRegistrationFailure, postRegistration} from '../actions/registration';

import { postRegReq, postRegistrationRequestSaga } from './registration';

describe('Registration request saga', () => {    
    const regResp = {
        reqData: {},
        isFetching: false,
        isRegistered: false,
        status: '200'
    };
    
    beforeEach(async function () {
        fetch.resetMocks()
        fetch.dontMock()
    })

    const url = `https://bff-devops.cloudtribe-devops-024f02d285327b3efec3badccd07e2a1-0000.us-south.containers.appdomain.cloud/register`;

    it('tests the api call', async () => {
        fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { regResp } }), 100)));
        await fetch(url);
        expect(fetch).toBeCalledWith(url);        
    });
    
});
