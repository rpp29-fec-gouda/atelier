"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class QuantitySelector extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getAttributes = this.getAttributes.bind(this);
        this.state = {
            currentQuantity: 0
        };
    }
    componentDidUpdate() {
        const quantitiesAreAvailable = this.quantitiesAreAvailable(this.props.maxQuantity, this.props.maxQuantityLimit);
        console.log('componentDidUpdate - quantitiesAreAvailable:', quantitiesAreAvailable);
        if (this.state.currentQuantity === 0 && quantitiesAreAvailable) {
            console.log('Resetting current quantity to: ', 1);
            this.setState({ currentQuantity: 1 });
        }
        else if (this.state.currentQuantity > 0 && !quantitiesAreAvailable) {
            console.log('Resetting current quantity to: ', 0);
            this.setState({ currentQuantity: 0 });
        }
    }
    getMaxQuantityCapped(maxQuantity, maxQuantityLimit) {
        return Math.min(maxQuantity, maxQuantityLimit);
    }
    quantitiesAreAvailable(maxQuantity, maxQuantityLimit) {
        return !!(maxQuantity && (this.getMaxQuantityCapped(maxQuantity, maxQuantityLimit) > 0));
    }
    resetToDefaultSelected() {
        console.log('Resetting quantity selected');
        const options = document.querySelectorAll('#po-quantity option');
        for (let i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
        }
    }
    getAttributes(quantitiesAreAvailable) {
        const selectAttributes = {};
        if (quantitiesAreAvailable) {
            selectAttributes['defaultValue'] = 1;
            selectAttributes['onChange'] = this.onChange;
        }
        else {
            selectAttributes['disabled'] = true;
        }
        return selectAttributes;
    }
    getQuantities(quantitiesAreAvailable, maxQuantityCapped) {
        const quantities = [];
        if (quantitiesAreAvailable) {
            for (let i = 1; i <= maxQuantityCapped; i++) {
                quantities.push(i);
            }
        }
        console.log('quantities available', quantities);
        return quantities;
    }
    onChange(e) {
        var _a;
        const newQuantityValue = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value;
        const newQuantity = parseInt(newQuantityValue);
        if (newQuantity) {
            console.log('Quantity onChange:', newQuantity);
            this.setState({ currentQuantity: newQuantity });
            this.props.onSelect(newQuantity);
        }
    }
    render() {
        console.log('Rendering Quantity Selector');
        const quantitiesAreAvailable = this.quantitiesAreAvailable(this.props.maxQuantity, this.props.maxQuantityLimit);
        console.log('quantitiesAreAvailable', quantitiesAreAvailable);
        const selectAttributes = this.getAttributes(quantitiesAreAvailable);
        const maxQuantityCapped = this.getMaxQuantityCapped(this.props.maxQuantity, this.props.maxQuantityLimit);
        console.log('maxQuantityCapped', maxQuantityCapped);
        const quantities = this.getQuantities(quantitiesAreAvailable, maxQuantityCapped);
        console.log('this.state.currentQuantity', this.state.currentQuantity);
        console.log('quantities.indexOf(this.state.currentQuantity)', quantities.indexOf(this.state.currentQuantity));
        if (quantitiesAreAvailable && quantities.indexOf(this.state.currentQuantity) === -1) {
            this.resetToDefaultSelected();
        }
        let key = 0;
        return (<div id="po-quantity-selector">
        <select id="po-quantity" name="quantity" {...selectAttributes}>
          {quantitiesAreAvailable ? (quantities.map(quantity => (<option key={key++} value={quantity}>
                    {quantity}
                </option>))) : (<option value={-1}>-</option>)}
        </select>
      </div>);
    }
}
QuantitySelector.defaultProps = {
    maxQuantityLimit: 15,
};
exports.default = QuantitySelector;
