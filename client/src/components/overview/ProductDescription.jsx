import React from 'react';

const ProductDescription = (props) => {
  return (
    <div id="product-description">
      <h2 class="bold">{ props.slogan }</h2>
      <div>{ props.description }</div>
    </div>
  );
};

export default ProductDescription;