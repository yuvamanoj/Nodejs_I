import { shallow } from 'enzyme';
import React from 'react';

import Toolset from './toolset';

describe('<Toolset />', () => {

    const component = shallow(<Toolset />);

    it('should render the component properly', () => {
        expect(component.exists()).toBe(true);
    });

    it('should not render licenseKey by default', () => {
        expect(component.find('Input').length).toEqual(0);
    });
});