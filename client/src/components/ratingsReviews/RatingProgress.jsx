import React from 'react';
import './ratingProgress.css';

const RatingProgress = (props) => {
  const { completed, ratings, handleRatingProgressFilter } = props;

  const handleClick = () => {
    console.log('RatingBreakdown Clicked');
  };

  return completed ? (
    <div id='rr-rating-progress'>
      <div onClick={handleRatingProgressFilter} id={completed.star}></div>
      <div class='rr-rating-progress-bar'>
        <label for='rr-progress-bar rr-label' onClick={handleClick}>{completed.star}</label>
        <meter class='rr-progress-bar rr-meter' onClick={handleClick} value={isNaN(completed.percentage) ? '' : completed.percentage} min='0' max='100'>{isNaN(completed.percentage) ? '' : completed.percentage}</meter>
        <label for='rr-progress-bar rr-label' onClick={handleClick}>{completed.count}</label>
      </div>
    </div>
  ) : (
    <div id='rr-rating-progress'></div>
  );
};

export default RatingProgress;