import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';

describe('<Input />', () => {
    
    it('should render', () => {
        const component = shallow(<Input 
            labelText="User Name"
            id="username"
            size="xl"
            value="Test"
            invalidText="Please enter valid name"
            placeholder="Username"
            />);
        expect(component.exists()).toBe(true);
        expect(component.find('Tooltip').exists()).toBe(false);
        expect(component.find('Link').exists()).toBe(false);
    });

    it('should render tooltip with link if presemt in props', () => {
        const wrapper = shallow(<Input 
            labelText="User Name"
            id="username"
            size="xl"
            value="Test"
            invalidText="Please enter valid name"
            placeholder="Username"
            isTooltip="true"
            />);

        expect(wrapper.find('Link').exists()).toBe(true);    
    });
});