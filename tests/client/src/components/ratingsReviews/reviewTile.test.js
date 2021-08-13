import React from 'react';
import { shallow, mount } from 'enzyme';

import ReviewTile from '../../../../../client/src/components/ratingsReviews/ReviewTile.jsx';

describe('<ReviewTile />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<ReviewTile debug/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<ReviewTile />);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').text()).toEqual('Loading...');
  });
});