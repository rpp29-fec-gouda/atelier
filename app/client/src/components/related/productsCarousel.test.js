import React from 'react';
import { shallow } from 'enzyme';
import ProductsCarousel from '../../../../../client/src/components/related/ProductsCarousel.jsx';

const products = [
  {name: 'aProduct', id: 11},
  {name: 'anotherProduct', id: 12}
];

describe('<ProductsCarousel />', () => {
  const carousel = shallow(<ProductsCarousel productIds={[11, 12]} />);
  it('renders', () => {
    expect(carousel.find('div#ProductsCarousel')).toHaveLength(1);
  });
  // const instance = relatedProducts.instance();


  // instance.updateOutfit({name: 'Product', id: 11});

  // expect(relatedProducts.props.outfit.length).toEqual(1);
});