"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ProductCard_jsx_1 = __importDefault(require("../../../../../client/src/components/related/ProductCard.jsx"));
const product = {
    name: 'product',
    id: 11,
    'default_price': 20,
    category: 'category',
    slogan: 'Something about this product. Something very, very long-winded that should be trimmed down.'
};
const action = jest.fn();
describe('<ProductCard/>', () => {
    const card = (0, enzyme_1.mount)(<ProductCard_jsx_1.default product={product} selectedProduct={product} type='Outfit' selectProduct={action}/>);
    it('renders', () => {
        expect(card.find('div.rp-card')).toBeTruthy();
    });
});
