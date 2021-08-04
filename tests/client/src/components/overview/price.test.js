import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Price from '../../../../../client/src/components/overview/Price.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<Price />', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      defaultPrice: 99.99,
      salePrice: 59.99,
      originalPrice: 80.00
    };
    const wrapper = shallow(<Price {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have expected default properties classes:', function () {
    const props = {
      defaultPrice: 99.99
    };
    const wrapper = shallow(<Price {...props} />);
    expect(wrapper.find('#price')).toHaveLength(1);
    expect(wrapper.find('div.sale-price')).toHaveLength(0);
    expect(wrapper.find('div.original-price')).toHaveLength(0);
  });

  it('should have expected sale price classes:', function () {
    const props = {
      defaultPrice: 99.99,
      salePrice: 59.99,
      originalPrice: 80.00
    };
    const wrapper = shallow(<Price {...props} />);
    expect(wrapper.find('#price')).toHaveLength(1);
    expect(wrapper.find('div.sale-price')).toHaveLength(1);
    expect(wrapper.find('div.original-price')).toHaveLength(1);
  });
});