"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const ProductDescription_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/ProductDescription.jsx"));
describe('<ProductDescription />', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            slogan: 'Better, faster, stronger!',
            description: 'This product is too good to be true! Never breaks down'
        };
        const wrapper = (0, enzyme_1.shallow)(<ProductDescription_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have expected content from provided properties:', function () {
        const props = {
            slogan: 'Better, faster, stronger!',
            description: 'This product is too good to be true! Never breaks down'
        };
        const wrapper = (0, enzyme_1.shallow)(<ProductDescription_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-product-description')).toHaveLength(1);
        expect(wrapper.find('h2').text()).toEqual(props.slogan);
        expect(wrapper.find('#po-product-description div').text()).toEqual(props.description);
    });
});
