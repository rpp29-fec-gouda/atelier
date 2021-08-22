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
      currentSku: null,
      currentSize: '',
      currentQuantity: 0,
      bag: [],
      promptSelection: false
    };

    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  getMaxQuantity(currentSize, sizesList, skusList, skus) {
    const index = sizesList.indexOf(currentSize);
    console.log('getMaxQuantity: currentSize', currentSize);
    console.log('getMaxQuantity: index', index);
    if (currentSize === '' || index < 0) {
      return 0;
    } else {
      console.log('getMaxQuantity: ', skusList[index].quantity);
      return skus[skusList[index]].quantity;
    }
  }

  handleSizeSelect(sku) {
    console.log('sku for size selected:', sku);
    const currentSize = this.props.skus[sku]?.size;
    console.log('size selected:', currentSize);
    this.setState({
      currentSku: sku,
      currentSize: this.props.skus[sku]?.size,
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
    } else {
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
      return (
      <div id="po-cart" class="column">
        Loading Cart...
      </div>
      );
    }

    const skusList = Object.keys(skus);
    console.log('Cart sku #s', skusList);

    const sizesList = [];
    skusList.map(sku => {
      sizesList.push(skus[sku].size);
    })
    console.log('Cart sizes', sizesList);

    const maxQuantity = this.getMaxQuantity(this.state.currentSize, sizesList, skusList, skus);
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
            sizes={ sizesList }
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
            id={ 'checkout' }
            onClick={ this.handleCheckout }
          />
        }
      </div>
    );
  }
}

export default Cart;