'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import StreamHeader from './StreamHeader';

describe('<StreamHeader />', () => {
  const render = (title, streamType, displayTime, items) =>
    shallow(<StreamHeader
      title={title}
      streamType={streamType}
      displayTime={displayTime}
      items={items || []}
    />);
  it('renders', () => {
    expect(render('test', 'testType', false).find('.stream-header').exists()).toEqual(true);
  });

  it('renders the title', () => {
    expect(render('test', 'testType', false).find('h1').text()).toEqual('test');
  });

  it("doesn't render the time if displayTime prop is not passed", () => {
    expect(render('test', 'testType', false).find('.stream-time').exists()).toEqual(false);
  });

  it('does not render ExportMenu when items are empty', () => {
    expect(render('test', 'testType', false, []).find('.export').exists()).toEqual(false);
  });

  it('does not render a breadcrumb if not requested', () => {
    const elem = render('test', 'otherStreamType', false);
    const menuItems = elem.find('.menu-item');
    expect(menuItems.length).toEqual(0);
    expect(elem.find('.title-content span').length).toEqual(0);
  });

  it('renders a breadcrumb for new-ticket page', () => {
    const elem = render('The Title', 'new-ticket', false);
    const menuItems = elem.find('.menu-item');
    expect(menuItems.length).toEqual(2);
    expect(menuItems.at(0).text()).toEqual('Home');
    expect(menuItems.at(menuItems.length - 1).text()).toEqual('Your requests');
    expect(elem.find('.title-content span').at(0).text()).toEqual('The Title');
  });

  it('renders a breadcrumb for new-pam-request', () => {
    const elem = render('The Title', 'new-pam-request', false);
    const menuItems = elem.find('.menu-item');
    expect(menuItems.length).toEqual(3);
    expect(menuItems.at(0).text()).toEqual('Home');
    expect(menuItems.at(menuItems.length - 1).text()).toEqual('Create New Request');
    expect(elem.find('.title-content span').at(0).text()).toEqual('The Title');
  });
});
