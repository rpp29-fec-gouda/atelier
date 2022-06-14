"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const RatingsSummary_jsx_1 = __importDefault(require("../../../../../client/src/components/overview/RatingsSummary.jsx"));
const StarRating_jsx_1 = __importDefault(require("../../../../../client/src/components/shared/StarRating.jsx"));
describe('<RatingsSummary />', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            reviewCount: 5,
            averageRating: 2.2
        };
        const wrapper = (0, enzyme_1.shallow)(<RatingsSummary_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
    it('should have text with the review count shown:', function () {
        const props = {
            reviewCount: 5,
            averageRating: 2.2
        };
        const wrapper = (0, enzyme_1.shallow)(<RatingsSummary_jsx_1.default {...props}/>);
        expect(wrapper.find('#po-read-all-reviews').text()).toEqual('Read all 5 reviews');
    });
    it('should have a star rating component with the average rating supplied:', function () {
        const props = {
            reviewCount: 5,
            averageRating: 2.2
        };
        const wrapper = (0, enzyme_1.mount)(<RatingsSummary_jsx_1.default {...props}/>);
        expect(wrapper.find(StarRating_jsx_1.default)).toHaveLength(1);
        expect(wrapper.find(StarRating_jsx_1.default).state().currentRating).toEqual(props.averageRating);
    });
    it('should execute an onclick event on po-read-all-reviews:', function () {
        const mockCallBack = jest.fn();
        const props = {
            reviewCount: 5,
            averageRating: 2.2,
            callback: mockCallBack
        };
        const wrapper = (0, enzyme_1.shallow)(<RatingsSummary_jsx_1.default {...props}/>);
        wrapper.find('#po-read-all-reviews').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
