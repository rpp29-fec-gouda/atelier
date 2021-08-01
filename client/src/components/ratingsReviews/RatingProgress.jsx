import React from 'react';

const RatingProgress = (props) => {
  const { completed, ratings } = props;
  const ratingProgress = {

    width: '100%',
    backgroundColor: '#e0e0de',
  };

  const ratingFiller = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#00695c',
    borderRadius: 'inherit',
    marginTop: '5%',
    marginBottom: '5%'
  };

  const stars = [5, 4, 3, 2, 1];

  return (
    <div style={ratingProgress}>
      <div>
        {stars.map((star) => {
          <span>{star}</span>;
        })}
        <span style={ratingFiller}></span>
      </div>
    </div>
  );
};

export default RatingProgress;