import React from 'react';
import { mount } from 'enzyme';
import ProductCard from '../../../../../client/src/components/related/ProductCard.jsx';

const product = {
  name: 'product',
  id: 11,
  'default_price': 20,
  category: 'category',
  slogan: 'Something about this product. Something very, very long-winded that should be trimmed down.'
};

const action = jest.fn();

// const selectedProduct = product;

describe('<ProductCard/>', () => {
  const card = mount(<ProductCard product={product} selectedProduct={product} type='Outfit' selectProduct={action} />);

  it('renders', () => {
    expect(card.find('div.rp-card')).toBeTruthy();
  });

  // test('Should call selectProduct when ProductCard is clicked', () => {
  //   const instance = card.instance();
  //   card.find('div.rp-card').simulate('click');
  //   expect(instance.props.selectProduct).toHaveBeenCalled();
  // });
  // test('Long titles should be trimmed to 64 characters', () => {
  //   expect(card.find('span.rp-title').text().length).toBeLessThan(64);
  // });
});