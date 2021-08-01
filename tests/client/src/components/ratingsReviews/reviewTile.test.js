import React from 'react';
import { shallow } from 'enzyme';

import ReviewTile from '../../../../../client/src/components/ratingsReviews/ReviewTile.jsx';

describe('<ReviewTile />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<ReviewTile debug/>);
    expect(wrapper).toMatchSnapshot();
  });
});