import React from 'react';
import { shallow, mount } from 'enzyme';

import RatingProgress from '../../../../../client/src/components/ratingsReviews/RatingProgress.jsx';

describe('<RatingProgress />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<RatingProgress debug/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not contain a loading element if data not provided:', function () {
    const wrapper = mount(<RatingProgress />);
    expect(wrapper.find('div')).toHaveLength(0);
  });
});