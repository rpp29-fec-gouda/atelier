import React from 'react';
import './starRating.css';

const StarRating = (props) => {
  return (
    <div class="star-rating">
      <div class="star-100">☆</div>
      <div class="star-100">☆</div>
      <div class="star-100">☆</div>
      <div class="star-50">☆</div>
      <div class="star-0">☆</div>
    </div>
  );
};

export default StarRating;