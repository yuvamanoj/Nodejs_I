import React from 'react';
import { shallow } from 'enzyme';

import StatusCard from './tile';


describe('<StatusCard />', () => {
    const statusData = {
        clusterId: '123456789',
        isTrail: true,
        regDate: '6th July, 2021',
        currentActivity: 'Installation',
        status: 'ongoing'
    }

    const component = shallow(<StatusCard data={statusData} />);

    it('should render the component', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render required items based on statusData', () => {
        expect(component.find('.tile-header').html()).toContain(statusData.clusterId);
        expect(component.find('.tile-sub-header').text()).toBe('Trial');
        expect(component.find('.gray').exists()).toBe(true);
        expect(component.find('Button').html()).toContain('View details');
    });

});