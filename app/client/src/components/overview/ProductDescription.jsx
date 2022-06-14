import React from 'react';
import './productDescription.css';

const ProductDescription = (props) => {
  return (
    <div id="po-product-description">
      <h2 class="bold">{ props.slogan }</h2>
      <div>{ props.description }</div>
    </div>
  );
};

export default ProductDescription;