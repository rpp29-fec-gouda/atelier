import React from 'react';
import './sort.css';


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
  ) : (null
  );
};

export default Sort;