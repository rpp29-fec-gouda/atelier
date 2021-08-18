import React from 'react';
import { shallow, mount } from 'enzyme';

import RatingBreakdown from '../../../../../client/src/components/ratingsReviews/RatingBreakdown.jsx';

describe('<RatingBreakdown />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<RatingBreakdown debug/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<RatingBreakdown />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});