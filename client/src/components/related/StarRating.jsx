import React from 'react';

const starChar = String.fromCharCode(9733);
const starString = starChar + starChar + starChar + starChar + starChar;

const StarRating = ({ avgRating }) => {

  let rating = 5 - avgRating;
  let px = 16 + (avgRating / 10);
  const starStyle = {
    backgroundPosition: '-' + (rating * px) + 'px'
  };

  return (
    avgRating ? <span className='rp-stars' style={starStyle}>{starString}</span> : null
  );
};

export default StarRating;