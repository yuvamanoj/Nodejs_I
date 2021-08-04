import { shallow } from 'enzyme';
import React from 'react';
import AthenticatedApp from './AuthenticatedApp';

describe('AthenticatedApp', () => {
    let component;

    it('render', () => {
        component = shallow(<AthenticatedApp />);
        expect(component.exists()).toBe(true);
    })
});

