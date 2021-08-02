import React from 'react';

const Sort = (props) => {
  const { reviews } = props;
  return reviews ? (
    <div id='sort'>
      <span>{reviews.length} reviews, sorted by 'sortOption'</span>
    </div>
  ) : (
    <div id='sort'></div>
  );
};

export default Sort;