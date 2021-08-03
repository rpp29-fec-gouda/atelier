import React from 'react';
import { mount } from 'enzyme';
import ProductCard from '../../../../../client/src/components/related/ProductCard.jsx';

const product = {
  name: 'product',
  id: 11,
  'default_price': 20,
  category: 'category',
  slogan: 'something about this product'
};

// const selectedProduct = product;

describe('<ProductCard/>', () => {
  const card = mount(<ProductCard product={product} selectedProduct={product} />);

  it('renders', () => {
    expect(card.find('div.rp-card')).toBeTruthy();
  });
});