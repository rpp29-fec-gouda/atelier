import React from 'react';
import { shallow } from 'enzyme';

import KeywordSearch from '../../../../../client/src/components/ratingsReviews/KeywordSearch.jsx';

describe('<KeywordSearch />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<KeywordSearch debug/>);
    expect(wrapper).toMatchSnapshot();
  });
});