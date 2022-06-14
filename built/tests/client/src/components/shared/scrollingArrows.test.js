"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const ScrollingArrows_jsx_1 = __importDefault(require("../../../../../client/src/components/shared/ScrollingArrows.jsx"));
describe('<ScrollingArrows />', () => {
    it('renders without crashing given the required props', () => {
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default />);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have expected default properties & class:', function () {
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default />);
        expect(wrapper.state().index).toEqual(0);
        expect(wrapper.instance().minIndex).toEqual(0);
        expect(wrapper.find('.scrolling-arrows-decrement-no-stem')).toHaveLength(1);
        expect(wrapper.find('.scrolling-arrows-increment-no-stem')).toHaveLength(1);
    });
    it('should execute callback event', () => {
        const mockCallBack = jest.fn();
        const props = {
            callback: mockCallBack
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        wrapper.find('.scrolling-arrows-decrement').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
        wrapper.find('.scrolling-arrows-increment').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(2);
    });
    it('should decrement & decrement index', () => {
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default />);
        expect(wrapper.state().index).toEqual(0);
        wrapper.find('.scrolling-arrows-increment').simulate('click');
        expect(wrapper.state().index).toEqual(1);
        wrapper.find('.scrolling-arrows-increment').simulate('click');
        expect(wrapper.state().index).toEqual(2);
        wrapper.find('.scrolling-arrows-decrement').simulate('click');
        expect(wrapper.state().index).toEqual(1);
        wrapper.find('.scrolling-arrows-decrement').simulate('click');
        expect(wrapper.state().index).toEqual(0);
        wrapper.find('.scrolling-arrows-decrement').simulate('click');
        expect(wrapper.state().index).toEqual(-1);
    });
    it('should have arrow with stem if specified:', function () {
        const props = {
            stem: true
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        expect(wrapper.find('.scrolling-arrows-decrement-stem')).toHaveLength(1);
        expect(wrapper.find('.scrolling-arrows-increment-stem')).toHaveLength(1);
    });
    it('should set default index to min', function () {
        const props = {
            minIndex: 2
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        expect(wrapper.state().index).toEqual(props.minIndex);
        expect(wrapper.instance().minIndex).toEqual(props.minIndex);
    });
    it('should increment/decrement from provided starting index', function () {
        const props = {
            index: 1
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        expect(wrapper.state().index).toEqual(1);
        wrapper.find('.scrolling-arrows-increment').simulate('click');
        expect(wrapper.state().index).toEqual(2);
        wrapper.find('.scrolling-arrows-decrement').simulate('click');
        expect(wrapper.state().index).toEqual(1);
        wrapper.find('.scrolling-arrows-decrement').simulate('click');
        expect(wrapper.state().index).toEqual(0);
    });
    it('should wrap around decrement to specified max if not capped', function () {
        const props = {
            minIndex: 0,
            maxIndex: 3
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        expect(wrapper.state().index).toEqual(props.minIndex);
        wrapper.find('.scrolling-arrows-decrement').simulate('click');
        expect(wrapper.state().index).toEqual(props.maxIndex);
    });
    it('should wrap around increment to specified min if not capped', function () {
        const props = {
            minIndex: 0,
            maxIndex: 2,
            index: 2
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        expect(wrapper.state().index).toEqual(props.maxIndex);
        wrapper.find('.scrolling-arrows-increment').simulate('click');
        expect(wrapper.state().index).toEqual(props.minIndex);
    });
    it('should hide decrement icon if at min & is capped', function () {
        const props = {
            isCapped: true,
            index: 0,
            minIndex: 0,
            maxIndex: 2,
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        expect(wrapper.find('.scrolling-arrows-decrement')).toHaveLength(0);
        expect(wrapper.find('.scrolling-arrows-increment')).toHaveLength(1);
    });
    it('should hide increment icon if at max & is capped', function () {
        const props = {
            isCapped: true,
            minIndex: 0,
            maxIndex: 2,
            index: 2
        };
        const wrapper = (0, enzyme_1.shallow)(<ScrollingArrows_jsx_1.default {...props}/>);
        expect(wrapper.find('.scrolling-arrows-decrement')).toHaveLength(1);
        expect(wrapper.find('.scrolling-arrows-increment')).toHaveLength(0);
    });
});
