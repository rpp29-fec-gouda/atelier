"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const QA_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/QA.jsx"));
const Question_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/Question.jsx"));
const QuestionsList_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/QuestionsList.jsx"));
const SearchQuestion_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/SearchQuestion.jsx"));
const AnswersList_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/AnswersList.jsx"));
const AddingForm_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/AddingForm.jsx"));
const data_js_1 = require("./data.js");
const functions_js_1 = require("./functions.js");
describe('<QA testing />', () => {
    test('renders QA', () => {
        const wrapper = (0, enzyme_1.shallow)(<QA_jsx_1.default updateCache={functions_js_1.updateCache} checkCache={functions_js_1.checkCache} selectedProduct={{ id: data_js_1.productData.product_id }}/>);
        const text = wrapper.find('h3').text();
        expect(text).toBe('QUESTIONS & ANSWERS');
        expect(wrapper).toMatchSnapshot();
    });
    test('renders Question List', () => {
        const wrapper = (0, enzyme_1.shallow)(<QuestionsList_jsx_1.default questions={data_js_1.questionsData}/>);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders Question', () => {
        const wrapper = (0, enzyme_1.shallow)(<Question_jsx_1.default questions={data_js_1.questionsData}/>);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders Search Question', () => {
        const wrapper = (0, enzyme_1.shallow)(<SearchQuestion_jsx_1.default questions={data_js_1.questionsData}/>);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders Answers List', () => {
        const wrapper = (0, enzyme_1.shallow)(<AnswersList_jsx_1.default answers={data_js_1.answersData}/>);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders Adding form', () => {
        const wrapper = (0, enzyme_1.shallow)(<AddingForm_jsx_1.default productId='36300'/>);
        expect(wrapper).toMatchSnapshot();
    });
});
