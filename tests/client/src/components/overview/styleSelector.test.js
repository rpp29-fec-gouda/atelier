import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import StyleSelector from '../../../../../client/src/components/overview/StyleSelector.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<StyleSelector />', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      selectedId: 162332,
      name: 'Forest Green & Black',
      items: [
        {'id': 162348, 'thumbnail': 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162349, 'thumbnail': 'https://images.unsplash.com/photo-1534481909716-9a482087f27d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162350, 'thumbnail': 'https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162351, 'thumbnail': 'https://images.unsplash.com/photo-1479756212843-6314ad5121dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162352, 'thumbnail': 'https://images.unsplash.com/photo-1461551449292-b63f7419ac93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162353, 'thumbnail': 'https://images.unsplash.com/photo-1511766566737-1740d1da79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162354, 'thumbnail': 'https://images.unsplash.com/photo-1560095633-6803ba0461cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162355, 'thumbnail': 'https://images.unsplash.com/photo-1544701758-5241eb611a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162356, 'thumbnail': 'https://images.unsplash.com/photo-1519722417352-7d6959729417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'}
      ]
    };
    const wrapper = shallow(<StyleSelector {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have expected default properties classes:', function () {
    const props = {
      selectedId: 162350,
      name: 'Forest Green & Black',
      items: [
        {'id': 162348, 'thumbnail': 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162349, 'thumbnail': null},
        {'id': 162350, 'thumbnail': 'https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162351, 'thumbnail': 'https://images.unsplash.com/photo-1479756212843-6314ad5121dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},

        {'id': 162352, 'thumbnail': 'https://images.unsplash.com/photo-1461551449292-b63f7419ac93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162353, 'thumbnail': 'https://images.unsplash.com/photo-1511766566737-1740d1da79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162354, 'thumbnail': 'https://images.unsplash.com/photo-1560095633-6803ba0461cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162355, 'thumbnail': 'https://images.unsplash.com/photo-1544701758-5241eb611a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},

        {'id': 162356, 'thumbnail': 'https://images.unsplash.com/photo-1519722417352-7d6959729417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'}
      ]
    };

    const wrapper = shallow(<StyleSelector {...props} />);
    expect(wrapper.find('#style-selector')).toHaveLength(1);
    expect(wrapper.find('h2').text()).toEqual('STYLE > ' + props.name);
    expect(wrapper.find('.style-selected').children()).toHaveLength(1);
    expect(wrapper.find('#styles-list div.row')).toHaveLength(3);
    expect(wrapper.find('div.style')).toHaveLength(9);
    expect(wrapper.find('img')).toHaveLength(8);
  });

  it('should have expected default properties classes:', function () {
    const props = {
      selectedId: 162332,
      name: 'Forest Green & Black',
      items: [
        {'id': 162348, 'thumbnail': 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162349, 'thumbnail': null},
        {'id': 162350, 'thumbnail': 'https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162351, 'thumbnail': 'https://images.unsplash.com/photo-1479756212843-6314ad5121dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},

        {'id': 162352, 'thumbnail': 'https://images.unsplash.com/photo-1461551449292-b63f7419ac93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162353, 'thumbnail': 'https://images.unsplash.com/photo-1511766566737-1740d1da79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162354, 'thumbnail': 'https://images.unsplash.com/photo-1560095633-6803ba0461cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162355, 'thumbnail': 'https://images.unsplash.com/photo-1544701758-5241eb611a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
      ]
    };

    const wrapper = shallow(<StyleSelector {...props} />);
    expect(wrapper.find('#style-selector')).toHaveLength(1);
    expect(wrapper.find('h2').text()).toEqual('STYLE > ' + props.name);
    expect(wrapper.find('.style-selected').children()).toHaveLength(0);
    expect(wrapper.find('#styles-list div.row')).toHaveLength(2);
    expect(wrapper.find('div.style')).toHaveLength(8);
    expect(wrapper.find('img')).toHaveLength(7);
  });

  it('should execute a callback:', function () {
    const mockCallBack = jest.fn();

    const props = {
      selectedId: 162332,
      name: 'Forest Green & Black',
      items: [
        {'id': 162348, 'thumbnail': 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162349, 'thumbnail': 'https://images.unsplash.com/photo-1534481909716-9a482087f27d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162350, 'thumbnail': 'https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162351, 'thumbnail': 'https://images.unsplash.com/photo-1479756212843-6314ad5121dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162352, 'thumbnail': 'https://images.unsplash.com/photo-1461551449292-b63f7419ac93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162353, 'thumbnail': 'https://images.unsplash.com/photo-1511766566737-1740d1da79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162354, 'thumbnail': 'https://images.unsplash.com/photo-1560095633-6803ba0461cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'},
        {'id': 162355, 'thumbnail': 'https://images.unsplash.com/photo-1544701758-5241eb611a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'},
        {'id': 162356, 'thumbnail': 'https://images.unsplash.com/photo-1519722417352-7d6959729417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'}
      ],
      onClick: mockCallBack
    };
    const wrapper = shallow(<StyleSelector {...props} />);
    wrapper.find('div.style').at(0).simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});