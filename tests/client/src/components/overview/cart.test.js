import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Cart from '../../../../../client/src/components/overview/Cart.jsx';
import SizeSelector from '../../../../../client/src/components/overview/SizeSelector';
import QuantitySelector from '../../../../../client/src/components/overview/QuantitySelector';
import AddButton from '../../../../../client/src/components/shared/AddButton';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<Cart />', function () {
  it('renders without crashing given the required props', () => {
    const props = {
      skus: {
        941278: {quantity: 8, size: 'XS'},
        941279: {quantity: 16, size: 'S'},
        941280: {quantity: 17, size: 'M'},
        941281: {quantity: 10, size: 'L'},
        941282: {quantity: 15, size: 'XL'},
        941283: {quantity: 6, size: 'XXL'}
      }
    };
    const wrapper = shallow(<Cart {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<Cart />);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').text()).toEqual('Loading Cart...');
  });

  it('should have expected content from provided properties:', function () {
    const props = {
      skus: {
        941278: {quantity: 8, size: 'XS'},
        941279: {quantity: 16, size: 'S'},
        941280: {quantity: 17, size: 'M'},
        941281: {quantity: 10, size: 'L'},
        941282: {quantity: 15, size: 'XL'},
        941283: {quantity: 6, size: 'XXL'}
      }
    };
    const wrapper = mount(<Cart {...props} />);
    expect(wrapper.find('#po-cart')).toHaveLength(1);
    expect(wrapper.find(SizeSelector)).toHaveLength(1);
    expect(wrapper.find(QuantitySelector)).toHaveLength(1);
    expect(wrapper.find(AddButton)).toHaveLength(1);
    expect(wrapper.find('.error-prompt')).toHaveLength(0);
    expect(wrapper.instance().isInStock).toEqual(true);
    expect(wrapper.state().currentSku).toEqual(null);
    expect(wrapper.state().promptSelection).toEqual(false);
    expect(wrapper.state().currentQuantity).toEqual(0);
    expect(wrapper.state().bag).toEqual([]);
  });

  it('should not have AddButton if out of stock:', function () {
    const props = {
      skus: {}
    };
    const wrapper = mount(<Cart {...props} />);
    expect(wrapper.instance().isInStock).toEqual(false);
    expect(wrapper.find(AddButton)).toHaveLength(0);
  });

  it('should display prompt if Add Button clicked without size selection:', function () {
    const props = {
      skus: {
        941278: {quantity: 0, size: 'XS'}
      }
    };
    const wrapper = mount(<Cart {...props} />);
    wrapper.find('#checkout').first().simulate('click');
    expect(wrapper.find('.error-prompt')).toHaveLength(1);
    expect(wrapper.find('.error-prompt').text()).toEqual('Please select size');
    expect(wrapper.state().promptSelection).toEqual(true);
  });

  it('should generate po-cart orders:', function () {
    const props = {
      skus: {
        941278: {quantity: 8, size: 'XS'},
        941279: {quantity: 16, size: 'S'},
        941280: {quantity: 17, size: 'M'},
        941281: {quantity: 10, size: 'L'},
        941282: {quantity: 15, size: 'XL'},
        941283: {quantity: 6, size: 'XXL'}
      }
    };
    const wrapper = mount(<Cart {...props} />);

    expect(wrapper.find('#po-cart')).toHaveLength(1);
    expect(wrapper.find(SizeSelector)).toHaveLength(1);
    expect(wrapper.find(QuantitySelector)).toHaveLength(1);
    expect(wrapper.find(AddButton)).toHaveLength(1);
    expect(wrapper.find('.error-prompt')).toHaveLength(0);
    expect(wrapper.instance().isInStock).toEqual(true);
    expect(wrapper.state().currentSku).toEqual(null);
    expect(wrapper.state().promptSelection).toEqual(false);
    expect(wrapper.state().currentQuantity).toEqual(0);
    expect(wrapper.state().bag).toEqual([]);

    wrapper.find('#po-sizes').simulate('change', { target: { value: "941279" } });
    expect(wrapper.state().currentSku).toEqual("941279");

    wrapper.find('#po-quantity').find('option').at(0).instance().selected = false;
    wrapper.find('#po-quantity').find('option').at(1).instance().selected = true;
    wrapper.find('#po-quantity').simulate('change', { target: { value: 2 } });
    expect(wrapper.state().currentQuantity).toEqual(2);

    wrapper.find('#checkout').first().simulate('click');
    expect(wrapper.state().bag).toEqual([{sku: "941279", quantity: 2}]);
  });

  it('should have quantity default to 1 if a new style is chosen:', function () {
    const props = {
      skus: {
        941278: {quantity: 8, size: 'XS'},
        941279: {quantity: 16, size: 'S'},
        941280: {quantity: 17, size: 'M'},
        941281: {quantity: 10, size: 'L'},
        941282: {quantity: 15, size: 'XL'},
        941283: {quantity: 6, size: 'XXL'}
      }
    };
    const wrapper = mount(<Cart {...props} />);

    wrapper.find('#po-sizes').simulate('change', { target: { value: "941279" } });
    expect(wrapper.state().currentQuantity).toEqual(1);
  });
});