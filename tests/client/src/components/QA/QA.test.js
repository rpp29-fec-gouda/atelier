import React from 'react';
import { shallow, mount } from 'enzyme';


import QA from '../../../../../client/src/components/QA/QA.jsx';
import QuestionList from '../../../../../client/src/components/QA/QuestionsList.jsx';
import {questionsData} from './data.js';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme
const selectedProduct = {'id': 28218};
describe('<QA testing />', () => {
  test('renders QA', () => {
    const wrapper = shallow(<QA selectedProduct={selectedProduct} />); // mount/render/shallow when applicable
    const text = wrapper.find('h3').text();
    expect(text).toBe('QUESTIONS & ANSWERS');
    expect(wrapper).toMatchSnapshot();
    const button = wrapper.find('button').length;
    expect(button).toBe(1);
  });

  test('should add 2 questions when click more answered question button', () => {
    //const wrapper = mount(<QuestionList questions={questionsData} productId={selectedProduct.id}/>);
    // expect(wrapper.find('table.qa-question-table')).toHaveLength(2);
    // wrapper.find('.button#qa-more-question').simulate('click');
    // expect(wrapper.find('table.qa-question-table')).toHaveLength(4);
  });
});

describe ('Render questions and answer', () => {
  test('should render question body', () => {
    //const wrapper = mount(<QuestionList questions={questionsData} />);
    // expect(wrapper.find('.qa-question')).toHaveLength(2);
    // expect(wrapper.find('.qa-question-body').at(0).text()).toBe('question 1');
  });

  
});