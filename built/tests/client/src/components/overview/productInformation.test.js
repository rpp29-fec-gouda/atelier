"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const ProductInformation_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/ProductInformation.jsx"));
const RatingsSummary_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/RatingsSummary.jsx"));
const Price_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/Price.jsx"));
describe('<ProductOverview />', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            name: 'slacker\'s slacks',
            category: 'pants',
            reviewCount: 5,
            averageRating: 2.2,
            defaultPrice: 99.99,
            salePrice: 59.99,
            originalPrice: 80.00
        };
        const wrapper = (0, enzyme_1.shallow)(<ProductInformation_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have the expected elements based on the properties provided:', function () {
        const props = {
            name: 'slacker\'s slacks',
            category: 'pants',
            reviewCount: 5,
            averageRating: 2.2,
            defaultPrice: 99.99,
            salePrice: 59.99,
            originalPrice: 80.00
        };
        const wrapper = (0, enzyme_1.mount)(<ProductInformation_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-product-information')).toHaveLength(1);
        expect(wrapper.find('h2.uppercase')).toHaveLength(1);
        expect(wrapper.find('h2.uppercase').text()).toEqual(props.category);
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('h1').text()).toEqual(props.name);
        expect(wrapper.find(RatingsSummary_jsx_1.default)).toHaveLength(1);
        expect(wrapper.find(Price_jsx_1.default)).toHaveLength(1);
    });
});
