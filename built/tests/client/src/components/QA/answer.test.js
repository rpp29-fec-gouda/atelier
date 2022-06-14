"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const AnswersList_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/AnswersList.jsx"));
const data_js_1 = require("./data.js");
describe('Render Answers', () => {
    const wrapper = (0, enzyme_1.mount)(<AnswersList_jsx_1.default answers={data_js_1.answersData}/>);
    const answersLength = Object.keys(data_js_1.answersData).length;
    test('should render 2 anwers on each question', () => {
        expect(wrapper.find('.qa-answer-body')).toHaveLength(2);
    });
    test('should sort with helpfulness', () => {
        expect(wrapper.find('.qa-answer-body').at(0).text()).toBe('DONT BUY IT! It\'s bad for the environment');
    });
    test('should show all answers when click button', () => {
        expect(wrapper.find('.qa-answer-body')).toHaveLength(2);
        wrapper.find('#qa-more-answer').simulate('click');
        expect(wrapper.find('.qa-answer-body')).toHaveLength(answersLength);
    });
});
