import React from 'react';
import { shallow } from 'enzyme';
import CloudEnv from './cloud-env';

describe('<CloudEnv />', () => {
    const component = shallow(<CloudEnv />);

    it('should render', () => {
        expect(component.exists()).toBe(true);
        expect(component.find('Select').length).toBe(1);
        expect(component.find('Input').length).toBe(0);
    });
});
