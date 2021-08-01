import React from 'react';
import { shallow } from 'enzyme';

import ProductBreakdown from '../../../../../client/src/components/ratingsReviews/ProductBreakdown.jsx';

describe('<ProductBreakdown />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<ProductBreakdown debug/>);
    expect(wrapper).toMatchSnapshot();
  });
});