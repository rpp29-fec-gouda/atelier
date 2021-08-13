import React from 'react';
import { shallow, mount } from 'enzyme';

import RatingList from '../../../../../client/src/components/ratingsReviews/RatingList.jsx';

describe('<RatingList />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<RatingList debug/>);
    expect(wrapper).toMatchSnapshot();
  });
});