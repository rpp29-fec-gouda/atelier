import React from 'react';
import { shallow } from 'enzyme';

import ReviewsList from '../../../../../client/src/components/ratingsReviews/ReviewsList.jsx';

describe('<ReviewsList />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<ReviewsList debug/>); // mount/render/shallow when applicable
    expect(wrapper).toMatchSnapshot();
    // // // Assert that the given enzyme wrapper has rendered content.

  });
});