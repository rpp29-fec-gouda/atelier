import React from 'react';
import './sort.css';


const Sort = (props) => {
  const { reviews, sortOptions, handleReviewSort } = props;

  return reviews ? (
    <div id='rr-sort'>
      {reviews.length} reviews, sorted by <select id='rr-dropdown' className='rr-dropdown' onChange={handleReviewSort}>
        {sortOptions.map((option, i) => (
          <option type='submit' value={option} key={i}>{option}</option>
        ))}
      </select>
    </div>
  ) : (null
  );
};

export default Sort;