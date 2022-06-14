"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const index_jsx_1 = __importDefault(require("../../../client/src/index.jsx"));
describe('Test App Entry point', function () {
    it('should have a paragraph tag with "Loading...":', function () {
        const wrapper = (0, enzyme_1.shallow)(<index_jsx_1.default init={{ id: 11 }} isTesting={true}/>);
        expect(wrapper.find('p').text()).toEqual('Loading...');
    });
    it('renders without crashing given the required props', () => {
        const props = {
            init: { id: 11 },
            isTesting: true
        };
        const wrapper = (0, enzyme_1.shallow)(<index_jsx_1.default {...props}/>);
        expect((0, enzyme_to_json_1.default)(wrapper)).toMatchSnapshot();
    });
});
