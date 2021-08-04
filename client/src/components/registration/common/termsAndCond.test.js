import { shallow } from 'enzyme';
import React from 'react';

import TermsAndCond from './termsAndCond';

describe('<TermsAndCond />', () => {
    const component = shallow(<TermsAndCond />);

    it('should render the TermsAndCond component', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render a checkbox with label `Terms and Conditions`', () => {
        expect(component.find('Checkbox').exists()).toBe(true);
        expect(component.find('.bx--label').html()).toContain('Terms and Conditions');        
    });

    it('checkbox should be unchecked by default', () => {
        expect(component.find('Checkbox').prop('checked')).toBe(undefined);
    });
});