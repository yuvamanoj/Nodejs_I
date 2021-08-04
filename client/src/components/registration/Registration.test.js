import Enzyme, { mount } from 'enzyme';
import { useDispatch, Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import * as reactRedux from 'react-redux';

import Registration from './Registration';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const initialState = {
    reqData: {},
    registration: {
        isFetching: false,
        isRegistered: false
    },
    status: ''
  };

  const customState = JSON.parse(JSON.stringify(initialState));
  const customStore = mockStore(customState);

describe('<Registration />', () => {
    const component = mount(
        <Provider store={customStore}>
            <Registration />
        </Provider>);

    it('should render', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render left panel with given title and steps', () => {
        expect(component.find('.progress-header').html()).toContain('Registration Steps');
        expect(component.find('.progress-title-desc').html()).toContain('Step');
        expect(component.find('ProgressStep').length).toEqual(5);
    });

    it('should render the form on right panel', () => {
        expect(component.find('.form-cont-title').html()).toContain('Contact Information');
        expect(component.find('Input').length).toEqual(5);
        expect(component.find('Input').at(0).prop('id')).toBe('companyName');
        expect(component.find('Input').at(3).prop('id')).toBe('email');
    });

    it('should render the buttons', () => {
        expect(component.find('Button').length).toEqual(2);
        expect(component.find('.back-btn-cont').exists()).toBe(true);
        expect(component.find('Button').at(1).prop('disabled')).toBe(true);
    });
});


