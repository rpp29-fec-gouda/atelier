import React from 'react';
import { shallow, mount } from 'enzyme';

import ProductBreakdown from '../../../../../client/src/components/ratingsReviews/ProductBreakdown.jsx';

describe('<ProductBreakdown />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<ProductBreakdown debug/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<ProductBreakdown />);
    expect(wrapper.find('div')).toHaveLength(4);
    expect(wrapper.find('div').text()).toEqual('Loading...');
  });
});