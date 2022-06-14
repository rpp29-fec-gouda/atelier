"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const QuantitySelector_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/QuantitySelector.jsx"));
describe('<QuantitySelector />', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            maxQuantity: 5
        };
        const wrapper = (0, enzyme_1.shallow)(<QuantitySelector_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have expected default properties classes:', function () {
        const props = {
            maxQuantity: 5
        };
        const wrapper = (0, enzyme_1.shallow)(<QuantitySelector_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-quantity-selector')).toHaveLength(1);
        expect(wrapper.find('#po-quantity')).toHaveLength(1);
        expect(wrapper.find('#po-quantity').children()).toHaveLength(props.maxQuantity);
    });
    it('should have quantities limited to 15:', function () {
        const props = {
            maxQuantity: 25
        };
        const wrapper = (0, enzyme_1.shallow)(<QuantitySelector_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-quantity').children()).toHaveLength(15);
    });
    it('should execute a callback when quantities available:', function () {
        const mockCallBack = jest.fn();
        const props = {
            maxQuantity: 5,
            onSelect: mockCallBack
        };
        const wrapper = (0, enzyme_1.mount)(<QuantitySelector_jsx_1.default {...props}/>);
        wrapper.find('#po-quantity').find('option').at(0).instance().selected = false;
        wrapper.find('#po-quantity').find('option').at(1).instance().selected = true;
        wrapper.find('#po-quantity').simulate('change');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
    it('should be disabled if no quantities available', function () {
        const mockCallBack = jest.fn();
        const props = {
            onSelect: mockCallBack
        };
        const wrapper = (0, enzyme_1.shallow)(<QuantitySelector_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-quantity').props().disabled).toEqual(true);
        expect(wrapper.find('#po-quantity').children().first().text()).toEqual('-');
        wrapper.find('#po-quantity').simulate('change');
        expect(mockCallBack.mock.calls.length).toEqual(0);
    });
    it('should reset to default upon re-render if available quantity size no longer exists:', function () {
        const props = {
            maxQuantity: 5
        };
        const wrapper = (0, enzyme_1.mount)(<QuantitySelector_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-quantity option').at(0).props().selected).toEqual(undefined);
        expect(wrapper.find('#po-quantity option').at(2).props().selected).toEqual(undefined);
        wrapper.find('#po-quantity option').at(2).props().selected = true;
        expect(wrapper.find('#po-quantity option').at(0).props().selected).toEqual(undefined);
        expect(wrapper.find('#po-quantity option').at(2).props().selected).toEqual(true);
        wrapper.setProps({});
        expect(wrapper.find('#po-quantity option').at(0).props().selected).toEqual(undefined);
        expect(wrapper.find('#po-quantity option').at(2).props().selected).toEqual(undefined);
    });
});
