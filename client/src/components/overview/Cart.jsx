import React from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import Checkout from './Checkout';

const Cart = (props) => {
  return (
    <div>
      Cart
      <SizeSelector />
      <QuantitySelector />
      <Checkout />
    </div>
  );
};

export default Cart;