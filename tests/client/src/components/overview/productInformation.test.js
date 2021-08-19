import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ProductInformation from '../../../../../client/src/components/overview/ProductInformation.jsx';
import RatingsSummary from '../../../../../client/src/components/overview/RatingsSummary.jsx';
import Price from '../../../../../client/src/components/overview/Price.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<ProductOverview />', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      name: 'slacker\'s slacks',
      category: 'pants',
      reviewCount: 5,
      averageRating: 2.2,
      defaultPrice: 99.99,
      salePrice: 59.99,
      originalPrice: 80.00
    };
    const wrapper = shallow(<ProductInformation {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have the expected elements based on the properties provided:', function () {
    const props = {
      name: 'slacker\'s slacks',
      category: 'pants',
      reviewCount: 5,
      averageRating: 2.2,
      defaultPrice: 99.99,
      salePrice: 59.99,
      originalPrice: 80.00
    };
    const wrapper = mount(<ProductInformation {...props} />);
    expect(wrapper.find('#po-product-information')).toHaveLength(1);
    expect(wrapper.find('h2.uppercase')).toHaveLength(1);
    expect(wrapper.find('h2.uppercase').text()).toEqual(props.category);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toEqual(props.name);
    expect(wrapper.find(RatingsSummary)).toHaveLength(1);
    expect(wrapper.find(Price)).toHaveLength(1);
  });

  it('should not have a ratings summary component if there are no reviews:', function () {
    const props = {
      name: 'slacker\'s slacks',
      category: 'pants',
      reviewCount: 0,
      averageRating: 2.2,
      defaultPrice: 99.99,
      salePrice: 59.99,
      originalPrice: 80.00
    };
    const wrapper = mount(<ProductInformation {...props} />);
    expect(wrapper.find('#po-product-information')).toHaveLength(1);
    expect(wrapper.find('h2.uppercase')).toHaveLength(1);
    expect(wrapper.find('h2.uppercase').text()).toEqual(props.category);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toEqual(props.name);
    expect(wrapper.find(RatingsSummary)).toHaveLength(0);
    expect(wrapper.find(Price)).toHaveLength(1);
  });
});