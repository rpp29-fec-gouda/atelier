"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const StarRating_jsx_1 = __importDefault(require("../../../../../client/src/components/shared/StarRating.jsx"));
describe('<StarRating />', () => {
    it('renders without crashing given the required props', () => {
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default />);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have expected default properties & class:', function () {
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default />);
        expect(wrapper.state().currentRating).toEqual(0);
        expect(wrapper.instance().isClickable).toEqual(false);
        expect(wrapper.instance().maxStars).toEqual(5);
        expect(wrapper.find('div.star-rating')).toHaveLength(1);
    });
    it('should have a specified rating if below max:', function () {
        const props = {
            rating: 3.81
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.state().currentRating).toEqual(props.rating);
    });
    it('should have a max rating if specified rating is above max:', function () {
        const props = {
            rating: 6.81
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.state().currentRating).toEqual(5);
    });
    it('should have a custom max rating if specified:', function () {
        const props = {
            max: 4
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.instance().maxStars).toEqual(props.max);
    });
    it('should have the same number of empty star elements as max stars for no current rating:', function () {
        const props = {
            max: 3
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
    });
    it('should have the same number of star elements as max stars for current rating with partial star:', function () {
        const props = {
            max: 4,
            rating: 2.81
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
    });
    it('should have the same number of star elements as max stars for current rating with full star:', function () {
        const props = {
            max: 4,
            rating: 3
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
    });
    it('should have the same number of star elements as max stars for current rating with all full stars:', function () {
        const props = {
            max: 4,
            rating: 4
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
    });
    it('should be clickable if given a callback:', function () {
        const props = {
            callback: () => { }
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        expect(wrapper.instance().isClickable).toEqual(true);
    });
    it('should execute callback event', () => {
        const mockCallBack = jest.fn();
        const props = {
            rating: 3.81,
            callback: mockCallBack
        };
        const wrapper = (0, enzyme_1.shallow)(<StarRating_jsx_1.default {...props}/>);
        wrapper.find('img').first().simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
    it('should execute onMouseOver & onMouseOut events if clickable', () => {
        const props = {
            max: 4,
            rating: 3.81,
            callback: () => { }
        };
        const wrapper = (0, enzyme_1.mount)(<StarRating_jsx_1.default {...props}/>);
        wrapper.find('img').first().simulate('mouseover');
        expect(wrapper.state().currentRating).toEqual('1');
        expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
        wrapper.find('div.star-rating').first().simulate('mouseout');
        expect(wrapper.state().currentRating).toEqual(props.rating);
        expect(wrapper.find('div.star-rating').children('img')).toHaveLength(props.max);
    });
    it('should not execute onMouseOver or onMouseOut events if not clickable', () => {
        const props = {
            rating: 3.81
        };
        const wrapper = (0, enzyme_1.mount)(<StarRating_jsx_1.default {...props}/>);
        wrapper.find('img').first().simulate('mouseover');
        expect(wrapper.state().currentRating).toEqual(props.rating);
        wrapper.find('div.star-rating').first().simulate('mouseout');
        expect(wrapper.state().currentRating).toEqual(props.rating);
    });
});
