import React from 'react';

const Sort = (props) => {
  const { reviews, sortOptions, handleReviewSort } = props;

  return reviews ? (
    <div id='sort'>
      {reviews.length} reviews, sorted by <select onChange={handleReviewSort}>
        {sortOptions.map((option, i) => (
          <option type='submit' value={option} key={i}>{option}</option>
        ))}
      </select>
    </div>
  ) : (
    <div id='sort'></div>
  );
};

export default Sort;