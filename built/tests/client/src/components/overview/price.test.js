"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const Price_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/Price.jsx"));
describe('<Price />', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            defaultPrice: 99.99,
            salePrice: 59.99,
            originalPrice: 80.00
        };
        const wrapper = (0, enzyme_1.shallow)(<Price_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have expected default properties classes:', function () {
        const props = {
            defaultPrice: 99.99
        };
        const wrapper = (0, enzyme_1.shallow)(<Price_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-price')).toHaveLength(1);
        expect(wrapper.find('div.po-sale-price')).toHaveLength(0);
        expect(wrapper.find('div.po-original-price')).toHaveLength(0);
    });
    it('should have expected sale price classes:', function () {
        const props = {
            defaultPrice: 99.99,
            salePrice: 59.99,
            originalPrice: 80.00
        };
        const wrapper = (0, enzyme_1.shallow)(<Price_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-price')).toHaveLength(1);
        expect(wrapper.find('div.po-sale-price')).toHaveLength(1);
        expect(wrapper.find('div.po-original-price')).toHaveLength(1);
    });
});
