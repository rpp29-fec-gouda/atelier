import React from 'react';
import StarRating from '../shared/StarRating';
import ReadAllReviews from './ReadAllReviews';
import Price from './Price';

const ProductInformation = (props) => {
  return (
    <div id="product-information">
      {/* id={ id } */}
      <span id="product-rating" class="row row-margin">
        <StarRating />
        <ReadAllReviews />
      </span>
      <h2 class="uppercase">{ props.category }</h2>
      <h1>{ props.name }</h1>
      <Price
        defaultPrice = { props.defaultPrice }
      />
    </div>
  );
};

export default ProductInformation;