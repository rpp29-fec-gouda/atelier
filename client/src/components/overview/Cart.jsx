import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import Checkout from './Checkout';

const Cart = (props) => {
  return (
    <div id="cart" class="column">
      <div class="row">
        <SizeSelector />
        <QuantitySelector />
      </div>
      <Checkout />
    </div>
  );
};

export default Cart;