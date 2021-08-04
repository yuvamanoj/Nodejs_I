import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

describe('App', () => {
  let component;

  it('render', () => {
    component = shallow(<App />);
    expect(component.exists()).toBe(true);
  });

  it('renders Registration route', () => {
    expect(component.find('Registration').exists()).toEqual(false);
    const routes = component.find('Route');
    routes.forEach((route) => {
      if (route.getElement().props === '/') {
        expect(route.getElement().props.render()).toBeCalled();
        expect(component.find('Registration').exists()).toEqual(true);
      }
    });
  });
});
