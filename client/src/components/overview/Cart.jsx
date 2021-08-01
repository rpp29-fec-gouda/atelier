import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import AddButton from '../shared/AddButton';
import './cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.isInStock = Object.keys(props.skus).length > 0;
    this.currentQuantity = 0;
    this.bag = [];

    this.state = {
      currentSku: null,
      promptSelection: false
    };

    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleSizeSelect(sku) {
    console.log('sku for size selected:', sku);
    this.setState({
      currentSku: sku,
      promptSelection: false
    });
  }

  handleQuantitySelect(quantity) {
    this.currentQuantity = quantity;
    console.log('Quantity chosen:', this.currentQuantity);
  }

  handleSelectSizePrompt() {

  }

  handleCheckout() {
    if (this.isInStock && this.state.currentSku !== null) {
      this.bag.push({
        sku: this.state.currentSku,
        quantity: this.currentQuantity
      });
      console.log('Current order:', this.bag);
    } else {
      this.setState({
        promptSelection: true
      });
    }
  }

  render() {
    console.log('Rendering cart');
    const skus = this.props.skus;
    if (!skus) {
      return (<div>Loading...</div>);
    }

    const skusList = Object.keys(skus);
    const sizes = [];
    skusList.forEach(sku => {
      sizes.push(skus[sku].size);
    });

    const maxQuantity = this.state.currentSku === null ? 0 : skus[this.state.currentSku].quantity;

    console.log('Cart skus', JSON.stringify(skus));
    console.log('Cart sku #s', skusList);
    console.log('Cart sizes', sizes);
    console.log('Cart maxQuantity', maxQuantity);

    return (
      <div id="cart" class="column">
        {
          this.state.promptSelection &&
          <div class="error-prompt">Please select size</div>
        }
        <div class="row">
          <SizeSelector
            skus={ skusList }
            sizes={ sizes }
            onSelect={this.handleSizeSelect}
          />
          <QuantitySelector
            maxQuantity={ maxQuantity }
            onSelect={this.handleQuantitySelect}
          />
        </div>
        {
          this.isInStock &&
          <AddButton
            label={'add to bag'}
            id={'checkout'}
            onClick={this.handleCheckout}
          />
        }
      </div>
    );
  }
}

export default Cart;