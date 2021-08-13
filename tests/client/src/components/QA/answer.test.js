import React from 'react';
import { shallow, mount } from 'enzyme';
import AnswersList from '../../../../../client/src/components/QA/AnswersList.jsx';
import {answersData} from './data.js';

describe('Render Answers', () => {
  const wrapper = mount(<AnswersList answers={answersData} />);
  test('should render 2 anwers on each question', () => {
    expect(wrapper.find('.answer_body')).toHaveLength(2);
  });
  test('should sort with helpfulness', () => {
    expect(wrapper.find('.answer_body').at(0).text()).toBe('answer4');
  });
  test('should add 2 more answer when click button', () => {
    expect(wrapper.find('.answer_body')).toHaveLength(2);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.answer_body')).toHaveLength(4);
  });
});


