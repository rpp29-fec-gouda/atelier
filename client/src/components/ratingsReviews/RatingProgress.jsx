import React from 'react';
import './ratingProgress.css';

const RatingProgress = (props) => {
  const { completed, ratings, handleRatingProgressFilter } = props;

  return completed ? (
    <div id='rr-rating-progress' className='rr-rating-progress'>
      {isNaN(completed.percentage) ? '' :
        <div id='rr-rating-progress-bar' className='rr-rating-progress-bar' onClick={handleRatingProgressFilter} value={completed.star} id={completed.star} >
          <label id='rr-progress-bar rr-label' for='rr-progress-bar rr-label' onClick={handleRatingProgressFilter} id={completed.star}>{completed.star} stars </label>
          <meter id='rr-progress-bar rr-meter' className='rr-progress-bar rr-meter' onClick={handleRatingProgressFilter} id={completed.star} value={completed.percentage} min='0' max='100'>{completed.percentage}</meter>
          <label id='rr-progress-bar rr-label' for='rr-progress-bar rr-label' onClick={handleRatingProgressFilter} id={completed.star}>({completed.count})</label>
        </div>
      }
    </div>
  ) : null;
};

export default RatingProgress;