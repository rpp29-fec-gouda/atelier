import React from 'react';
import './price.css';

const Price = (props) => {
  // defaultPrice = { props.defaultPrice }
  // originalPrice={ props.originalPrice }
  // salePrice={ props.salePrice } = 0 ? a : b

  return (
    <div id="price" class="row-margin">
      {
        props.salePrice && props.salePrice === null
          ? `$ ${ props.defaultPrice }`
          : <span><div class="sale-price">$ {props.salePrice}</div><div class="original-price">$ {props.originalPrice}</div></span>
      }

    </div>
  );
};

export default Price;