import React from 'react';
import StarRating from '../shared/StarRating';
import ReadAllReviews from './ReadAllReviews';
import Price from './Price';
import './productInformation.css';

const ProductInformation = (props) => {
  console.log('Rendering product information');
  return (
    <div id="product-information">
      <span id="product-rating" class="row row-margin">
        {
          props.reviewCount > 0 &&
          <StarRating
            rating={props.averageRating}
            callback={(e) => console.log('click!', e.target.dataset.rating)}
          />
        }
        {
          props.reviewCount > 0 &&
          <ReadAllReviews number={props.reviewCount}/>
        }
      </span>
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