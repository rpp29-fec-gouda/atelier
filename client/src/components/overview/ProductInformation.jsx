import React from 'react';
import RatingsSummary from './RatingsSummary';
import Price from './Price';
import './productInformation.css';

const ProductInformation = (props) => {
  console.log('Rendering product information');
  return (
    <div id="po-product-information">
      {
        props.reviewCount > 0 &&
        <RatingsSummary
          reviewCount={props.reviewCount}
          averageRating={props.averageRating}
        />
      }
      <h2 class="uppercase">{ props.category }</h2>
      <h1>{ props.name }</h1>
      <Price
        defaultPrice = { props.defaultPrice }
        originalPrice={ props.originalPrice }
        salePrice={ props.salePrice }
      />
    </div>
  );
};

export default ProductInformation;