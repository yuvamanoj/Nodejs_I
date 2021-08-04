import React from 'react';
import { shallow } from 'enzyme';

import StatusTable from './table';

describe('<StatusTable />', () => {
    const data = [
        {
            id: '001',
            activity: 'Activity 1',
            status: 'Done',
            timeStamp: '11:00 UTC Jul 6'
        },
        {
            id: '002',
            activity: 'Activity 2',
            status: 'Done',
            timeStamp: '11:00 UTC Jul 6'
        }
    ];

    const component = shallow(<StatusTable tableData={data} />);

    it('should render the component', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render table', () => {
        expect(component.find('DataTable').exists()).toBe(true);
    })


});
