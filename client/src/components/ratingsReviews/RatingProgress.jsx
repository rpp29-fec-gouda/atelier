import React from 'react';

const RatingProgress = (props) => {
  const { completed, ratings, handleRatingProgressFilter } = props;
  console.log('completed:', completed);

  const ratingProgress = {
    width: '100%',
    height: '50%',
    backgroundColor: '#e0e0de',
  };

  const ratingFiller = {
    height: '50%',
    width: `${completed.percentage}%`,
    backgroundColor: '#00695c',
    borderRadius: 'inherit',
    marginTop: '5%',
    marginBottom: '5%',

  };

  return (
    <div class='rating-progress'>
      <div onClick={handleRatingProgressFilter} id={completed.star}>{completed.star}</div>
      <div style={ratingProgress} class='progress'>
        <div style={ratingFiller}>
          <span class='progress-bar'>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RatingProgress;