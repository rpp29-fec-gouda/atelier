"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const POClickTracker_1 = __importDefault(require("../trackers/POClickTracker"));
const SizeSelector_1 = __importDefault(require("./SizeSelector"));
const QuantitySelector_1 = __importDefault(require("./QuantitySelector"));
const AddButton_1 = __importDefault(require("../shared/AddButton"));
require("./cart.css");
class Cart extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.isInStock = props.skus ? Object.keys(props.skus).length > 0 : false;
        this.state = {
            selectedId: props.selectedId,
            currentSku: null,
            currentSize: '',
            currentQuantity: 0,
            bag: [],
            promptSelection: false
        };
        this.handleSizeSelect = this.handleSizeSelect.bind(this);
        this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.resetSku = this.checkResetSku.bind(this);
    }
    componentDidUpdate() {
        console.log('Cart componentDidUpdate');
        this.checkResetSku();
    }
    checkResetSku() {
        const matchId = this.props.selectedId;
        if (this.state.selectedId !== matchId) {
            console.log('Resetting SKUs');
            this.setState({
                selectedId: matchId,
                currentSku: null,
                currentQuantity: 0,
                promptSelection: false
            });
        }
    }
    getMaxQuantity(currentSize, sizesList, skusList, skus) {
        const index = sizesList.indexOf(currentSize);
        console.log('getMaxQuantity: currentSize', currentSize);
        console.log('getMaxQuantity: index', index);
        if (currentSize === '' || index < 0) {
            return 0;
        }
        else {
            console.log('getMaxQuantity: ', skusList[index].quantity);
            return skus[skusList[index]].quantity;
        }
    }
    handleSizeSelect(sku) {
        var _a, _b;
        console.log('sku for size selected:', sku);
        const currentSize = (_a = this.props.skus[sku]) === null || _a === void 0 ? void 0 : _a.size;
        console.log('size selected:', currentSize);
        this.setState({
            currentSku: sku,
            currentSize: (_b = this.props.skus[sku]) === null || _b === void 0 ? void 0 : _b.size,
            currentQuantity: 1,
            promptSelection: false
        });
    }
    handleQuantitySelect(quantity) {
        console.log('Setting quantity:', quantity);
        this.setState({
            currentQuantity: quantity,
            promptSelection: false
        });
    }
    handleCheckout() {
        if (this.isInStock && this.state.currentSku !== null) {
            const newBag = this.state.bag;
            newBag.push({
                sku: this.state.currentSku,
                quantity: this.state.currentQuantity
            });
            this.setState({
                bag: newBag
            });
            console.log('Current order:', JSON.stringify(this.state.bag));
            alert('You have checked out! Order:' + JSON.stringify(this.state.bag));
        }
        else {
            this.setState({
                promptSelection: true
            });
        }
    }
    render() {
        console.log('Rendering po-cart');
        console.log(`%cCart current sku: ${this.state.currentSku}`, 'color: red');
        const skus = this.props.skus;
        console.log('Cart skus', JSON.stringify(skus));
        if (!skus) {
            console.log('No SKUS!');
            return (<div id="po-cart" class="column">
        Loading Cart...
      </div>);
        }
        const skusList = Object.keys(skus);
        console.log('Cart sku #s', skusList);
        const sizesList = [];
        skusList.forEach(sku => {
            sizesList.push(skus[sku].size);
        });
        console.log('Cart sizes', sizesList);
        const maxQuantity = this.getMaxQuantity(this.state.currentSize, sizesList, skusList, skus);
        console.log('Cart maxQuantity', maxQuantity);
        return (<div id="po-cart" class="column">
        {this.state.promptSelection &&
                <div class="error-prompt">Please select size</div>}
        <div class="row">
          <SizeSelector_1.default skus={skusList} sizes={sizesList} onSelect={this.handleSizeSelect}/>
          <QuantitySelector_1.default maxQuantity={maxQuantity} onSelect={this.handleQuantitySelect}/>
        </div>
        {this.isInStock &&
                <POClickTracker_1.default eventName="clickTracker" moduleName="Product Overview">
            <AddButton_1.default label={'add to bag'} id={'checkout'} onClick={this.handleCheckout}/>
          </POClickTracker_1.default>}
      </div>);
    }
}
exports.default = Cart;
