import React from 'react';
import { shallow, mount } from 'enzyme';


import QA from '../../../../../client/src/components/QA/QA.jsx';
import QuestionList from '../../../../../client/src/components/QA/QuestionsList.jsx';
import {questionsData} from './data.js';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme
const selectProduct = {'id': 28218};
describe('<QA testing />', () => {
  test('renders QA', () => {
    const wrapper = shallow(<QA selectedProduct={selectProduct} />); // mount/render/shallow when applicable
    const text = wrapper.find('h3').text();
    expect(text).toBe('QUESTIONS & ANSWERS');
    const button = wrapper.find('button').length;
    expect(button).toBe(1);

  });

  test('should add 2 questions when click more answered question button', () => {
    const wrapper = mount(<QuestionList questions={questionsData}/>);
    expect(wrapper.find('table.QA_question_table')).toHaveLength(2);
    wrapper.find('button.QA_more_questions').simulate('click');
    expect(wrapper.find('table.QA_question_table')).toHaveLength(4);
  });
});

describe ('Render questions and answer', () => {
  test('should render question body', () => {
    const wrapper = mount(<QuestionList questions={questionsData} />);
    expect(wrapper.find('.QA_question')).toHaveLength(2);
    expect(wrapper.find('.QA_question_body').at(0).text()).toBe('question 1');
  });

  
});