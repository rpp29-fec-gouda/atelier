import React from 'react';
import { mount } from 'enzyme';
import QA from '../../../../../client/src/components/QA/QA.jsx';
import { questionsData } from './data.js';

const selectProduct = { id: 28218 };
describe('Search question', () => {
  const wrapper = mount(<QA selectedProduct={selectProduct} />);
  wrapper.setState({
    questions: questionsData
  });
  test('should render questions match with searching text', () => {
    expect(wrapper.find('.qa-question-body').at(0).text()).toBe('question 1');
    wrapper.find('.qa-search-bar').simulate('change', {target: {value: 'question 2'}});
    expect(wrapper.find('.qa-question-body').at(0).text()).toBe('question 2');
  });
});
