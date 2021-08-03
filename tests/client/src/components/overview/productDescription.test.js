import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ProductDescription from '../../../../../client/src/components/overview/ProductDescription.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<ProductDescription />', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      slogan: 'Better, faster, stronger!',
      description: 'This product is too good to be true! Never breaks down'
    };
    const wrapper = shallow(<ProductDescription {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have expected content from provided properties:', function () {
    const props = {
      slogan: 'Better, faster, stronger!',
      description: 'This product is too good to be true! Never breaks down'
    };
    const wrapper = shallow(<ProductDescription {...props} />);
    expect(wrapper.find('#product-description')).toHaveLength(1);
    expect(wrapper.find('h2').text()).toEqual(props.slogan);
    expect(wrapper.find('#product-description div').text()).toEqual(props.description);
  });
});