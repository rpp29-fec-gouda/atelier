import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../../../client/src/index.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('Test App Entry point', function () {
  // it('should have a header tag with "Temporary Product Selector":', function () {
  it('should have a paragraph tag with "Loading...":', function () {
    const wrapper = shallow(<App isTesting={true} />);
    // expect(wrapper.find('h3').text()).toEqual('Temporary Product Selector');
    expect(wrapper.find('p').text()).toEqual('Loading...');
  });

  it('renders without crashing given the required props', () => {
    const props = {
      isTesting: true
    };
    const wrapper = shallow(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
