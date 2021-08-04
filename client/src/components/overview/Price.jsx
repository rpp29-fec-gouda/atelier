import React from 'react';
import './price.css';

const Price = (props) => {
  return (
    <div id="price" class="row-margin">
      {
        props.salePrice === null || !props.salePrice
          ?
          `$ ${ props.defaultPrice }`
          :
          <span class="row">
            <div class="sale-price">$ {props.salePrice}</div>
            &nbsp;&nbsp;
            <div class="original-price">$ {props.originalPrice}</div>
          </span>
      }
    </div>
  );
};

export default Price;