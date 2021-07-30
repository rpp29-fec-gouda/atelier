import React from 'react';
import { shallow } from 'enzyme';

import QA from '../../../../../client/src/components/QA/QA.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<QA testing />', () => {
  test('renders QA', () => {
    const wrapper = shallow(<QA />); // mount/render/shallow when applicable
    // // Assert that the given enzyme wrapper has rendered content.
    expect(wrapper.find('div')).toBeTruthy();

  });

  test('renders 2 questions', () => {

  });

  test('renders rating breakdown', () => {

  });

  test('renders product breakdown', () => {

  });
});