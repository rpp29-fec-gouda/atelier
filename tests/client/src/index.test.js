import React from 'react';
import { shallow } from 'enzyme';

import App from '../../../client/src/index.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('Test App Entry point', function () {
  it('should have a header tag with "Temporary Product Selector":', function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('h3').text()).toEqual('Temporary Product Selector');
  });
});
