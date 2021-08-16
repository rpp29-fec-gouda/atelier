import React from 'react';
import './ratingProgress.css';

const RatingProgress = (props) => {
  const { completed, ratings, handleRatingProgressFilter } = props;

  return completed ? (
    <div className='rr-rating-progress'>
      {isNaN(completed.percentage) ? '' :
        <div className='rr-rating-progress-bar' onClick={handleRatingProgressFilter} value={completed.star} id={completed.star} >
          <label for='rr-progress-bar rr-label' onClick={handleRatingProgressFilter} id={completed.star}>{completed.star} stars </label>
          <meter className='rr-progress-bar rr-meter' onClick={handleRatingProgressFilter} id={completed.star} value={completed.percentage} min='0' max='100'>{completed.percentage}</meter>
          <label for='rr-progress-bar rr-label' onClick={handleRatingProgressFilter} id={completed.star}>{completed.count} </label>
        </div>
      }
    </div>
  ) : (
    <div className='rr-rating-progress'></div>
  );
};

export default RatingProgress;