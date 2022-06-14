"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ProductsCarousel_jsx_1 = __importDefault(require("../../../../../client/src/components/related/ProductsCarousel.jsx"));
const products = [
    { name: 'aProduct', id: 11 },
    { name: 'anotherProduct', id: 12 }
];
describe('<ProductsCarousel />', () => {
    const carousel = (0, enzyme_1.shallow)(<ProductsCarousel_jsx_1.default productIds={[11, 12]}/>);
    it('renders', () => {
        expect(carousel.find('div#ProductsCarousel')).toHaveLength(1);
    });
});
