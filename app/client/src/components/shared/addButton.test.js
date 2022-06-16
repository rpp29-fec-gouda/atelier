import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AddButton from '../../../../../client/src/components/shared/AddButton.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<AddButton />', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      label: 'add to bag',
      id: 'checkout',
      onClick: () => {}
    };
    const wrapper = shallow(<AddButton {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a provided label, id, and pre-defined class:', function () {
    const props = {
      label: 'add to bag',
      id: 'checkout',
      onClick: () => {}
    };
    const wrapper = shallow(<AddButton {...props} />);
    expect(wrapper.find('div').first().text()).toEqual(props.label + '  +');
    expect(wrapper.find(`div#${props.id}`)).toHaveLength(1);
    expect(wrapper.find('div.button')).toHaveLength(1);
  });

  it('should execute click event', () => {
    const mockCallBack = jest.fn();

    const props = {
      label: 'add to bag',
      id: 'checkout',
      onClick: mockCallBack
    };

    const wrapper = shallow(<AddButton {...props} />);
    wrapper.find('div').first().simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});