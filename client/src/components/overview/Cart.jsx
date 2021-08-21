import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import AddButton from '../shared/AddButton';
import './cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.isInStock = props.skus ? Object.keys(props.skus).length > 0 : false;

    this.state = {
      selectedId: props.selectedId,
      currentSku: null,
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

  handleSizeSelect(sku) {
    this.setState({
      currentSku: sku,
      currentQuantity: 1,
      promptSelection: false
    });
    console.log('sku for size selected:', this.state.currentSku);
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
    } else {
      this.setState({
        promptSelection: true
      });
    }
  }

  render() {
    console.log('Rendering po-cart');

    console.log(`%cCart current sku: ${this.state.currentSku}`, 'color: red');
    console.log('Current State Style ID', this.state.selectedId);
    console.log('New Props Style ID', this.props.selectedId);

    const skus = this.props.skus;
    console.log('Cart skus', JSON.stringify(skus));

    if (!skus) {
      console.log('No SKUS!');
      return (
      <div id="po-cart" class="column">
        Loading Cart...
      </div>
      );
    }

    const skusList = Object.keys(skus);
    console.log('Cart sku #s', skusList);

    const sizes = [];
    skusList.forEach(sku => {
      sizes.push(skus[sku].size);
    });
    console.log('Cart sizes', sizes);

    const maxQuantity = this.state.currentSku === null ? 0 : skus[this.state.currentSku].quantity;
    console.log('Cart maxQuantity', maxQuantity);

    return (
      <div id="po-cart" class="column">
        {
          this.state.promptSelection &&
          <div class="error-prompt">Please select size</div>
        }
        <div class="row">
          <SizeSelector
            skus={ skusList }
            sizes={ sizes }
            onSelect={ this.handleSizeSelect }
          />
          <QuantitySelector
            maxQuantity={ maxQuantity }
            onSelect={ this.handleQuantitySelect }
          />
        </div>
        {
          this.isInStock &&
          <AddButton
            label={ 'add to bag' }
            id={'checkout'}
            onClick={ this.handleCheckout }
          />
        }
      </div>
    );
  }
}

export default Cart;