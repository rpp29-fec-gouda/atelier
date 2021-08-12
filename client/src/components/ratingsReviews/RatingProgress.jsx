import React from 'react';
import './ratingProgress.css';

const RatingProgress = (props) => {
  const { completed, ratings, handleRatingProgressFilter } = props;

  const handleClick = () => {
    console.log('RatingBreakdown Clicked');
  };

  return completed ? (
    <div class='rating-progress'>
      <div onClick={handleRatingProgressFilter} id={completed.star}></div>
      <div class='progress'>
        <label for='progress-bar' onClick={handleClick}>{completed.star}</label>
        <meter class='progress-bar' onClick={handleClick} value={isNaN(completed.percentage) ? '' : completed.percentage} min='0' max='100'>{isNaN(completed.percentage) ? '' : completed.percentage}</meter>
        <label for='progress-bar' onClick={handleClick}>{completed.count}</label>
      </div>
    </div>
  ) : (
    <div class='rating-progress'></div>
  );
};

export default RatingProgress;