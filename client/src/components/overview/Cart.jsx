import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import Checkout from './Checkout';
import AddButton from '../shared/AddButton';
import './cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.currentQuantity = 0;
    this.bag = [];

    this.state = {
      currentSku: null
    };

    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleSizeSelect(sku) {
    this.setState({
      currentSku: sku
    });
  }

  handleQuantitySelect(quantity) {
    this.currentQuantity = quantity;
    console.log('Quantity chosen:', this.currentQuantity);
  }

  handleCheckout() {
    console.log('Cart checked out!');
    this.bag.push({
      sku: this.state.currentSku,
      quantity: this.currentQuantity
    });
    console.log('Current order:', this.bag);
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
    console.log('sku #s', skusList);
    console.log('sizes', sizes);
    console.log('maxQuantity', maxQuantity);

    return (
      <div id="cart" class="column">
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
        <AddButton
          label={'ADD TO BAG'}
          id={'checkout'}
          onClick={this.handleCheckout}
        />
      </div>
    );
  }
}

export default Cart;