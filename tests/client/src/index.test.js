import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import {mount, shallow} from 'enzyme';
import React from 'react';

import App from '../../../client/src/index.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<ContactsRoute />', () => {
  test('renders', () => {
    // Basic test for React is below:
    const wrapper = mount(<App />); // mount/render/shallow when applicable

    // Assert that the given enzyme wrapper has rendered content.
    expect(wrapper.find('div')).toBeTruthy();
    expect(wrapper.find('h3')).toBeTruthy();
    expect(wrapper.find('ul')).toEqual({});

    // Assert that the given wrapper contains at least one match for the given selector:
    // expect(wrapper).toContainMatchingElement('.app');

    // Assert that the given wrapper contains exactly one match for the given selector:
    // https://jestjs.io/docs/tutorial-async
    // expect(wrapper).toContainExactlyOneMatchingElement('.app');
    expect(wrapper.find('.app')).toBeTruthy();
  });
});


