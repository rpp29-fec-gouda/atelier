import React from 'react';
import StarRating from '../shared/StarRating';
import './ratingsSummary.css';

const RatingsSummary = (props) => {
  const handleOnClick = () => {
    props.callback?.call();
    document.getElementById('ratings-reviews')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <span id="product-rating" class="row row-margin">
      <StarRating
        rating={props.averageRating}
      />
      <div id="read-all-reviews" onClick={handleOnClick} class="row link">
        Read all {props.reviewCount} reviews
      </div>
    </span>
  );
};

export default RatingsSummary;