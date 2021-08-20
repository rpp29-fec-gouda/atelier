import React from 'react';
import './price.css';

const Price = (props) => {
  const defaultPrice = props.defaultPrice ? props.defaultPrice : 0;
  const originalPrice = props.originalPrice ? props.originalPrice : 0;

  return (
    <div id="po-price" class="row-margin">
      {
        props.salePrice === null || !props.salePrice
          ?
          `$ ${ defaultPrice }`
          :
          <span class="row">
            <div class="po-sale-price">$ { props.salePrice }</div>
            &nbsp;&nbsp;
            <div class="po-original-price">$ { originalPrice }</div>
          </span>
      }
    </div>
  );
};

export default Price;