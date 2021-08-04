import { shallow } from 'enzyme';
import React from 'react';
import Login from './Login';

describe('<Login />', () => {
    const component = shallow(<Login />);
    const REDIRECT_PATH = "https://www.ibm.com/account/us-en/signup/register.html?a=ZGNlNzQwZmQtYTI3My00";

    it('should render the login component', () => {        
        expect(component.exists()).toBe(true);        
    });

    it('should render login container', () => {
        expect(component.find('.login-cont').exists()).toBe(true);
    });

    it('should have first line of header as `Log in to IBM`', () => {
        expect(component.find('.title-text').at(0).html()).toContain('Log in to IBM');
    });

    it('should have second line of header as `Container Security`', () => {
        expect(component.find('.title-text').at(1).html()).toContain('Container Security');
    });

    it('should render a link for IBM ID registration', () => {
        expect(component.find('.link').exists()).toBe(true);        
        expect(component.find('Link').prop('href')).toEqual(REDIRECT_PATH);
    });

    it('should render a link with Public url', () => {
        expect(component.find('a').prop('href')).toContain('/api/login');
    });

    it('should render a button for login', () => {
        expect(component.find('Button').exists()).toBe(true);
        expect(component.find('Button').html()).toContain('Login with your IBMid');
    });
});