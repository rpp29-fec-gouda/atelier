import React from 'react';
import { shallow } from 'enzyme';
import Outfit from './Outfit.jsx';

test('Product is added to outfit when "Add to Outfit" card is clicked', () => {
  const outfit = shallow(<Outfit selectedProduct={{name: 'Product'}} products={[]} />);

  expect(outfit.state('products').length).toEqual(0);

  outfit.find('.addToOutfit').simulate('click');
  // console.log(outfit.state);

  expect(outfit.state('products').length).toEqual(1);
});

test('Product is removed from outfit when "action" button is clicked', () => {
  const outfit = shallow(<Outfit selectedProduct={{name: 'Product'}} products={[{name: 'Product'}]} />);
  const instance = outfit.instance();

  instance.removeFromOutfit({name: 'Product'});

  expect(outfit.state('products').length).toEqual(0);
});