import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const RatingList = (props) => {
  const { ratings, characteristics, recommended } = props;

  return (
    <div id='RatingList'>
      <RatingBreakdown
        ratings={ratings}
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