import React from 'react';

const RatingProgress = (props) => {
  const { completed, ratings, handleRatingProgressFilter } = props;



  return completed ? (
    <div class='rating-progress'>
      <div onClick={handleRatingProgressFilter} id={completed.star}></div>
      <div class='progress'>
        <label for="progress-bar">{completed.star}</label>
        <meter class='progress-bar' value={completed.percentage} min='0' max='100'>{completed.percentage}</meter>
      </div>
    </div>
  ) : (
    <div class='rating-progress'></div>
  );

};

export default RatingProgress;