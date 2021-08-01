import React from 'react';
import StarRating from '../shared/StarRating';
import './ratingsSummary.css';

const RatingsSummary = (props) => {
  const handleOnClick = () => {
    document.getElementById('RatingsReviews')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <span id="product-rating" class="row row-margin">
      <StarRating
        rating={props.averageRating}
        // callback={(e) => console.log('click!', e.target.dataset.rating)}
      />
      <div id="read-all-reviews" onClick={handleOnClick} class="row link">
        Read all {props.reviewCount} reviews
      </div>
    </span>
  );
};

export default RatingsSummary;