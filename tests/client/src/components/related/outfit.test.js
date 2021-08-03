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
