"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const SizeSelector_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/SizeSelector.jsx"));
describe('<SizeSelector />', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            skus: ['941206', '941207', '941208', '941209', '941210', '941211'],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XL']
        };
        const wrapper = (0, enzyme_1.shallow)(<SizeSelector_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have expected default properties classes', function () {
        const props = {
            skus: ['941206', '941207', '941208', '941209', '941210', '941211'],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XL']
        };
        const wrapper = (0, enzyme_1.shallow)(<SizeSelector_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-size-selector')).toHaveLength(1);
        expect(wrapper.find('#po-sizes')).toHaveLength(1);
        expect(wrapper.find('#po-sizes').children()).toHaveLength(props.sizes.length + 1);
    });
    it('should execute a callback:', function () {
        const mockCallBack = jest.fn();
        const props = {
            skus: ['941206', '941207', '941208', '941209', '941210', '941211'],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XL'],
            onSelect: mockCallBack
        };
        const wrapper = (0, enzyme_1.mount)(<SizeSelector_jsx_1.default {...props}/>);
        wrapper.find('#po-sizes').find('option').at(0).instance().selected = false;
        wrapper.find('#po-sizes').find('option').at(1).instance().selected = true;
        wrapper.find('#po-sizes').simulate('change');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
    it('should be disabled if no quantities available', function () {
        const props = {
            skus: [],
            sizes: []
        };
        const wrapper = (0, enzyme_1.shallow)(<SizeSelector_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-sizes').props().disabled).toEqual(true);
        expect(wrapper.find('#po-sizes').children().first().text()).toEqual('Out of Stock');
    });
});
