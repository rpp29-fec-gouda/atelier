import React from 'react';
import { mount } from 'enzyme';
import Outfit from '../../../../../client/src/components/related/Outfit.jsx';

describe('<Outfit />', () => {
  const updateOutfit = jest.fn();
  const outfit = mount(<Outfit selectedProduct={{name: 'Product'}} outfit={[]} updateOutfit={updateOutfit} />);
  it('Renders', () => {
    expect(outfit.find('div#Outfit')).toHaveLength(1);
  });

  it('Should call updateOutfit when clicked', () => {
    outfit.find('div.rp-card-placeholder').simulate('click');
    expect(updateOutfit).toHaveBeenCalled();
  });

  // const element = outfit.find('#Outfit');

  // console.log(outfit.state);

  // expect(outfit.props('outfit').length).toEqual(1);
});
/*
const wrapper = mount(<MyComponent />);
expect(wrapper.find('.foo')).to.have.lengthOf(1);
expect(wrapper.find('.bar')).to.have.lengthOf(3);

// compound selector
expect(wrapper.find('div.some-class')).to.have.lengthOf(3);

// CSS id selector
expect(wrapper.find('#foo')).to.have.lengthOf(1);

// property selector
expect(wrapper.find('[htmlFor="checkbox"]')).to.have.lengthOf(1);
*/