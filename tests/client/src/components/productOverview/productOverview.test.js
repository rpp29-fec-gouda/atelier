import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// Enzyme.configure({ adapter: new Adapter() });

import {mount, shallow} from 'enzyme';
import React from 'react';

import ProductOverview from '../../../client/src/components/ProductOverview.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<ProductOverview />', () => {
  test('renders product information', () => {
    // const wrapper = mount(<ProductOverview />); // mount/render/shallow when applicable

    // // Assert that the given enzyme wrapper has rendered content.
    // expect(wrapper.find('div')).toBeTruthy();
    // expect(wrapper.find('h3')).toBeTruthy();
    // expect(wrapper.find('ul')).toEqual({});
  });

  test('renders style selector', () => {

  });

  test('renders add to card', () => {

  });

  test('renders image gallery', () => {

  });
});