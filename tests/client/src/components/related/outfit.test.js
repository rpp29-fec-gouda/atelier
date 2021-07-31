import React from 'react';
import { shallow } from 'enzyme';
import Outfit from '../../../../../client/src/components/related/Outfit.jsx';

test('Product is added to outfit when "Add to Outfit" card is clicked', () => {
  const outfit = shallow(<Outfit selectedProduct={{name: 'Product'}} outfit={[]} />);

  expect(outfit.props('outfit').length).toEqual(0);

  outfit.find('.rp-card-placeholder').simulate('click');
  // console.log(outfit.state);

  expect(outfit.props('outfit').length).toEqual(1);
});

test('Product is removed from outfit when "action" button is clicked', () => {
  const outfit = shallow(<Outfit selectedProduct={{id: 11}} outfit={[{name: 'Product', id: 11}, {name: 'AnotherProduct', id: 12}, {name: 'YetAnotherProduct', id: 13}]} />);
  const instance = outfit.instance();

  instance.removeFromOutfit({id: 11});

  expect(outfit.props('outfit').length).toEqual(2);
});