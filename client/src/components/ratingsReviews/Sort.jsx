import React from 'react';

const Sort = (props) => {
  const { reviews } = props;
  return (
    <div id='sort'>
      <span>{reviews.length} reviews, sorted by 'sortOption'</span>
    </div>
  );
};

export default Sort;