import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import StarRating from '../../../../../client/src/components/shared/StarRating.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<StarRating />', () => {
  it('renders without crashing given the required props', () => {
    const wrapper = shallow(<StarRating />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have expected default properties & class:', function () {
    const wrapper = shallow(<StarRating />);
    expect(wrapper.state().currentRating).toEqual(0);
    expect(wrapper.instance().isClickable).toEqual(false);
    expect(wrapper.instance().maxStars).toEqual(5);
    expect(wrapper.find('div.star-rating')).toHaveLength(1);
  });

  it('should have a specified rating if below max:', function () {
    const props = {
      rating: 3.81
    };
    const wrapper = shallow(<StarRating {...props} />);
    expect(wrapper.state().currentRating).toEqual(props.rating);
  });

  it('should have a max rating if specified rating is above max:', function () {
    const props = {
      rating: 6.81
    };
    const wrapper = shallow(<StarRating {...props} />);
    expect(wrapper.state().currentRating).toEqual(5);
  });

  it('should have a custom max rating if specified:', function () {
    const props = {
      max: 4
    };
    const wrapper = shallow(<StarRating {...props} />);
    expect(wrapper.instance().maxStars).toEqual(props.max);
  });

  it('should have the same number of empty star elements as max stars for no current rating:', function () {
    const props = {
      max: 3
    };
    const wrapper = shallow(<StarRating {...props} />);
    expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
  });

  it('should have the same number of star elements as max stars for current rating with partial star:', function () {
    const props = {
      max: 4,
      rating: 2.81
    };
    const wrapper = shallow(<StarRating {...props} />);
    expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
  });

  it('should be clickable if given a callback:', function () {
    const props = {
      callback: () => {}
    };
    const wrapper = shallow(<StarRating {...props} />);
    expect(wrapper.instance().isClickable).toEqual(true);
  });

  it('should execute callback event', () => {
    const mockCallBack = jest.fn();

    const props = {
      rating: 3.81,
      callback: mockCallBack
    };

    const wrapper = shallow(<StarRating {...props} />);
    wrapper.find('img').first().simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should execute onMouseOver & onMouseOut events if clickable', () => {
    const props = {
      rating: 3.81,
      callback: () => {}
    };

    const wrapper = mount(<StarRating {...props} />);
    wrapper.find('img').first().simulate('mouseover');
    expect(wrapper.state().currentRating).toEqual('1');

    wrapper.find('div.star-rating').first().simulate('mouseout');
    expect(wrapper.state().currentRating).toEqual(props.rating);
  });

  it('should not execute onMouseOver or onMouseOut events if not clickable', () => {
    const props = {
      rating: 3.81
    };

    const wrapper = mount(<StarRating {...props} />);
    wrapper.find('img').first().simulate('mouseover');
    expect(wrapper.state().currentRating).toEqual(props.rating);

    wrapper.find('div.star-rating').first().simulate('mouseout');
    expect(wrapper.state().currentRating).toEqual(props.rating);
  });
});