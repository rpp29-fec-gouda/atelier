import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import RatingsSummary from '../../../../../client/src/components/overview/RatingsSummary.jsx';
import StarRating from '../../../../../client/src/components/shared/StarRating.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<RatingsSummary />', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      reviewCount: 5,
      averageRating: 2.2
    };
    const wrapper = shallow(<RatingsSummary {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have text with the review count shown:', function () {
    const props = {
      reviewCount: 5,
      averageRating: 2.2
    };
    const wrapper = shallow(<RatingsSummary {...props} />);
    expect(wrapper.find('#read-all-reviews').text()).toEqual('Read all 5 reviews');
  });

  it('should have a star rating component with the average rating supplied:', function () {
    const props = {
      reviewCount: 5,
      averageRating: 2.2
    };
    const wrapper = mount(<RatingsSummary {...props} />);
    expect(wrapper.find(StarRating)).toHaveLength(1);
    expect(wrapper.find(StarRating).state().currentRating).toEqual(props.averageRating);
  });

  it('should execute an onclick event on read-all-reviews:', function () {
    const mockCallBack = jest.fn();

    const props = {
      reviewCount: 5,
      averageRating: 2.2,
      callback: mockCallBack
    };
    const wrapper = shallow(<RatingsSummary {...props} />);
    wrapper.find('#read-all-reviews').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});