import React from 'react';
import { mount } from 'enzyme';
import Outfit from '../../../../../client/src/components/related/Outfit.jsx';

describe('<Outfit />', () => {
  const updateOutfit = jest.fn();
  const removeFromOutfit = jest.fn();
  jest.mock('axios', () => ({
    __esModule: true,
    default: jest.fn()
  }));

  const outfit = mount(<Outfit selectedProduct={{name: 'Product', id: 11}} productIds={[]} checkCache={() => {}} clickTracker={() => {}} />);
  it('Renders', () => {
    expect(outfit.find('div#Outfit')).toHaveLength(1);
  });

  test('Outfit should be empty before Add to Outfit is clicked', () => {
    expect(outfit.state('outfit')).toHaveLength(0);
  });

  test('Should add a product to Outfit when Add to Outfit card is clicked', () => {
    outfit.find('div.add-to-outfit').simulate('click');
    expect(outfit.state('outfit')).toHaveLength(1);
  });

  test('Should not remove a product from Outfit when removeFromOutfit is called without a matching id', () => {
    const instance = outfit.instance();
    instance.removeFromOutfit(12);
    expect(outfit.state('outfit')).toHaveLength(1);
  });

  test('Should remove a product from Outfit when removeFromOutfit is called with a matching id', () => {
    const instance = outfit.instance();
    instance.removeFromOutfit(11);
    expect(outfit.state('outfit')).toHaveLength(0);
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
