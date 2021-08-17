import React from 'react';
import { shallow, mount } from 'enzyme';
import AnswersList from '../../../../../client/src/components/QA/AnswersList.jsx';
import {answersData} from './data.js';

describe('Render Answers', () => {
  const wrapper = mount(<AnswersList answers={answersData} />);
  const answersLength = Object.keys(answersData).length;
  test('should render 2 anwers on each question', () => {
    expect(wrapper.find('.qa-answer-body')).toHaveLength(2);
  });
  test('should sort with helpfulness', () => {
    expect(wrapper.find('.qa-answer-body').at(0).text()).toBe('DONT BUY IT! It\'s bad for the environment');
  });
  test('should show all answers when click button', () => {
    expect(wrapper.find('.qa-answer-body')).toHaveLength(2);
    wrapper.find('#qa-more-answer').simulate('click');
    expect(wrapper.find('.qa-answer-body')).toHaveLength(answersLength);
  });
});
