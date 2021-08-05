import React from 'react';
import { shallow, mount } from 'enzyme';


import QA from '../../../../../client/src/components/QA/QA.jsx';
import SearchQuestions from '../../../../../client/src/components/QA/SearchQuestion.jsx';
import QuestionList from '../../../../../client/src/components/QA/QuestionsList.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme
const questionsData = [
  {
    'question_id': 1,
    'question_body': 'question 1',
    'questions_helpfulness': 1,
    'reported': false,
    'answers': {
      1: { 'answerer_name': 'test1', 'body': 'answer1', 'helpfulness': 1 },
      2: { 'answerer_name': 'test2', 'body': 'answer2', 'helpfulness': 2 }
    },
  },
  {
    'question_id': 2,
    'question_body': 'question 2',
    'questions_helpfulness': 2,
    'reported': false,
    'answers': {},
  },
  {
    'question_id': 3,
    'question_body': 'question 3',
    'questions_helpfulness': 3,
    'reported': false,
    'answers': {},
  },
  {
    'question_id': 4,
    'question_body': 'question 4',
    'questions_helpfulness': 4,
    'reported': false,
    'answers': {},
  },
  {
    'question_id': 5,
    'question_body': 'question 5',
    'questions_helpfulness': 5,
    'reported': false,
    'answers': {},
  }
  
];




describe('<QA testing />', () => {
  test('renders QA', () => {
    const wrapper = shallow(<QA productId='28212' />); // mount/render/shallow when applicable
    // // Assert that the given enzyme wrapper has rendered content.
    const text = wrapper.find('h3').text();
    expect(text).toBe('QUESTIONS & ANSWERS');
    const button = wrapper.find('button').length;
    expect(button).toBe(1);

  });

  test('should add 2 questions when click button', () => {
    const wrapper = mount(<QuestionList questions={questionsData} />);
    expect(wrapper.find('table.question_table')).toHaveLength(2);
    wrapper.find('button.more_questions').simulate('click');
    expect(wrapper.find('table.question_table')).toHaveLength(4);
  });
});