"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Outfit_jsx_1 = __importDefault(require("../../../../../client/src/components/related/Outfit.jsx"));
describe('<Outfit />', () => {
    const updateOutfit = jest.fn();
    const removeFromOutfit = jest.fn();
    jest.mock('axios', () => ({
        __esModule: true,
        default: jest.fn()
    }));
    const outfit = (0, enzyme_1.mount)(<Outfit_jsx_1.default selectedProduct={{ name: 'Product', id: 11 }} productIds={[]} checkCache={() => { }} clickTracker={() => { }}/>);
    it('Renders', () => {
        expect(outfit.find('div#Outfit')).toHaveLength(1);
    });
    test('Outfit should be empty before Add to Outfit is clicked', () => {
        expect(outfit.state('outfit')).toHaveLength(0);
    });
    test('Should add a product to Outfit when Add to Outfit card is clicked', () => {
        outfit.find('div.add-to-outfit').simulate('click');
        expect(outfit.state('outfit')).toHaveLength(1);
    });
    test('Should not remove a product from Outfit when removeFromOutfit is called without a matching id', () => {
        const instance = outfit.instance();
        instance.removeFromOutfit(12);
        expect(outfit.state('outfit')).toHaveLength(1);
    });
    test('Should remove a product from Outfit when removeFromOutfit is called with a matching id', () => {
        const instance = outfit.instance();
        instance.removeFromOutfit(11);
        expect(outfit.state('outfit')).toHaveLength(0);
    });
});
