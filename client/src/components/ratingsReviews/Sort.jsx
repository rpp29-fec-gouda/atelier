import React from 'react';
import './Sort.css';

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
    <div id='sort'>Loading...</div>
  );
};

export default Sort;