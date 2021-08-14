import React from 'react';
import { shallow, mount } from 'enzyme';

import ReviewsList from '../../../../../client/src/components/ratingsReviews/ReviewsList.jsx';

describe('<ReviewsList />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<ReviewsList debug/>); // mount/render/shallow when applicable
    expect(wrapper).toMatchSnapshot();
    // // // Assert that the given enzyme wrapper has rendered content.
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<ReviewsList />);
    expect(wrapper.find('div')).toHaveLength(9);
    expect(wrapper.find('div').text()).toEqual('Loading...');
  });
});