import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import './ratingList.css';

const RatingList = (props) => {
  const { reviews, ratings, characteristics, recommended, handleRatingProgressFilter, ratingDetails, updateAverage } = props;

  return (
    <div className='rr-rating-list'>
      <RatingBreakdown
        ratings={ratings}
        ratingDetails={ratingDetails}
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