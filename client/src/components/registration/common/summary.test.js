import { shallow } from 'enzyme';
import React from 'react';
import Summary from './summary';

describe('<Summary />', () => {
    const userData = {
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

    const component = shallow(<Summary data={userData} />);    

    it('should render the component', () => {
        expect(component.exists()).toBe(true);        
    });

    it('should render the page info', () => {
        expect(component.find('.title-info').html()).toContain('Please ensure that all the information below is correct');
    });

    it('should render contact info with value entered by user', () => {
        expect(component.find('.title-header').at(0).html()).toContain('Contact Information');
        expect(component.find('.prop-name').at(0).html()).toContain('Company');
        expect(component.find('.prop-value').at(0).html()).toContain(userData.companyName);
        expect(component.find('.prop-name').at(1).html()).toContain('First Name');
        expect(component.find('.prop-value').at(1).html()).toContain(userData.firstName);
        expect(component.find('.prop-name').at(3).html()).toContain('Email');
        expect(component.find('.prop-value').at(3).html()).toContain(userData.email);
    });

    it('should render cloud environment with value entered by user', () => {
        expect(component.find('.title-header').at(1).html()).toContain('Cloud Environment');
        expect(component.find('.prop-name').at(6).html()).toContain('API Key');
        expect(component.find('.prop-value').at(6).html()).toContain(userData.apiKey);
        expect(component.find('.prop-name').at(9).html()).toContain('Cloud Cluster ID');
        expect(component.find('.prop-value').at(9).html()).toContain(userData.clusterId);        
    });

    it('should render Toolset with value entered by user', () => {
        expect(component.find('.title-header').at(2).html()).toContain('Toolset');
        expect(component.find('.prop-name').at(10).html()).toContain('Toolset');
        expect(component.find('.prop-value').at(10).html()).toContain('Prisma Cloud Compute');
    });
});
