import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ScrollingArrows from '../../../../../client/src/components/shared/ScrollingArrows.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<ScrollingArrows />', () => {
  it('renders without crashing given the required props', () => {
    const wrapper = shallow(<ScrollingArrows />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have expected default properties & class:', function () {
    const wrapper = shallow(<ScrollingArrows />);
    expect(wrapper.state().index).toEqual(0);
    expect(wrapper.instance().min).toEqual(0);
    expect(wrapper.find('.scrolling-arrows-decrement-no-stem')).toHaveLength(1);
    expect(wrapper.find('.scrolling-arrows-increment-no-stem')).toHaveLength(1);
  });

  it('should execute callback event', () => {
    const mockCallBack = jest.fn();

    const props = {
      callback: mockCallBack
    };

    const wrapper = shallow(<ScrollingArrows {...props} />);
    wrapper.find('.scrolling-arrows-decrement').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
    wrapper.find('.scrolling-arrows-increment').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(2);
  });

  it('should decrement & decrement index', () => {
    const wrapper = shallow(<ScrollingArrows />);
    expect(wrapper.state().index).toEqual(0);
    wrapper.find('.scrolling-arrows-increment').simulate('click');
    expect(wrapper.state().index).toEqual(1);
    wrapper.find('.scrolling-arrows-increment').simulate('click');
    expect(wrapper.state().index).toEqual(2);
    wrapper.find('.scrolling-arrows-decrement').simulate('click');
    expect(wrapper.state().index).toEqual(1);
    wrapper.find('.scrolling-arrows-decrement').simulate('click');
    expect(wrapper.state().index).toEqual(0);
    wrapper.find('.scrolling-arrows-decrement').simulate('click');
    expect(wrapper.state().index).toEqual(-1);
  });

  it('should have arrow with stem if specified:', function () {
    const props = {
      stem: true
    };
    const wrapper = shallow(<ScrollingArrows {...props} />);
    expect(wrapper.find('.scrolling-arrows-decrement-stem')).toHaveLength(1);
    expect(wrapper.find('.scrolling-arrows-increment-stem')).toHaveLength(1);
  });

  it('should set default index to min', function () {
    const props = {
      min: 2
    };
    const wrapper = shallow(<ScrollingArrows {...props} />);
    expect(wrapper.state().index).toEqual(props.min);
    expect(wrapper.instance().min).toEqual(props.min);
  });

  it('should increment/decrement from provided starting index', function () {
    const props = {
      index: 1
    };
    const wrapper = shallow(<ScrollingArrows {...props} />);
    expect(wrapper.state().index).toEqual(1);
    wrapper.find('.scrolling-arrows-increment').simulate('click');
    expect(wrapper.state().index).toEqual(2);
    wrapper.find('.scrolling-arrows-decrement').simulate('click');
    expect(wrapper.state().index).toEqual(1);
    wrapper.find('.scrolling-arrows-decrement').simulate('click');
    expect(wrapper.state().index).toEqual(0);
  });

  it('should wrap around decrement to specified max if not capped', function () {
    const props = {
      min: 0,
      max: 3
    };
    const wrapper = shallow(<ScrollingArrows {...props} />);
    expect(wrapper.state().index).toEqual(props.min);
    wrapper.find('.scrolling-arrows-decrement').simulate('click');
    expect(wrapper.state().index).toEqual(props.max);
  });

  it('should wrap around increment to specified min if not capped', function () {
    const props = {
      min: 0,
      max: 2,
      index: 2
    };
    const wrapper = shallow(<ScrollingArrows {...props} />);
    expect(wrapper.state().index).toEqual(props.max);
    wrapper.find('.scrolling-arrows-increment').simulate('click');
    expect(wrapper.state().index).toEqual(props.min);
  });

  it('should hide decrement icon if at min & is capped', function () {
    const props = {
      isCapped: true,
      index: 0,
      min: 0,
      max: 2,
    };
    const wrapper = shallow(<ScrollingArrows {...props} />);
    expect(wrapper.find('.scrolling-arrows-decrement')).toHaveLength(0);
    expect(wrapper.find('.scrolling-arrows-increment')).toHaveLength(1);
  });

  it('should hide increment icon if at max & is capped', function () {
    const props = {
      isCapped: true,
      min: 0,
      max: 2,
      index: 2
    };
    const wrapper = shallow(<ScrollingArrows {...props} />);
    expect(wrapper.find('.scrolling-arrows-decrement')).toHaveLength(1);
    expect(wrapper.find('.scrolling-arrows-increment')).toHaveLength(0);
  });
});