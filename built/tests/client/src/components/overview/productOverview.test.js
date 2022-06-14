"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const ProductOverview_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/ProductOverview.jsx"));
const ImageGallery_1 = __importDefault(require("../../../../../client/src/components/overview/ImageGallery"));
const ProductInformation_1 = __importDefault(require("../../../../../client/src/components/overview/ProductInformation"));
const StyleSelector_1 = __importDefault(require("../../../../../client/src/components/overview/StyleSelector"));
const Cart_1 = __importDefault(require("../../../../../client/src/components/overview/Cart"));
const ProductDescription_1 = __importDefault(require("../../../../../client/src/components/overview/ProductDescription"));
const store = {
    isTesting: true,
    selectedProduct: {
        campus: 'hr-rpp',
        category: 'Pants',
        created_at: '2021-07-10T17:00:03.509Z',
        default_price: '65.00',
        description: 'I\'ll tell you how great they are after I nap for a bit.',
        id: 28215,
        name: 'Slacker\'s Slacks',
        slogan: 'Comfortable for everything, or nothing',
        updated_at: '2021-07-10T17:00:03.509Z'
    },
    ratings: {
        '2': '1',
        '4': '1',
        '5': '3'
    },
    styles: [
        {
            'default?': false,
            name: 'Grey',
            original_price: '65.00',
            photos: [
                {
                    thumbnail_url: null,
                    url: null
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1557804506-669a6…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1557804506-669a6…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1553830591-2f39e…3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1553830591-2f39e…c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80'
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1553830591-d8632…ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1553830591-d8632…f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80'
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1526948128573-70…fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1526948128573-70…a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1554774853-d50f9…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1554774853-d50f9…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'
                }
            ],
            sale_price: null,
            skus: {
                941290: { quantity: null, size: null },
                941291: { quantity: 16, size: 'S' },
                941292: { quantity: 17, size: 'M' },
                941293: { quantity: 10, size: 'L' },
                941294: { quantity: 15, size: 'XL' },
                941295: { quantity: 6, size: 'XXL' }
            },
            style_id: 162350
        },
        {
            'default?': true,
            name: 'Grey2',
            original_price: '65.50',
            photos: [
                {
                    thumbnail_url: null,
                    url: null
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1557804506-669a6…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1557804506-669a6…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
                },
                {
                    thumbnail_url: null,
                    url: null
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1553830591-d8632…ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1553830591-d8632…f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80'
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1526948128573-70…fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1526948128573-70…a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
                },
                {
                    thumbnail_url: 'https://images.unsplash.com/photo-1554774853-d50f9…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                    url: 'https://images.unsplash.com/photo-1554774853-d50f9…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'
                }
            ],
            sale_price: '40.43',
            skus: {
                941290: { quantity: null, size: null },
                941291: { quantity: 16, size: 'S' },
                941292: { quantity: null, size: null },
                941293: { quantity: 10, size: 'LL' },
                941294: { quantity: 15, size: 'XL' },
                941295: { quantity: 6, size: 'XXL' }
            },
            style_id: 162351
        }
    ]
};
describe('<ProductOverview />', () => {
    it('renders without crashing given the required props', () => {
        const props = store;
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should contain loading element if data not provided:', function () {
        const wrapper = (0, enzyme_1.mount)(<ProductOverview_jsx_1.default />);
        expect(wrapper.find('div')).toHaveLength(1);
        expect(wrapper.find('div').text()).toEqual('Loading Product Overview...');
    });
    it('should have expected content from provided properties:', function () {
        const props = store;
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        expect(wrapper.find('#product-overview')).toHaveLength(1);
        expect(wrapper.find(ImageGallery_1.default)).toHaveLength(1);
        expect(wrapper.find(ProductInformation_1.default)).toHaveLength(1);
        expect(wrapper.find(StyleSelector_1.default)).toHaveLength(1);
        expect(wrapper.find(Cart_1.default)).toHaveLength(1);
        expect(wrapper.find(ProductDescription_1.default)).toHaveLength(1);
    });
    it('should not have a product description if no slogan exists:', function () {
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        const props = store;
        props.selectedProduct.slogan = null;
        expect(wrapper.find(ProductDescription_1.default)).toHaveLength(0);
    });
    it('should not have a product description if no description exists:', function () {
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        const props = store;
        props.selectedProduct.description = null;
        expect(wrapper.find(ProductDescription_1.default)).toHaveLength(0);
    });
    it('should not have a product description if no slogan or description exists:', function () {
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        const props = store;
        props.selectedProduct.slogan = null;
        props.selectedProduct.description = null;
        expect(wrapper.find(ProductDescription_1.default)).toHaveLength(0);
    });
    it('should have first style as default if none is specified:', function () {
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        const props = store;
        store.styles[1]['default?'] = false;
    });
    it('should have a style set as default if specified:', function () {
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        const props = store;
    });
    it('should have average rating of 0 if no reviews:', function () {
        const wrapper = (0, enzyme_1.shallow)(<ProductOverview_jsx_1.default {...props}/>);
        const props = store;
    });
});
