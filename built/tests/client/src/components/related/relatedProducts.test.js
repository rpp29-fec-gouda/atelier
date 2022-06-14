"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const RelatedProducts_jsx_1 = __importDefault(require("../../../../../client/src/components/related/RelatedProducts.jsx"));
const products = [
    { name: 'aProduct', id: 11 },
    { name: 'anotherProduct', id: 12 }
];
const selectedProduct = {
    name: 'product',
    id: 11,
    'default_price': 20,
    category: 'category',
    slogan: 'like any other product, but selected'
};
describe('<RelatedProducts />', () => {
    const component = (0, enzyme_1.mount)(<RelatedProducts_jsx_1.default products={products} selectedProduct={selectedProduct} checkCache={() => { }} updateCache={() => { }}/>);
    it('renders', () => {
        expect(component.find('div.rp-card')).toBeTruthy();
    });
});
