import React from 'react';
import './ratingProgress.css';

const RatingProgress = (props) => {
  const { completed, ratings, handleRatingProgressFilter } = props;

  const handleClick = () => {
    console.log('RatingBreakdown Clicked');
  };

  return completed ? (
    <div id='rating-progress'>
      <div onClick={handleRatingProgressFilter} id={completed.star}></div>
      <div class='progress'>
        <label for='progress-bar label' onClick={handleClick}>{completed.star}</label>
        <meter class='progress-bar meter' onClick={handleClick} value={isNaN(completed.percentage) ? '' : completed.percentage} min='0' max='100'>{isNaN(completed.percentage) ? '' : completed.percentage}</meter>
        <label for='progress-bar label' onClick={handleClick}>{completed.count}</label>
      </div>
    </div>
  ) : (
    <div id='rating-progress'></div>
  );
};

export default RatingProgress;