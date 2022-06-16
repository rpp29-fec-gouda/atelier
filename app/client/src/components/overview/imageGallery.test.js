import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ImageGallery from '../../../../../client/src/components/overview/ImageGallery.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<ImageGallery />', () => {
  const photos = [
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
    },
    {// eslint-disable-next-line
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80&h=1152'
    },
  ];

  it('renders without crashing given the required props', () => {
    const props = {
      photos: photos,
      isExpanded: true,
      isZoomed: true
    };
    const wrapper = shallow(<ImageGallery {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have expected default properties classes:', function () {
    const props = {
      photos: photos,
      isExpanded: true,
      isZoomed: true
    };
    const wrapper = mount(<ImageGallery {...props} />);
    expect(wrapper.state().selectedPhotoIndex).toEqual(0);
    expect(wrapper.props().photos).toHaveLength(props.photos.length);
    expect(wrapper.props().photos[0].thumbnail_url).toEqual(props.photos[0].thumbnail_url);
    expect(wrapper.props().photos[0].url).toEqual(props.photos[0].url);
    expect(wrapper.props().photos[props.photos.length - 1].thumbnail_url).toEqual(props.photos[props.photos.length - 1].thumbnail_url);
    expect(wrapper.props().photos[props.photos.length - 1].url).toEqual(props.photos[props.photos.length - 1].url);
    expect(wrapper.props().isExpanded).toEqual(true);
    expect(wrapper.props().isZoomed).toEqual(true);
  });

  it('should execute a callback for expand:', function () {
    const mockCallBackZoom = jest.fn();
    const mockCallBackExpand = jest.fn();
    const mockCallBackCollapse = jest.fn();

    const props = {
      onClickZoom: mockCallBackZoom,
      onClickExpand: mockCallBackExpand,
      onClickCollapse: mockCallBackCollapse
    };
    const wrapper = shallow(<ImageGallery {...props} />);

    wrapper.find('.image-gallery-expanded-view-toggle').first().simulate('click');
    expect(mockCallBackZoom.mock.calls.length).toEqual(0);
    expect(mockCallBackExpand.mock.calls.length).toEqual(1);
    expect(mockCallBackCollapse.mock.calls.length).toEqual(0);

    wrapper.find('#po-main-image').first().simulate('click');
    expect(mockCallBackZoom.mock.calls.length).toEqual(0);
    expect(mockCallBackExpand.mock.calls.length).toEqual(2);
    expect(mockCallBackCollapse.mock.calls.length).toEqual(0);
  });

  it('should execute a callback for collapse:', function () {
    const mockCallBackZoom = jest.fn();
    const mockCallBackExpand = jest.fn();
    const mockCallBackCollapse = jest.fn();

    const props = {
      isExpanded: true,
      onClickZoom: mockCallBackZoom,
      onClickExpand: mockCallBackExpand,
      onClickCollapse: mockCallBackCollapse
    };
    const wrapper = shallow(<ImageGallery {...props} />);

    wrapper.find('.image-gallery-collapsed-view-toggle').first().simulate('click');
    expect(mockCallBackZoom.mock.calls.length).toEqual(0);
    expect(mockCallBackExpand.mock.calls.length).toEqual(0);
    expect(mockCallBackCollapse.mock.calls.length).toEqual(1);
  });

  it('should execute a callback for zoom:', function () {
    const mockCallBackZoom = jest.fn();
    const mockCallBackExpand = jest.fn();
    const mockCallBackCollapse = jest.fn();

    const props = {
      isExpanded: true,
      isZoomed: true,
      onClickZoom: mockCallBackZoom,
      onClickExpand: mockCallBackExpand,
      onClickCollapse: mockCallBackCollapse
    };
    const wrapper = mount(<ImageGallery {...props} />);

    wrapper.find('#po-main-image').first().simulate('click');
    expect(mockCallBackZoom.mock.calls.length).toEqual(1);
    expect(mockCallBackExpand.mock.calls.length).toEqual(0);
    expect(mockCallBackCollapse.mock.calls.length).toEqual(0);
  });

  // === Integration Tests ===
  // TODO
  // it('should update selected photo index when ImageNavigator thumbail is clicked:', function () {
  //   const props = {
  //     photos: photos
  //   };
  //   const wrapper = shallow(<ImageGallery {...props} />);
  // });

  // it('should update selected photo index when ImageNavigator icon is clicked:', function () {
  //   const props = {
  //     photos: photos,
  //     isExpanded: true
  //   };
  //   const wrapper = shallow(<ImageGallery {...props} />);
  // });

  // it('should update selected photo index when ScrollingArrows is clicked in collapsed view:', function () {
  //   const props = {
  //     photos: photos
  //   };
  //   const wrapper = shallow(<ImageGallery {...props} />);
  // });

  // it('should update selected photo index when ScrollingArrows is clicked in expanded view:', function () {
  //   const props = {
  //     photos: photos,
  //     isExpanded: true
  //   };
  //   const wrapper = shallow(<ImageGallery {...props} />);
  // });
});