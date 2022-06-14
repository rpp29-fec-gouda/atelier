import React from 'react';
import { shallow, mount } from 'enzyme';
import QuestionList from '../../../../../client/src/components/QA/QuestionsList.jsx';
import {productData, questionsData, answersData} from './data.js';

describe ('Render questions and answer', () => {
  const wrapper = mount(<QuestionList questions={questionsData} />);
  test('should render 2 questions body', () => {
    expect(wrapper.find('.qa-question')).toHaveLength(2);
  });

  test('should add 2 questions when click more answered question button', () => {
    expect(wrapper.find('table.qa-question-table')).toHaveLength(2);
    wrapper.find('.button#qa-more-question').simulate('click');
    expect(wrapper.find('table.qa-question-table')).toHaveLength(4);
  });  
});