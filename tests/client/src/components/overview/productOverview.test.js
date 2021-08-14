import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ProductOverview from '../../../../../client/src/components/overview/ProductOverview.jsx';
import ImageGallery from '../../../../../client/src/components/overview/ImageGallery';
import ProductInformation from '../../../../../client/src/components/overview/ProductInformation';
import StyleSelector from '../../../../../client/src/components/overview/StyleSelector';
import Cart from '../../../../../client/src/components/overview/Cart';
import ProductDescription from '../../../../../client/src/components/overview/ProductDescription';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

const store = {
  isTesting: true,
  selectedProduct: {
    campus: 'hr-rpp',
    category: 'Pants',
    // eslint-disable-next-line
    created_at: '2021-07-10T17:00:03.509Z',
    // eslint-disable-next-line
    default_price: '65.00',
    description: 'I\'ll tell you how great they are after I nap for a bit.',
    id: 28215,
    name: 'Slacker\'s Slacks',
    slogan: 'Comfortable for everything, or nothing',
    // eslint-disable-next-line
    updated_at: '2021-07-10T17:00:03.509Z'
  }, // data from GET request at index pass in
  ratings: {
    '2': '1',
    '4': '1',
    '5': '3'
  }, // data from GET request internal
  styles: [
    {
      'default?': false,
      name: 'Grey',
      // eslint-disable-next-line
      original_price: '65.00',
      photos: [
        {
          // eslint-disable-next-line
          thumbnail_url: null,
          url: null
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1557804506-669a6…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1557804506-669a6…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1553830591-2f39e…3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1553830591-2f39e…c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80'
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1553830591-d8632…ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1553830591-d8632…f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80'
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1526948128573-70…fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1526948128573-70…a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1554774853-d50f9…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1554774853-d50f9…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'
        }
      ],
      // eslint-disable-next-line
      sale_price: null,
      skus:
      {
        941290: {quantity: null, size: null}, // out of stock size
        941291: {quantity: 16, size: 'S'},
        941292: {quantity: 17, size: 'M'},
        941293: {quantity: 10, size: 'L'},
        941294: {quantity: 15, size: 'XL'},
        941295: {quantity: 6, size: 'XXL'}
      },
      // eslint-disable-next-line
      style_id: 162350
    },
    {
      'default?': true,
      name: 'Grey2',
      // eslint-disable-next-line
      original_price: '65.50',
      photos: [
        {
          // eslint-disable-next-line
          thumbnail_url: null,
          url: null
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1557804506-669a6…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1557804506-669a6…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
        },
        {
          // eslint-disable-next-line
          thumbnail_url: null,
          url: null
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1553830591-d8632…ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1553830591-d8632…f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80'
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1526948128573-70…fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1526948128573-70…a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
        },
        {
          // eslint-disable-next-line
          thumbnail_url: 'https://images.unsplash.com/photo-1554774853-d50f9…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1554774853-d50f9…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'
        }
      ],
      // eslint-disable-next-line
      sale_price: '40.43',
      skus:
      {
        941290: {quantity: null, size: null}, // out of stock size
        941291: {quantity: 16, size: 'S'},
        941292: {quantity: null, size: null},
        941293: {quantity: 10, size: 'LL'},
        941294: {quantity: 15, size: 'XL'},
        941295: {quantity: 6, size: 'XXL'}
      },
      // eslint-disable-next-line
      style_id: 162351
    }
  ] // data from GET request internal
};

describe('<ProductOverview />', () => {
  it('renders without crashing given the required props', () => {
    const props = store;
    const wrapper = shallow(<ProductOverview {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<ProductOverview />);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').text()).toEqual('Loading...');
  });

  it('should have expected content from provided properties:', function () {
    const props = store;
    const wrapper = shallow(<ProductOverview {...props} />);
    expect(wrapper.find('#product-overview')).toHaveLength(1);
    expect(wrapper.find(ImageGallery)).toHaveLength(1);
    expect(wrapper.find(ProductInformation)).toHaveLength(1);
    expect(wrapper.find(StyleSelector)).toHaveLength(1);
    expect(wrapper.find(Cart)).toHaveLength(1);
    expect(wrapper.find(ProductDescription)).toHaveLength(1);

    // sizes in stock 1 less than total sizes given
    // check this.numberOfReviews
    // check this.averageRating

    // getStyleDefaultPhotoUrl
    // one style img src = '' - model test?
    // another style img src = given - model test?

    // === model? tests there? ===
    // getStyleSelectorItems(this.po-styles)
    // getDefaultStyle(this.po-styles)
    // getStyleDefaultPhotoUrl
    //    one style img src = '' - model test?
    //    another style img src = given - model test?
    // getNumberOfReviews
    // getAverageRating
    // getSizesInStock
    // getStyleById(id, this.po-styles)
  });

  it('should not have a product description if no slogan exists:', function () {
    const wrapper = shallow(<ProductOverview {...props} />);
    const props = store;
    props.selectedProduct.slogan = null;
    expect(wrapper.find(ProductDescription)).toHaveLength(0);
  });

  it('should not have a product description if no description exists:', function () {
    const wrapper = shallow(<ProductOverview {...props} />);
    const props = store;
    props.selectedProduct.description = null;
    expect(wrapper.find(ProductDescription)).toHaveLength(0);
  });

  it('should not have a product description if no slogan or description exists:', function () {
    const wrapper = shallow(<ProductOverview {...props} />);
    const props = store;
    props.selectedProduct.slogan = null;
    props.selectedProduct.description = null;
    expect(wrapper.find(ProductDescription)).toHaveLength(0);
  });

  // TODO - model?
  it('should have first style as default if none is specified:', function () {
    const wrapper = shallow(<ProductOverview {...props} />);
    const props = store;
    store.styles[1]['default?'] = false;
  });

  // TODO - model?
  it('should have a style set as default if specified:', function () {
    const wrapper = shallow(<ProductOverview {...props} />);
    const props = store;
  });

  // TODO - model?
  it('should have average rating of 0 if no reviews:', function () {
    const wrapper = shallow(<ProductOverview {...props} />);
    const props = store;
  });

  // TODO: handleStyleClick
});