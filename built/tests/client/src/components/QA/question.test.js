"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const QuestionsList_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/QuestionsList.jsx"));
const data_js_1 = require("./data.js");
describe('Render questions and answer', () => {
    const wrapper = (0, enzyme_1.mount)(<QuestionsList_jsx_1.default questions={data_js_1.questionsData}/>);
    test('should render 2 questions body', () => {
        expect(wrapper.find('.qa-question')).toHaveLength(2);
    });
    test('should add 2 questions when click more answered question button', () => {
        expect(wrapper.find('table.qa-question-table')).toHaveLength(2);
        wrapper.find('.button#qa-more-question').simulate('click');
        expect(wrapper.find('table.qa-question-table')).toHaveLength(4);
    });
});
