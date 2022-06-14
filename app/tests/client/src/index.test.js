import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../../../client/src/index.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('Test App Entry point', function () {
  it('should have a paragraph tag with "Loading...":', function () {
    const wrapper = shallow(<App init={{id: 11}} isTesting={true} />);
    expect(wrapper.find('p').text()).toEqual('Loading...');
  });

  it('renders without crashing given the required props', () => {
    const props = {
      init: { id: 11 },
      isTesting: true
    };
    const wrapper = shallow(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
