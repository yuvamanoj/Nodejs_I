import { shallow, mount } from 'enzyme';
import React from 'react';
import Menu from './Menu';

describe('<Menu />', () => {
    it('renders', () => {
        const component = shallow(<Menu />);
        expect(component.exists()).toBe(true);
    });

    // it('adds visible banner class to shell when displayDemoBanner = false', () => {
    //     mount(<Menu />);
    //     expect(document.querySelector('.security--shell').classList.contains('security--shell--banner-visible')).toBe(true);
    // });

})
