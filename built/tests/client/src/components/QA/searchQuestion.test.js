"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const QA_jsx_1 = __importDefault(require("../../../../../client/src/components/QA/QA.jsx"));
const data_js_1 = require("./data.js");
const functions_js_1 = require("./functions.js");
describe('Search question', () => {
    const wrapper = (0, enzyme_1.mount)(<QA_jsx_1.default updateCache={functions_js_1.updateCache} checkCache={functions_js_1.checkCache} selectedProduct={{ id: data_js_1.productData.product_id }}/>);
    wrapper.setState({
        questions: data_js_1.questionsData
    });
    test('should render questions match with searching text', () => {
        expect(wrapper.find('.qa-question-body').at(0).text()).toBe('Cool API');
        wrapper.find('.qa-search-bar').simulate('change', { target: { value: 'What fabric' } });
        expect(wrapper.find('.qa-question-body').at(0).text()).toBe('What fabric is the top made of?');
    });
});
