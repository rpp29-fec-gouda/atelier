"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const AddButton_jsx_1 = __importDefault(require("../../../../../client/src/components/shared/AddButton.jsx"));
describe('<AddButton />', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            label: 'add to bag',
            id: 'checkout',
            onClick: () => { }
        };
        const wrapper = (0, enzyme_1.shallow)(<AddButton_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have a provided label, id, and pre-defined class:', function () {
        const props = {
            label: 'add to bag',
            id: 'checkout',
            onClick: () => { }
        };
        const wrapper = (0, enzyme_1.shallow)(<AddButton_jsx_1.default {...props}/>);
        expect(wrapper.find('div').first().text()).toEqual(props.label + '  +');
        expect(wrapper.find(`div#${props.id}`)).toHaveLength(1);
        expect(wrapper.find('div.button')).toHaveLength(1);
    });
    it('should execute click event', () => {
        const mockCallBack = jest.fn();
        const props = {
            label: 'add to bag',
            id: 'checkout',
            onClick: mockCallBack
        };
        const wrapper = (0, enzyme_1.shallow)(<AddButton_jsx_1.default {...props}/>);
        wrapper.find('div').first().simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
