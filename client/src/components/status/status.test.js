import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { useDispatch, Provider } from "react-redux";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';

import Status from './Status';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

const initialState = {    
    status: {
        statusData: [{
            clusterId: '123456789',
            isTrail: true,
            regDate: '6th July, 2021',
            currentActivity: 'Installation',
            status: 'ongoing'
        }],
        statusDetails: [],
        isFetching: false,
        isError: false,
        isStatus: false,
        isStatusDetails: false
    },
    registration: {
        isRegistered: false
    }   
  };

  const customState = JSON.parse(JSON.stringify(initialState));
  const customStore = mockStore(customState);

describe('<Status />', () => {
    const component = mount(
            <Provider store={customStore}>
                <Status />
            </Provider>);

    it('should render the component', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render header', () => {
        expect(component.find('StreamHeader').exists()).toBe(true);
        expect(component.find('.status-cont-title').exists()).toBe(true);
    });
});
