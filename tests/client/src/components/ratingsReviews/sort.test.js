import React from 'react';
import { shallow, mount } from 'enzyme';

import Sort from '../../../../../client/src/components/ratingsReviews/Sort.jsx';

describe('<Sort />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<Sort debug/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<Sort />);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').text()).toEqual('Loading...');
  });
});