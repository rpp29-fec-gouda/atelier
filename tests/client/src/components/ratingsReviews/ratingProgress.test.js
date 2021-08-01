import React from 'react';
import { shallow } from 'enzyme';

import RatingProgress from '../../../../../client/src/components/ratingsReviews/RatingProgress.jsx';

describe('<RatingProgress />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<RatingProgress debug/>);
    expect(wrapper).toMatchSnapshot();
  });
});