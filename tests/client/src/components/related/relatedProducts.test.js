import React from 'react';
import { mount } from 'enzyme';
import RelatedProducts from '../../../../../client/src/components/related/RelatedProducts.jsx';

const products = [
  {name: 'aProduct', id: 11},
  {name: 'anotherProduct', id: 12}
];

const selectedProduct = {
  name: 'product',
  id: 11,
  'default_price': 20,
  category: 'category',
  slogan: 'like any other product, but selected'
};

// const selectedProduct = product;

describe('<RelatedProducts />', () => {
  const component = mount(<RelatedProducts products={products} selectedProduct={selectedProduct} />);

  it('renders', () => {
    expect(component.find('div.rp-card')).toBeTruthy();
  });
});