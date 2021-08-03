import React from 'react';

const Checkout = (props) => {
  return (
    <div id="checkout" class="button" onClick={props.onClick}>ADD TO BAG  <div class="plus">+</div></div>
  );
};

export default Checkout;