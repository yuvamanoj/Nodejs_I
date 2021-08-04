import { shallow } from 'enzyme';
import React from 'react';

import ContactInfo from './contact-info';

describe('<ContactInfo />', () => {
    const contactInfo = {
        companyName: 'Test',
        firstName: 'New',
        lastName: 'User',
        email: 'user@new.com',
        phoneNumber: '1234567890'
    }

    const component = shallow(<ContactInfo data={contactInfo} />);

    it('should render the component', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render 5 input fields', () => {
        expect(component.find('Input').length).toEqual(5);
        expect(component.find('Input').at(0).prop('id')).toContain('companyName');
        expect(component.find('Input').at(3).prop('label')).toContain('Email');
        expect(component.find('Input').at(4).prop('placeholder')).toContain('(Optional)');
    });

});