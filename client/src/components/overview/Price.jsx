import React from 'react';
import './price.css';

const Price = (props) => {
  return (
    <div id="po-price" class="row-margin">
      {
        props.salePrice === null || !props.salePrice
          ?
          `$ ${ props.defaultPrice }`
          :
          <span class="row">
            <div class="po-sale-price">$ {props.salePrice}</div>
            &nbsp;&nbsp;
            <div class="po-original-price">$ {props.originalPrice}</div>
          </span>
      }
    </div>
  );
};

export default Price;