import React from 'react';
import { shallow, mount } from 'enzyme';


import QA from '../../../../../client/src/components/QA/QA.jsx';
import Question from '../../../../../client/src/components/QA/Question.jsx';
import QuestionList from '../../../../../client/src/components/QA/QuestionsList.jsx';
import SearchQuestion from '../../../../../client/src/components/QA/SearchQuestion.jsx';
import AnswersList from '../../../../../client/src/components/QA/AnswersList.jsx';
import AddingForm from '../../../../../client/src/components/QA/AddingForm.jsx';
import {productData, questionsData, answersData} from './data.js';
import {updateCache, checkCache} from './functions.js';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme
describe('<QA testing />', () => {
  test('renders QA', () => {
    const wrapper = shallow(<QA updateCache={updateCache} checkCache={checkCache} selectedProduct={{id: productData.product_id}} />); // mount/render/shallow when applicable
    const text = wrapper.find('h3').text();
    expect(text).toBe('QUESTIONS & ANSWERS');
    expect(wrapper).toMatchSnapshot();
  });

  test('renders Question List', () => {
    const wrapper = shallow(<QuestionList questions={questionsData} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders Question', () => {
    const wrapper = shallow(<Question questions={questionsData} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders Search Question', () => {
    const wrapper = shallow(<SearchQuestion questions={questionsData} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders Answers List', () => {
    const wrapper = shallow(<AnswersList answers={answersData} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders Adding form', () => {
    const wrapper = shallow(<AddingForm productId='36300' />);
    expect(wrapper).toMatchSnapshot();
  });

});

