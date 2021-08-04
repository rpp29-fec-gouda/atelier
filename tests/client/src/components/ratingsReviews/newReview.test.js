import React from 'react';
import { shallow } from 'enzyme';

import NewReview from '../../../../../client/src/components/ratingsReviews/NewReview.jsx';

describe('<NewReview />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<NewReview debug/>);
    expect(wrapper).toMatchSnapshot();
  });
});