import React from 'react';
import './sort.css';


const Sort = (props) => {
  const { reviews, sortOptions, handleReviewSort } = props;

  return reviews ? (
    <div id='rr-sort'>
      <label for='rr-dropdown'></label>
      {reviews.length} reviews, sorted by <select className='rr-dropdown' onChange={handleReviewSort}>
        {sortOptions.map((option, i) => (
          <option className='rr-dropdown' type='submit' value={option} key={i}>{option}</option>
        ))}
      </select>
    </div>
  ) : (null
  );
};

export default Sort;