import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const RatingList = (props) => {
  const { reviews, ratings, characteristics, recommended } = props;

  return (
    <div id='RatingList'>
      <RatingBreakdown
        ratings={ratings}
        reviews={reviews}
        recommended={recommended}
      />
      <br></br>
      <ProductBreakdown
        characteristics={characteristics}
      />
    </div>
  );
};

export default RatingList;