import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import './ratingList.css';

const RatingList = (props) => {
  const { reviews, ratings, characteristics, recommended, handleRatingProgressFilter, ratingDetails } = props;
  console.log('ratings:', ratings);
  console.log('reviews:', reviews);

  return (
    <div id='rr-rating-list'>
      <RatingBreakdown
        ratings={ratings}
        ratingDetails={ratingDetails}
        averageRating={props.averageRating}
        totalRating={props.totalRating}
        reviews={reviews}
        recommended={recommended}
        handleRatingProgressFilter={handleRatingProgressFilter}
      />
      <br></br>
      <ProductBreakdown
        characteristics={characteristics}
      />
    </div>
  );
};

export default RatingList;