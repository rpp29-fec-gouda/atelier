import React from 'react';
import { mount } from 'enzyme';
import QA from '../../../../../client/src/components/QA/QA.jsx';
import { productData, questionsData } from './data.js';


describe('Search question', () => {
  const wrapper = mount(<QA selectedProduct={{id: productData.product_id}} />);
  wrapper.setState({
    questions: questionsData
  });
  test('should render questions match with searching text', () => {
    expect(wrapper.find('.qa-question-body').at(0).text()).toBe('Cool API');
    wrapper.find('.qa-search-bar').simulate('change', {target: {value: 'What fabric'}});
    expect(wrapper.find('.qa-question-body').at(0).text()).toBe('What fabric is the top made of?');
  });
});
