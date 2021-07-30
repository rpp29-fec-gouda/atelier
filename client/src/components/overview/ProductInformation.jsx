import React from 'react';
import StarRating from '../shared/StarRating';
import ReadAllReviews from './ReadAllReviews';
import Price from './Price';

const ProductInformation = (props) => {
  return (
    <div>
      ProductInformation
      <span>
        <StarRating />
        <ReadAllReviews />
      </span>
      <h3>CATEGORY</h3>
      <h1>Expanded Product Name</h1>
      <Price />
      More Product Information
    </div>
  );
};

export default ProductInformation;