import React from 'react';
import { shallow, mount } from 'enzyme';


import QA from '../../../../../client/src/components/QA/QA.jsx';
import QuestionList from '../../../../../client/src/components/QA/QuestionsList.jsx';
import {productData, questionsData, answersData} from './data.js';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme
describe('<QA testing />', () => {
  test('renders QA', () => {
    const wrapper = shallow(<QA selectedProduct={{id: productData.product_id}} />); // mount/render/shallow when applicable
    const text = wrapper.find('h3').text();
    expect(text).toBe('QUESTIONS & ANSWERS');
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button').length;
    expect(button).toBe(1);
  });

  
});

describe ('Render questions and answer', () => {
  const wrapper = mount(<QuestionList questions={questionsData} />);
  test('should render question body', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.qa-question')).toHaveLength(2);
  });

  test('should add 2 questions when click more answered question button', () => {
    expect(wrapper.find('table.qa-question-table')).toHaveLength(2);
    wrapper.find('.button#qa-more-question').simulate('click');
    expect(wrapper.find('table.qa-question-table')).toHaveLength(4);
  });  
});