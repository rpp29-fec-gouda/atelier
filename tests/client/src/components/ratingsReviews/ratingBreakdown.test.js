import React from 'react';
import { shallow } from 'enzyme';

import RatingBreakdown from '../../../../../client/src/components/ratingsReviews/RatingBreakdown.jsx';

describe('<RatingBreakdown />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<RatingBreakdown debug/>);
    expect(wrapper).toMatchSnapshot();
  });
});